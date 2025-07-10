import React from 'react';

const PlanCard = ({ plan }) => {
  return (
    <div className="card mb-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-lic-blue font-marathi">{plan.name}</h3>
        <span className="bg-lic-yellow text-lic-blue px-3 py-1 rounded-full text-sm font-medium">
          {plan.term}
        </span>
      </div>
      
      <p className="text-gray-700 mb-4 font-marathi leading-relaxed">
        {plan.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 font-marathi">किमान वय</div>
          <div className="font-bold text-lic-blue">{plan.minAge} वर्षे</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 font-marathi">कमाल वय</div>
          <div className="font-bold text-lic-blue">{plan.maxAge} वर्षे</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold text-lic-blue mb-2 font-marathi">मुख्य फायदे:</h4>
        <ul className="space-y-1">
          {plan.benefits.map((benefit, index) => (
            <li key={index} className="flex items-center text-gray-700 font-marathi">
              <span className="text-lic-yellow mr-2">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-marathi">दर प्रति हजार:</span>
          <span className="font-bold text-lic-blue"> ₹{plan.ratePerThousand}</span>
        </div>
        <button className="btn-primary text-sm">
          अधिक माहिती
        </button>
      </div>
    </div>
  );
};

export default PlanCard;
