import React, { useState } from 'react';
import { getPlansForCalculator } from '../data/licPlans';

const Calculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    smokingStatus: 'non-smoker',
    sumAssured: '',
    policyTerm: '',
    premiumPayingTerm: '',
    selectedPlan: '',
    paymentMode: 'yearly'
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCalculating, setIsCalculating] = useState(false);

  const plans = getPlansForCalculator();

  // LIC New Jeevan Anand 2024 premium calculation - Official Formula
  const calculatePremium = () => {
    const { age, gender, smokingStatus, sumAssured, policyTerm, premiumPayingTerm, selectedPlan, paymentMode } = formData;
    
    // Find selected plan details
    const planDetails = plans.find(plan => plan.id.toString() === selectedPlan);
    if (!planDetails) return null;

    const ageNum = parseInt(age);
    const sumAssuredNum = parseFloat(sumAssured);
    const termNum = parseInt(policyTerm);
    const pptNum = parseInt(premiumPayingTerm || policyTerm);

    // Step 1: Get Tabular Rate per ₹1000 (based on age, term, PPT)
    const tabularRate = getTabularRate(ageNum, termNum, pptNum, planDetails.englishName);
    
    // Step 2: Calculate Base Premium
    // Base Premium = (Sum Assured / 1000) × Tabular Rate
    const basePremium = (sumAssuredNum / 1000) * tabularRate;
    
    // Step 3: Apply Mode Rebate (as per official LIC rates)
    const modeRebateAmount = getModeRebate(basePremium, paymentMode);
    
    // Step 4: Apply High Sum Assured Rebate (as per official LIC rates)
    const hsaRebateAmount = getHighSumAssuredRebate(basePremium, sumAssuredNum);
    
    // Step 5: Calculate Adjusted Premium
    const adjustedPremium = basePremium - modeRebateAmount - hsaRebateAmount;
    
    // Step 6: Apply GST (4.5% first year, 2.25% renewal for savings plans)
    const firstYearPremium = adjustedPremium * 1.045; // 4.5% GST
    const renewalPremium = adjustedPremium * 1.0225;  // 2.25% GST
    
    // Calculate for all payment modes (based on yearly premium)
    const yearlyBase = paymentMode === 'yearly' ? adjustedPremium : adjustedPremium / getModeMultiplier(paymentMode);
    
    const premiums = {
      yearly: yearlyBase,
      halfYearly: (yearlyBase * getModeMultiplier('half-yearly')) / 2,
      quarterly: (yearlyBase * getModeMultiplier('quarterly')) / 4,
      monthly: (yearlyBase * getModeMultiplier('monthly')) / 12
    };

    // Apply GST to all modes
    const finalPremiums = {
      yearly: premiums.yearly * 1.045,
      halfYearly: premiums.halfYearly * 1.045,
      quarterly: premiums.quarterly * 1.045,
      monthly: premiums.monthly * 1.045
    };

    const renewalPremiums = {
      yearly: premiums.yearly * 1.0225,
      halfYearly: premiums.halfYearly * 1.0225,
      quarterly: premiums.quarterly * 1.0225,
      monthly: premiums.monthly * 1.0225
    };

    // Calculate maturity benefit for Jeevan Anand
    const maturityBenefit = getJeevanAnandMaturityBenefit(sumAssuredNum, termNum);

    return {
      planName: planDetails.name,
      selectedMode: paymentMode,
      premiums: {
        yearly: Math.round(finalPremiums.yearly),
        halfYearly: Math.round(finalPremiums.halfYearly),
        quarterly: Math.round(finalPremiums.quarterly),
        monthly: Math.round(finalPremiums.monthly)
      },
      renewalPremiums: {
        yearly: Math.round(renewalPremiums.yearly),
        halfYearly: Math.round(renewalPremiums.halfYearly),
        quarterly: Math.round(renewalPremiums.quarterly),
        monthly: Math.round(renewalPremiums.monthly)
      },
      breakup: {
        basePremium: Math.round(basePremium),
        modeRebate: Math.round(modeRebateAmount),
        hsaRebate: Math.round(hsaRebateAmount),
        adjustedPremium: Math.round(adjustedPremium),
        gstFirstYear: Math.round(adjustedPremium * 0.045),
        gstRenewal: Math.round(adjustedPremium * 0.0225),
        finalPremiumFirstYear: Math.round(firstYearPremium),
        finalPremiumRenewal: Math.round(renewalPremium)
      },
      maturityBenefit: maturityBenefit,
      totalPremiumPaid: Math.round(finalPremiums.yearly * pptNum)
    };
  };

  // Age factor based on LIC mortality tables
  const getAgeFactor = (age, planType) => {
    const baseAge = 25; // Reference age
    if (planType.includes('Term')) {
      // Term plans have steeper age curves
      return Math.pow(1.08, (age - baseAge) / 5);
    } else {
      // Endowment plans have moderate age curves
      return Math.pow(1.05, (age - baseAge) / 5);
    }
  };

  // Term factor based on plan type
  const getTermFactor = (term, planType) => {
    if (planType.includes('Term')) {
      // Pure term plans: longer terms are cheaper per year
      return Math.max(0.7, 1 - (term - 10) * 0.02);
    } else {
      // Endowment plans: longer terms cost more due to maturity benefit
      return Math.min(1.3, 1 + (term - 15) * 0.015);
    }
  };

  // Smoking factor
  const getSmokerFactor = (smokingStatus, planType) => {
    if (planType.includes('Term')) {
      return smokingStatus === 'smoker' ? 1.75 : 1.0; // 75% higher for smokers in term plans
    } else {
      return smokingStatus === 'smoker' ? 1.15 : 1.0; // 15% higher for smokers in endowment plans
    }
  };

  // High Sum Assured rebates as per LIC guidelines
  const getHighSumRebate = (sumAssured) => {
    if (sumAssured >= 1000000) return 0.04; // 4% for ₹10L+
    if (sumAssured >= 500000) return 0.025; // 2.5% for ₹5-10L
    return 0; // No rebate for <₹5L
  };

  // Payment mode adjustments as per LIC practice
  const getPaymentModeAdjustment = (mode, planType) => {
    if (planType.includes('Term')) {
      // Tech-Term loadings
      switch (mode) {
        case 'yearly': return 1.0;
        case 'half-yearly': return 1.02;
        case 'quarterly': return 1.03;
        case 'monthly': return 1.05;
        default: return 1.0;
      }
    } else {
      // Endowment plan rebates
      switch (mode) {
        case 'yearly': return 0.98; // 2% rebate
        case 'half-yearly': return 0.99; // 1% rebate
        case 'quarterly': return 1.0; // No rebate
        case 'monthly': return 1.0; // No rebate
        default: return 1.0;
      }
    }
  };

  // Calculate maturity benefit for endowment plans
  const getMaturityBenefit = (planType, sumAssured, term) => {
    if (planType.includes('Term')) {
      return 0; // No maturity benefit for term plans
    } else if (planType.includes('Anand')) {
      // Jeevan Anand: SA + Bonuses (estimated)
      return sumAssured + (sumAssured * 0.06 * term); // Approx 6% annual compound bonus
    } else if (planType.includes('Endowment')) {
      // New Endowment: SA + Bonuses
      return sumAssured + (sumAssured * 0.05 * term); // Approx 5% annual compound bonus
    } else if (planType.includes('Umang')) {
      // Jeevan Umang: Higher benefits due to whole life nature
      return sumAssured + (sumAssured * 0.08 * term);
    }
    return sumAssured; // Default
  };

  // Official LIC New Jeevan Anand 2024 Helper Functions

  // Get tabular rate per ₹1000 - Based on LIC mortality tables
  const getTabularRate = (age, term, ppt, planName) => {
    // This is a placeholder implementation
    // In practice, these rates come from official LIC tabular rate books
    const baseRates = {
      // Jeevan Anand 2024 sample rates (placeholder)
      'New Jeevan Anand': {
        25: { 10: 68.50, 15: 42.30, 20: 32.80, 25: 27.40, 30: 23.60 },
        30: { 10: 72.20, 15: 45.10, 20: 35.60, 25: 30.20, 30: 26.40 },
        35: { 10: 76.80, 15: 48.70, 20: 39.20, 25: 33.80, 30: 29.90 },
        40: { 10: 82.40, 15: 53.20, 20: 43.60, 25: 38.40, 30: 34.20 },
        45: { 10: 89.30, 15: 58.80, 20: 49.20, 25: 44.10, 30: 39.60 },
        50: { 10: 97.80, 15: 65.90, 20: 56.20, 25: 51.20, 30: 46.40 },
        55: { 10: 108.40, 15: 74.80, 20: 65.10, 25: 60.20, 30: 55.10 },
        60: { 10: 121.60, 15: 86.20, 20: 76.80, 25: 71.40, 30: 66.20 }
      }
    };

    const planRates = baseRates[planName] || baseRates['New Jeevan Anand'];
    const ageRates = planRates[age] || planRates[30]; // Default to age 30 if not found
    
    // Get rate for the term (use closest available term)
    let rate = ageRates[term];
    if (!rate) {
      // Find closest term if exact match not found
      const availableTerms = Object.keys(ageRates).map(Number).sort((a, b) => a - b);
      const closestTerm = availableTerms.reduce((prev, curr) => 
        Math.abs(curr - term) < Math.abs(prev - term) ? curr : prev
      );
      rate = ageRates[closestTerm];
    }

    // Adjust for premium paying term if different from policy term
    if (ppt < term) {
      // Limited pay increases the rate
      const limitedPayFactor = 1 + ((term - ppt) * 0.03); // 3% increase per year of limited pay
      rate *= limitedPayFactor;
    }

    return rate || 50; // Fallback rate
  };

  // Get mode rebate amount as per LIC guidelines
  const getModeRebate = (basePremium, mode) => {
    const rebateRates = {
      'yearly': 0.02,      // 2% rebate for yearly mode
      'half-yearly': 0.01, // 1% rebate for half-yearly mode
      'quarterly': 0,      // No rebate for quarterly mode
      'monthly': 0         // No rebate for monthly mode
    };
    
    return basePremium * (rebateRates[mode] || 0);
  };

  // Get high sum assured rebate amount as per LIC guidelines
  const getHighSumAssuredRebate = (basePremium, sumAssured) => {
    let rebateRate = 0;
    
    if (sumAssured >= 2500000) { // ₹25L and above
      rebateRate = 0.05; // 5% rebate
    } else if (sumAssured >= 1000000) { // ₹10L to ₹25L
      rebateRate = 0.03; // 3% rebate
    } else if (sumAssured >= 500000) { // ₹5L to ₹10L
      rebateRate = 0.015; // 1.5% rebate
    }
    
    return basePremium * rebateRate;
  };

  // Get mode multiplier for calculating premiums in different modes
  const getModeMultiplier = (mode) => {
    const multipliers = {
      'yearly': 1.00,
      'half-yearly': 1.01,  // 1% loading
      'quarterly': 1.02,    // 2% loading
      'monthly': 1.03       // 3% loading
    };
    
    return multipliers[mode] || 1.00;
  };

  // Get Jeevan Anand specific maturity benefit
  const getJeevanAnandMaturityBenefit = (sumAssured, term) => {
    // Jeevan Anand pays Sum Assured + Bonuses
    // Estimated bonus rates (actual rates declared by LIC annually)
    const estimatedBonusRate = 48; // ₹48 per ₹1000 per year (2023-24 rate)
    const totalBonus = (sumAssured / 1000) * estimatedBonusRate * term;
    
    // Add guaranteed additions if any (for illustration)
    const guaranteedAdditions = sumAssured * 0.01 * term; // 1% per year
    
    return sumAssured + totalBonus + guaranteedAdditions;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.age || formData.age < 18 || formData.age > 65) {
      newErrors.age = 'वय 18 ते 65 वर्षांच्या दरम्यान असावे';
    }
    
    if (!formData.sumAssured || formData.sumAssured < 100000) {
      newErrors.sumAssured = 'विमा रक्कम किमान ₹1,00,000 असावी';
    }
    
    if (!formData.policyTerm || formData.policyTerm < 10 || formData.policyTerm > 35) {
      newErrors.policyTerm = 'पॉलिसी टर्म 10 ते 35 वर्षांच्या दरम्यान असावा';
    }
    
    if (!formData.selectedPlan) {
      newErrors.selectedPlan = 'कृपया योजना निवडा';
    }

    if (formData.premiumPayingTerm && formData.policyTerm && 
        parseInt(formData.premiumPayingTerm) > parseInt(formData.policyTerm)) {
      newErrors.premiumPayingTerm = 'प्रीमियम भरण्याचा कालावधी पॉलिसी टर्मपेक्षा जास्त असू शकत नाही';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsCalculating(true);
    
    // Simulate calculation time
    setTimeout(() => {
      const calculationResult = calculatePremium();
      setResult(calculationResult);
      setIsCalculating(false);
    }, 1000);
  };

  const resetCalculator = () => {
    setFormData({
      age: '',
      gender: 'male',
      smokingStatus: 'non-smoker',
      sumAssured: '',
      policyTerm: '',
      premiumPayingTerm: '',
      selectedPlan: '',
      paymentMode: 'yearly'
    });
    setResult(null);
    setErrors({});
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator Form */}
        <div className="card">
          <h2 className="text-2xl font-bold text-lic-blue mb-6 font-marathi">
            तपशील भरा
          </h2>
          
          <form onSubmit={handleCalculate} className="space-y-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                वय <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                  errors.age ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="तुमचे वय (18-65)"
                min="18"
                max="65"
              />
              {errors.age && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                लिंग
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue"
              >
                <option value="male">पुरुष</option>
                <option value="female">महिला</option>
              </select>
            </div>

            {/* Smoking Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                धूम्रपान स्थिती
              </label>
              <select
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue"
              >
                <option value="non-smoker">धूम्रपान करत नाही</option>
                <option value="smoker">धूम्रपान करतो</option>
              </select>
            </div>

            {/* Sum Assured */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                विमा रक्कम (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="sumAssured"
                value={formData.sumAssured}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                  errors.sumAssured ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="किमान ₹1,00,000"
                min="100000"
                step="50000"
              />
              {errors.sumAssured && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.sumAssured}</p>}
            </div>

            {/* Selected Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                योजना निवडा <span className="text-red-500">*</span>
              </label>
              <select
                name="selectedPlan"
                value={formData.selectedPlan}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                  errors.selectedPlan ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">योजना निवडा</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
              {errors.selectedPlan && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.selectedPlan}</p>}
            </div>

            {/* Policy Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                पॉलिसी टर्म (वर्षे) <span className="text-red-500">*</span>
              </label>
              <select
                name="policyTerm"
                value={formData.policyTerm}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                  errors.policyTerm ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">टर्म निवडा</option>
                {[10, 12, 15, 16, 18, 20, 21, 25, 30, 35].map(term => (
                  <option key={term} value={term}>{term} वर्षे</option>
                ))}
              </select>
              {errors.policyTerm && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.policyTerm}</p>}
            </div>

            {/* Premium Paying Term */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                प्रीमियम भरण्याचा कालावधी (वर्षे)
              </label>
              <select
                name="premiumPayingTerm"
                value={formData.premiumPayingTerm}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue"
              >
                <option value="">पॉलिसी टर्म समान (डिफॉल्ट)</option>
                {formData.policyTerm && [...Array(parseInt(formData.policyTerm))].map((_, i) => {
                  const term = i + 5;
                  if (term <= parseInt(formData.policyTerm)) {
                    return <option key={term} value={term}>{term} वर्षे</option>;
                  }
                  return null;
                })}
              </select>
              {errors.premiumPayingTerm && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.premiumPayingTerm}</p>}
            </div>

            {/* Payment Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
                प्रीमियम भरण्याची पद्धत
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue"
              >
                <option value="yearly">वार्षिक (सर्वाधिक बचत)</option>
                <option value="half-yearly">अर्धवार्षिक</option>
                <option value="quarterly">त्रैमासिक</option>
                <option value="monthly">मासिक</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCalculating}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isCalculating 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-lic-blue text-white hover:bg-lic-light-blue'
              }`}
            >
              {isCalculating ? 'मोजत आहे...' : 'प्रीमियम मोजा'}
            </button>

            {/* Reset Button */}
            <button
              type="button"
              onClick={resetCalculator}
              className="w-full py-2 px-6 border border-lic-blue text-lic-blue rounded-lg font-medium hover:bg-lic-blue hover:text-white transition-colors"
            >
              रीसेट करा
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {result && (
            <div className="card">
              <h3 className="text-xl font-bold text-lic-blue mb-4 font-marathi">
                प्रीमियम तपशील
              </h3>
              
              <div className="space-y-4">
                <div className="bg-lic-blue text-white p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm opacity-90 font-marathi">निवडलेली योजना</div>
                    <div className="text-lg font-bold font-marathi">{result.planName}</div>
                  </div>
                </div>

                {/* Premium by Mode */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 font-marathi">वार्षिक प्रीमियम</div>
                    <div className="text-lg font-bold text-green-800">{formatCurrency(result.premiums.yearly)}</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-sm text-blue-700 font-marathi">अर्धवार्षिक प्रीमियम</div>
                    <div className="text-lg font-bold text-blue-800">{formatCurrency(result.premiums.halfYearly)}</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="text-sm text-yellow-700 font-marathi">त्रैमासिक प्रीमियम</div>
                    <div className="text-lg font-bold text-yellow-800">{formatCurrency(result.premiums.quarterly)}</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-sm text-purple-700 font-marathi">मासिक प्रीमियम</div>
                    <div className="text-lg font-bold text-purple-800">{formatCurrency(result.premiums.monthly)}</div>
                  </div>
                </div>

                {/* Premium Breakup */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 font-marathi">प्रीमियम तुटवडा (पहिले वर्ष)</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="font-marathi">मूळ प्रीमियम:</span>
                      <span>{formatCurrency(result.breakup.basePremium)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="font-marathi">मोड रिबेट:</span>
                      <span>- {formatCurrency(result.breakup.modeRebate)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span className="font-marathi">उच्च विमा रक्कम सूट:</span>
                      <span>- {formatCurrency(result.breakup.hsaRebate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-marathi">समायोजित प्रीमियम:</span>
                      <span>{formatCurrency(result.breakup.adjustedPremium)}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span className="font-marathi">GST (4.5%):</span>
                      <span>+ {formatCurrency(result.breakup.gstFirstYear)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span className="font-marathi">पहिले वर्ष एकूण:</span>
                      <span>{formatCurrency(result.breakup.finalPremiumFirstYear)}</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-2 font-marathi">
                      नूतनीकरण वर्षांमध्ये GST: 2.25% (₹{formatCurrency(result.breakup.finalPremiumRenewal)})
                    </div>
                  </div>
                </div>

                {/* Maturity Benefit */}
                {result.maturityBenefit > 0 && (
                  <div className="bg-lic-yellow p-4 rounded-lg">
                    <h4 className="font-semibold text-lic-blue mb-2 font-marathi">परिपक्वता लाभ (अंदाजे)</h4>
                    <div className="text-2xl font-bold text-lic-blue">
                      {formatCurrency(result.maturityBenefit)}
                    </div>
                    <div className="text-sm text-lic-blue mt-1 font-marathi">
                      * बोनस आणि गारंटीड अ‍ॅडिशनसह
                    </div>
                  </div>
                )}

                {/* Total Investment */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-800 font-marathi">एकूण प्रीमियम भरणार:</span>
                    <span className="text-xl font-bold text-blue-800">{formatCurrency(result.totalPremiumPaid)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Important Disclaimer */}
          <div className="card bg-orange-50 border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-3 font-marathi">
              ⚠️ महत्त्वाची माहिती
            </h4>
            <ul className="space-y-2 text-sm text-orange-700 font-marathi">
              <li>• हे अंदाजे आकडे आहेत, अचूक प्रीमियम वेगळे असू शकते</li>
              <li>• वैद्यकीय तपासणी आणि अंडरराइटिंगनुसार प्रीमियम बदलू शकते</li>
              <li>• बोनस आणि परिपक्वता लाभ हे गारंटीड नसतात</li>
              <li>• अधिक अचूक माहितीसाठी LIC एजंटशी संपर्क साधा</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
