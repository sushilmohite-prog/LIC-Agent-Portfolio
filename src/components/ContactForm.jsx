import React, { useState } from 'react';
import { getPlansForCalculator } from '../data/licPlans';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    planInterested: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const plans = getPlansForCalculator();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'नाव आवश्यक आहे';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'मोबाइल नंबर आवश्यक आहे';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'वैध मोबाइल नंबर टाका';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ईमेल आवश्यक आहे';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'वैध ईमेल टाका';
    }
    
    if (!formData.planInterested) {
      newErrors.planInterested = 'कृपया योजना निवडा';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your backend
      
       // Prepare WhatsApp message
        const waMessage = 
            `नवीन संपर्क फॉर्म:\n` +
            `नाव: ${formData.name}\n` +
            `मोबाइल: ${formData.mobile}\n` +
            `ईमेल: ${formData.email}\n` +
            `योजना: ${formData.planInterested}\n` +
            (formData.message ? `संदेश: ${formData.message}\n` : '');

        // WhatsApp API URL (replace with your number if needed)
        const waUrl = `https://wa.me/919890233529?text=${encodeURIComponent(waMessage)}`;

        try {
            // Open WhatsApp with prefilled message
            window.open(waUrl, '_blank');

            // Simulate API call (optional)
            await new Promise(resolve => setTimeout(resolve, 1000));

            setSubmitted(true);
            setFormData({
                name: '',
                mobile: '',
                email: '',
                planInterested: '',
                message: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }


      console.log('Form submitted:', formData);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        planInterested: '',
        message: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      email: '',
      planInterested: '',
      message: ''
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <div className="text-green-600 mb-4">
            <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-lic-blue mb-2 font-marathi">
            धन्यवाद!
          </h3>
          <p className="text-gray-600 mb-6 font-marathi">
            तुमची माहिती मिळाली आहे. आम्ही लवकरच तुमच्याशी संपर्क साधू.
          </p>
          <button
            onClick={resetForm}
            className="btn-secondary"
          >
            नवीन फॉर्म भरा
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-lic-blue mb-6 font-marathi text-center">
          आमच्याशी संपर्क साधा
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
              पूर्ण नाव <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="तुमचे पूर्ण नाव"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
              मोबाइल नंबर <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="9876543210"
              maxLength="10"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
              ईमेल पत्ता <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.email}</p>}
          </div>

          {/* Plan Interested */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
              स्वारस्य असलेली योजना <span className="text-red-500">*</span>
            </label>
            <select
              name="planInterested"
              value={formData.planInterested}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue ${
                errors.planInterested ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">योजना निवडा</option>
              {plans.map(plan => (
                <option key={plan.id} value={plan.name}>
                  {plan.name}
                </option>
              ))}
              <option value="other">इतर / सल्ला हवा</option>
            </select>
            {errors.planInterested && <p className="text-red-500 text-sm mt-1 font-marathi">{errors.planInterested}</p>}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-marathi">
              संदेश (पर्यायी)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue"
              placeholder="तुमची गरज किंवा प्रश्न लिहा..."
            ></textarea>
          </div>

          {/* WhatsApp Contact */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="text-green-600">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-green-800 font-marathi">त्वरित संपर्कासाठी WhatsApp करा</div>
                <a href="https://wa.me/919890233529" target="_blank" rel="noopener noreferrer" 
                   className="text-green-600 hover:text-green-800 font-medium">
                  +91 9890233529
                </a>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              isSubmitting 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-lic-blue text-white hover:bg-lic-light-blue'
            }`}
          >
            {isSubmitting ? 'पाठवत आहे...' : 'संदेश पाठवा'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
