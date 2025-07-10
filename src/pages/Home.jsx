import React from 'react';
import { Link } from 'react-router-dom';
import { licPlans } from '../data/licPlans';

const Home = () => {
  const featuredPlans = licPlans.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-lic-blue to-lic-light-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-marathi">
                तुमच्या कुटुंबाची आर्थिक सुरक्षा आमची जबाबदारी
              </h1>
              <p className="text-xl mb-8 text-gray-200 font-marathi">
                25+ वर्षांचा अनुभव असलेले LIC सल्लागार. आम्ही तुमच्या गरजेनुसार योग्य विमा योजना सुचवतो.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/calculator" className="btn-secondary text-center">
                  प्रीमियम मोजा
                </Link>
                <Link to="/contact" className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-lic-blue transition-colors duration-200 text-center">
                  संपर्क साधा
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-32 h-32 bg-lic-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl">👨‍💼</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">श्री भालचंद्र मोहिते </h3>
                  <p className="text-lg font-marathi mb-2">LIC Authorized Agent</p>
                  <p className="text-gray-200 font-marathi">25+ वर्षांचा अनुभव</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">1000+</div>
                      <div className="text-sm text-gray-200 font-marathi">समाधानी ग्राहक</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-gray-200 font-marathi">Active Policies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lic-blue mb-4 font-marathi">
              आमच्या सेवा
            </h2>
            <p className="text-xl text-gray-600 font-marathi">
              सर्व प्रकारच्या LIC विमा योजनांमध्ये तज्ञ सल्ला
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🛡️', title: 'टर्म इन्शुरन्स', desc: 'कमी प्रीमियममध्ये उच्च संरक्षण' },
              { icon: '💰', title: 'एंडोमेंट प्लान', desc: 'बचत आणि विमा एकत्र' },
              { icon: '👴', title: 'पेन्शन योजना', desc: 'निवृत्तीनंतरची आर्थिक सुरक्षा' },
              { icon: '📈', title: 'ULIP योजना', desc: 'गुंतवणूक आणि विमा एकत्र' }
            ].map((service, index) => (
              <div key={index} className="card text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-lic-blue mb-2 font-marathi">{service.title}</h3>
                <p className="text-gray-600 font-marathi">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lic-blue mb-4 font-marathi">
              लोकप्रिय विमा योजना
            </h2>
            <p className="text-xl text-gray-600 font-marathi">
              सर्वाधिक निवडल्या जाणाऱ्या योजना
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPlans.map((plan) => (
              <div key={plan.id} className="card hover:scale-105 transition-transform duration-200">
                <h3 className="text-xl font-bold text-lic-blue mb-3 font-marathi">{plan.name}</h3>
                <p className="text-gray-600 mb-4 font-marathi line-clamp-3">{plan.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-lic-yellow text-lic-blue px-3 py-1 rounded-full text-sm font-medium">
                    {plan.term}
                  </span>
                  <span className="text-lic-blue font-bold">
                    ₹{plan.ratePerThousand}/1000
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  {plan.benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600 font-marathi">
                      <span className="text-lic-yellow mr-2">✓</span>
                      {benefit}
                    </div>
                  ))}
                </div>
                <Link to="/calculator" className="btn-primary w-full text-center">
                  प्रीमियम मोजा
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/plans-marathi" className="btn-secondary">
              सर्व योजना पहा
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-lic-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-marathi">
              आमची निवड का करावी?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🏆', title: '25+ वर्षांचा अनुभव', desc: 'विमा क्षेत्रातील प्रगल्भ अनुभव' },
              { icon: '🤝', title: 'वैयक्तिक सेवा', desc: 'प्रत्येक ग्राहकाला वेगळे लक्ष' },
              { icon: '📞', title: '24/7 सपोर्ट', desc: 'कधीही संपर्क साधा' },
              { icon: '✅', title: 'पारदर्शी सल्ला', desc: 'कोणतेही छुपे शुल्क नाही' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2 font-marathi">{feature.title}</h3>
                <p className="text-gray-200 font-marathi">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lic-yellow">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-lic-blue mb-4 font-marathi">
            आजच सुरुवात करा
          </h2>
          <p className="text-xl text-lic-blue mb-8 font-marathi">
            तुमच्या कुटुंबाच्या भविष्याची सुरक्षा करण्यासाठी आजच योग्य विमा योजना निवडा
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/calculator" className="btn-primary">
              प्रीमियम कॅल्क्युलेटर
            </Link>
            <Link to="/contact" className="bg-white text-lic-blue px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              मुफत सल्ला घ्या
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
