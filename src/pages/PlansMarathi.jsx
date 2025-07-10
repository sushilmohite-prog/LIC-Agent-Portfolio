import React, { useState } from 'react';
import { licPlans } from '../data/licPlans';
import PlanCard from '../components/PlanCard';

const PlansMarathi = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlans, setFilteredPlans] = useState(licPlans);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = licPlans.filter(plan => 
      plan.name.toLowerCase().includes(term) ||
      plan.description.toLowerCase().includes(term) ||
      plan.englishName.toLowerCase().includes(term)
    );
    setFilteredPlans(filtered);
  };

  const categories = [
    { name: 'सर्व योजना', value: 'all' },
    { name: 'टर्म प्लान', value: 'term' },
    { name: 'एंडोमेंट प्लान', value: 'endowment' },
    { name: 'पेन्शन योजना', value: 'pension' }
  ];

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredPlans(licPlans);
    } else if (category === 'term') {
      setFilteredPlans(licPlans.filter(plan => plan.name.includes('टेक टर्म') || plan.name.includes('आधार शिला')));
    } else if (category === 'endowment') {
      setFilteredPlans(licPlans.filter(plan => plan.name.includes('जीवन आनंद') || plan.name.includes('एंडोमेंट')));
    } else {
      setFilteredPlans(licPlans.filter(plan => plan.name.includes('उमंग')));
    }
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-lic-blue mb-4 font-marathi">
            LIC विमा योजना
          </h1>
          <p className="text-xl text-gray-600 font-marathi">
            तुमच्या गरजेनुसार योग्य विमा योजना निवडा
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Box */}
            <div className="w-full md:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="योजना शोधा..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lic-blue font-marathi"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => filterByCategory(category.value)}
                  className="px-4 py-2 rounded-lg font-medium transition-colors font-marathi hover:bg-lic-blue hover:text-white border border-lic-blue text-lic-blue"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plans Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-marathi">
            {filteredPlans.length} योजना आढळल्या
          </p>
        </div>

        {/* Plans Grid */}
        {filteredPlans.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPlans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.071-2.33C8.148 12.146 10.046 12 12 12c1.954 0 3.852.146 6.071.67A7.962 7.962 0 0112 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-marathi">
              कोणती योजना सापडली नाही
            </h3>
            <p className="text-gray-500 font-marathi">
              कृपया वेगळे keyword वापरून पुन्हा शोधा
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilteredPlans(licPlans);
              }}
              className="mt-4 btn-secondary"
            >
              सर्व योजना पहा
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-lic-blue mb-6 font-marathi text-center">
            योजना निवडताना लक्षात ठेवा
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-lic-blue mb-4 font-marathi">
                महत्त्वाचे मुद्दे:
              </h3>
              <ul className="space-y-2 text-gray-700 font-marathi">
                <li className="flex items-start">
                  <span className="text-lic-yellow mr-2 mt-1">•</span>
                  तुमचे वय आणि आर्थिक स्थिती लक्षात घ्या
                </li>
                <li className="flex items-start">
                  <span className="text-lic-yellow mr-2 mt-1">•</span>
                  कुटुंबाच्या गरजांनुसार विमा रक्कम ठरवा
                </li>
                <li className="flex items-start">
                  <span className="text-lic-yellow mr-2 mt-1">•</span>
                  प्रीमियम भरण्याची क्षमता तपासा
                </li>
                <li className="flex items-start">
                  <span className="text-lic-yellow mr-2 mt-1">•</span>
                  योजनेचे फायदे आणि अटी वाचा
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-lic-blue mb-4 font-marathi">
                आमच्याकडून मिळणारे फायदे:
              </h3>
              <ul className="space-y-2 text-gray-700 font-marathi">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  मुफत सल्ला आणि योजना तुलना
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  पेपरवर्कमध्ये पूर्ण मदत
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  क्लेम प्रक्रियेमध्ये सहाय्य
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  आजीवन ग्राहक सेवा
                </li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4 font-marathi">
              योजना निवडण्यात अडचण येत आहे?
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/calculator" className="btn-primary">
                प्रीमियम मोजा
              </a>
              <a href="/contact" className="btn-secondary">
                मुफत सल्ला घ्या
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansMarathi;
