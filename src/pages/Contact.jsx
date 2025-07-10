import React from 'react';
import ContactForm from '../components/ContactForm';
import profileImage from '../assets/profile.jpeg'; // Adjust the path as necessary

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-lic-blue mb-4 font-marathi">
            आमच्याशी संपर्क साधा
          </h1>
          <p className="text-xl text-gray-600 font-marathi">
            विमा संबंधी कोणत्याही प्रश्नासाठी आम्ही उपलब्ध आहोत
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="card">
              <h2 className="text-xl font-bold text-lic-blue mb-6 font-marathi">
                संपर्क माहिती
              </h2>
              
              {/* Agent Details */}
              <div className="text-center mb-6">
                  <div className="w-32 h-32 bg-lic-yellow rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    <img 
                      src={profileImage} 
                      alt="श्री भालचंद्र मोहिते - LIC Agent" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                <h3 className="text-lg font-bold text-lic-blue mb-1">श्री भालचंद्र मोहिते </h3>
                <p className="text-gray-600 font-marathi">LIC Authorized Agent</p>
                <p className="text-sm text-gray-500">Agent Code: 5115968</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-lic-blue text-white rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <div className="font-semibold text-lic-blue">फोन</div>
                    <a href="tel:+919890233529" className="text-gray-600 hover:text-lic-blue">
                      +91 98902 33529
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                    💬
                  </div>
                  <div>
                    <div className="font-semibold text-lic-blue font-marathi">WhatsApp</div>
                    <a href="https://wa.me/919890233529" target="_blank" rel="noopener noreferrer" 
                       className="text-gray-600 hover:text-green-600">
                      +91 98902 33529
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <div className="font-semibold text-lic-blue">ईमेल</div>
                    <a href="mailto:bsmohite9890@gmail.com" className="text-gray-600 hover:text-lic-blue">
                      bsmohite9890@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <div className="font-semibold text-lic-blue font-marathi">कार्यालय</div>
                    <p className="text-gray-600 font-marathi">
                      गणपती  दरवाजेच्या वरती, <br/>
                      बाजारपेठ, नगरदेवळा, ४२४१०४
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-lic-blue mb-3 font-marathi">कार्यालयीन वेळ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-marathi">सोमवार - शनिवार</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-marathi">रविवार</span>
                    <span>10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Services */}
            <div className="card mt-6">
              <h3 className="text-lg font-bold text-lic-blue mb-4 font-marathi">
                त्वरित सेवा
              </h3>
              <div className="space-y-3">
                <a href="/calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-lic-blue hover:text-white transition-colors group">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:text-white">🔢</span>
                    <div>
                      <div className="font-medium font-marathi">प्रीमियम कॅल्क्युलेटर</div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-200 font-marathi">अंदाजे प्रीमियम मोजा</div>
                    </div>
                  </div>
                </a>
                
                <a href="/plans-marathi" className="block p-3 bg-gray-50 rounded-lg hover:bg-lic-blue hover:text-white transition-colors group">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:text-white">📋</span>
                    <div>
                      <div className="font-medium font-marathi">योजना पहा</div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-200 font-marathi">सर्व LIC योजना</div>
                    </div>
                  </div>
                </a>
               
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 card">
          <h2 className="text-2xl font-bold text-lic-blue mb-6 font-marathi text-center">
            वारंवार विचारले जाणारे प्रश्न
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">LIC मध्ये विमा कसा घ्यावा?</h3>
              <p className="text-gray-600 text-sm font-marathi mb-4">
                आमच्याशी संपर्क साधा, आम्ही तुमच्या गरजेनुसार योजना सुचवू आणि सर्व कागदपत्रांमध्ये मदत करू.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">किती प्रीमियम भरावा लागेल?</h3>
              <p className="text-gray-600 text-sm font-marathi mb-4">
                तुमचे वय, विमा रक्कम आणि योजनेवर प्रीमियम अवलंबून असते. आमचा कॅल्क्युलेटर वापरून अंदाजे मोजा.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">क्लेम कसा करावा?</h3>
              <p className="text-gray-600 text-sm font-marathi mb-4">
                क्लेम प्रक्रियेमध्ये आम्ही पूर्ण मदत करतो. आवश्यक कागदपत्रे तयार करण्यापासून ते claim मिळेपर्यंत.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">वैद्यकीय तपासणी आवश्यक आहे का?</h3>
              <p className="text-gray-600 text-sm font-marathi mb-4">
                विमा रक्कम आणि वयानुसार. कमी रक्कमेसाठी साधारणत: तपासणी लागत नाही.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
