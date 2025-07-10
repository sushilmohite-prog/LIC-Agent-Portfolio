import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lic-blue text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-lic-yellow rounded-full flex items-center justify-center">
                <span className="text-lic-blue font-bold text-sm">LIC</span>
              </div>
              <span className="font-bold text-lg">LIC सल्लागार</span>
            </div>
            <p className="text-gray-200 mb-4 font-marathi">
              आम्ही LIC च्या सर्व विमा योजनांमध्ये तज्ञ आहोत. तुमच्या आर्थिक गरजांनुसार योग्य विमा योजना निवडण्यात आम्ही तुमची मदत करतो.
            </p>
            <div className="flex space-x-4">
              <a href="tel:+919890233529" className="text-lic-yellow hover:text-white transition-colors">
                📞 +91 98902 33529
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-marathi">द्रुत दुवे</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-200 hover:text-lic-yellow transition-colors font-marathi">होम</a></li>
              <li><a href="/plans-marathi" className="text-gray-200 hover:text-lic-yellow transition-colors font-marathi">योजना</a></li>
              <li><a href="/calculator" className="text-gray-200 hover:text-lic-yellow transition-colors font-marathi">कॅल्क्युलेटर</a></li>
              <li><a href="/contact" className="text-gray-200 hover:text-lic-yellow transition-colors font-marathi">संपर्क</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 font-marathi">सेवा</h3>
            <ul className="space-y-2 text-gray-200 font-marathi">
              <li>जीवन विमा</li>
              <li>टर्म इन्शुरन्स</li>
              <li>एंडोमेंट प्लान</li>
              <li>पेन्शन योजना</li>
              <li>ULIP योजना</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200 text-sm font-marathi">
              © {currentYear} Sushil Mohite. सर्व हक्क राखीव.
              for development contact <a href="mailto:sbmohite2070@gmail.com" className="text-lic-yellow hover:underline">Sushil Mohite</a>
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-200 hover:text-lic-yellow transition-colors text-sm">
                गोपनीयता धोरण
              </a>
              <a href="#" className="text-gray-200 hover:text-lic-yellow transition-colors text-sm">
                नियम व अटी
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
