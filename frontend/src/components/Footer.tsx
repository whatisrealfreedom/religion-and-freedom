import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">سفر آزادی</h3>
            <p className="text-gray-300 leading-relaxed">
              نظریه‌ای انقلابی از محمدعلی جنت‌خواه که دین و آزادی را برای همیشه آشتی می‌دهد
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors">
                  منابع و PDFها
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">درباره</h3>
            <p className="text-gray-300">
              این سایت به صورت کامل و جامع، نظریه آزادی جنت‌خواه را بررسی می‌کند.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} سفر آزادی. همه حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

