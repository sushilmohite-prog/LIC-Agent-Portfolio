import React from 'react';
import Calculator from '../components/Calculator';

const CalculatorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-lic-blue mb-4 font-marathi">
            प्रीमियम कॅल्क्युलेटर
          </h1>
          <p className="text-xl text-gray-600 font-marathi">
            तुमच्या विमा योजनेचा अंदाजे प्रीमियम मोजा
          </p>
        </div>

        {/* Calculator Component */}
        <Calculator />

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-lic-blue mb-6 font-marathi text-center">
            प्रीमियम कॅल्क्युलेटर कसे वापरावे?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">तुमचे वय टाका</h3>
              <p className="text-gray-600 text-sm font-marathi">18 ते 65 वर्षांच्या दरम्यान</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">विमा रक्कम निवडा</h3>
              <p className="text-gray-600 text-sm font-marathi">किमान ₹1 लाख</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">टर्म निवडा</h3>
              <p className="text-gray-600 text-sm font-marathi">10 ते 35 वर्षे</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-lic-blue mb-2 font-marathi">योजना निवडा</h3>
              <p className="text-gray-600 text-sm font-marathi">तुमच्या गरजेनुसार</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4 font-marathi">
            ⚠️ महत्त्वाची माहिती:
          </h3>
          <ul className="space-y-2 text-yellow-700 font-marathi">
            <li>• हे केवळ अंदाजे आकडे आहेत, अचूक प्रीमियम वेगळे असू शकते</li>
            <li>• वैद्यकीय तपासणी, आरोग्य स्थिती आणि व्यवसायावर प्रीमियम अवलंबून असते</li>
            <li>• GST आणि इतर शुल्क वेगळे लागू होतात</li>
            <li>• अधिक अचूक माहितीसाठी आमच्याशी संपर्क साधा</li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-lic-blue mb-4 font-marathi">
            अधिक सल्ला हवा?
          </h3>
          <p className="text-gray-600 mb-6 font-marathi">
            आमच्या तज्ञांकडून मुफत सल्ला घ्या आणि तुमच्यासाठी सर्वोत्तम योजना निवडा
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/contact" className="btn-primary">
              संपर्क साधा
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              WhatsApp करा
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPage;
