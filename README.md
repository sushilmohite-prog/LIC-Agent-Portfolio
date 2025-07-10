# LIC सल्लागार - Insurance Advisor Website

A comprehensive LIC Insurance Advisor website built with React.js, featuring Marathi language support, premium calculator, and responsive design.

## 🌟 Features

- **Multilingual Support**: Complete Marathi content with English fallbacks
- **Premium Calculator**: Interactive calculator with real LIC plan rates
- **Responsive Design**: Mobile-first design with TailwindCSS
- **LIC Branding**: Official LIC colors and professional design
- **Plan Showcase**: Detailed information about various LIC plans
- **Contact Forms**: Lead generation with WhatsApp integration
- **SEO Optimized**: Clean URLs and semantic HTML structure

## 🚀 Tech Stack

- **Frontend**: React.js 18+ with Vite
- **Styling**: TailwindCSS with custom LIC theme
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Icons**: Lucide React / Heroicons
- **Fonts**: Google Fonts (Baloo Bhai 2, Mukta, Inter)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation with Marathi labels
│   ├── Footer.jsx          # Footer with company info
│   ├── Calculator.jsx      # Premium calculation logic
│   ├── PlanCard.jsx        # Individual plan display
│   └── ContactForm.jsx     # Lead capture form
├── pages/
│   ├── Home.jsx           # Landing page with hero section
│   ├── PlansMarathi.jsx   # All LIC plans in Marathi
│   ├── CalculatorPage.jsx # Calculator with instructions
│   └── Contact.jsx        # Contact information & form
├── data/
│   └── licPlans.js        # LIC plans data in Marathi
└── assets/
    └── [images, icons]
```

## 🛠️ Installation & Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Premium Calculator - Official LIC New Jeevan Anand 2024 Formula

### Implementation Details

The premium calculator now implements the **official LIC New Jeevan Anand 2024** premium calculation methodology as per LIC brochure specifications:

#### Formula Components:

1. **Base Premium Calculation**
   ```
   Base Premium = (Sum Assured ÷ 1000) × Tabular Rate
   ```

2. **Mode Rebate** (Applied on Base Premium)
   - Yearly: 2% rebate
   - Half-yearly: 1% rebate  
   - Quarterly: No rebate
   - Monthly: No rebate

3. **High Sum Assured Rebate** (Applied on Base Premium)
   - ₹25L and above: 5% rebate
   - ₹10L to ₹25L: 3% rebate
   - ₹5L to ₹10L: 1.5% rebate
   - Below ₹5L: No rebate

4. **Adjusted Premium**
   ```
   Adjusted Premium = Base Premium - Mode Rebate - HSA Rebate
   ```

5. **GST Application**
   - First Year: 4.5% GST on Adjusted Premium
   - Renewal Years: 2.25% GST on Adjusted Premium

6. **Mode Loadings** (for different payment frequencies)
   - Yearly: No loading
   - Half-yearly: 1% loading
   - Quarterly: 2% loading
   - Monthly: 3% loading

#### Features:
- ✅ Official LIC tabular rate structure (age & term specific)
- ✅ All payment modes with accurate rebates/loadings
- ✅ High Sum Assured rebates as per LIC guidelines  
- ✅ Correct GST calculation (4.5% first year, 2.25% renewal)
- ✅ Premium breakdown showing all components
- ✅ Maturity benefit estimation with bonus projections
- ✅ Total premium paid calculation
- ✅ Input validation for age, sum assured, policy terms

#### Maturity Benefit Calculation:
- **Sum Assured** + **Bonuses** + **Guaranteed Additions**
- Estimated bonus: ₹48 per ₹1000 per year (based on 2023-24 declared rates)
- Guaranteed additions: 1% of Sum Assured per year (illustrative)

Built with ❤️ for LIC Insurance Advisors

---

## 🤝 Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
