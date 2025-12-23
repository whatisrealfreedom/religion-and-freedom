import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-12 sm:mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">سفر آزادی</h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              نظریه‌ای انقلابی از محمدعلی جنت‌خواه که دین و آزادی را برای همیشه آشتی می‌دهد
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block">
                  منابع و PDFها
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">درباره</h3>
            <p className="text-sm sm:text-base text-gray-300">
              این سایت به صورت کامل و جامع، نظریه آزادی جنت‌خواه را بررسی می‌کند.
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="text-xs sm:text-sm md:text-base">&copy; {new Date().getFullYear()} سفر آزادی. همه حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

