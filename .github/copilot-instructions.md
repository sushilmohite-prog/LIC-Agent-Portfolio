<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# LIC Advisor Website - Copilot Instructions

## Project Overview
This is a React.js website for LIC Insurance Advisors with:
- Marathi language support using Devanagari script
- LIC branding colors (blue #023e8a, yellow #f9c74f)
- Premium calculator with real LIC plan rates
- Responsive design with TailwindCSS
- React Router for navigation

## Code Style Guidelines

### React Components
- Use functional components with hooks
- Follow proper JSX structure and formatting
- Use descriptive prop names and destructuring
- Implement proper error handling and validation

### Styling
- Use TailwindCSS utility classes
- Follow LIC brand colors: lic-blue, lic-yellow, lic-light-blue
- Ensure responsive design (mobile-first)
- Use font-marathi class for Marathi text

### Marathi Content
- Use proper Devanagari script for Marathi text
- Include both Marathi and English versions where needed
- Use font-marathi CSS class for Marathi typography
- Ensure proper line spacing for Devanagari text

### File Organization
- Keep components in /src/components/
- Keep pages in /src/pages/
- Keep data files in /src/data/
- Use descriptive file names and organize by feature

### Best Practices
- Implement proper form validation
- Use semantic HTML elements
- Ensure accessibility (ARIA labels, alt text)
- Optimize for SEO (meta tags, structured data)
- Follow React performance best practices

## LIC Specific Guidelines
- Use official LIC plan names and details
- Implement accurate premium calculation formulas
- Include proper disclaimers for estimated calculations
- Use professional insurance terminology
- Ensure compliance with insurance industry standards

## Dependencies
- React Router DOM for navigation
- TailwindCSS for styling
- React Hook Form for form handling
- Custom LIC plans data structure
