import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import FreedomBird from './FreedomBird';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from './ProgressBar';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { progress } = useProgress();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 space-x-reverse group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <FreedomBird size="sm" animated />
            </div>
            <div className="hidden xs:block">
              <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent block">
                سفر آزادی
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 block">Journey to Freedom</span>
            </div>
          </Link>

          {/* Progress Indicator */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse flex-1 max-w-md mx-4 md:mx-8">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">پیشرفت شما</span>
                <span className="text-xs sm:text-sm font-bold text-primary-600">
                  {progress.chaptersRead.length}/{progress.totalChapters}
                </span>
              </div>
              <ProgressBar />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              صفحه اصلی
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              منابع
            </Link>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-semibold text-sm md:text-base transition-colors px-2 md:px-3 py-2 rounded-lg hover:bg-gray-50">
              درباره
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="منوی موبایل"
          >
            {isOpen ? (
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {/* Mobile Progress Indicator */}
            {progress.chaptersRead.length > 0 && (
              <div className="px-3 py-3 mb-2 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">پیشرفت شما</span>
                  <span className="text-sm font-bold text-primary-600">
                    {progress.chaptersRead.length}/{progress.totalChapters}
                  </span>
                </div>
                <ProgressBar />
              </div>
            )}
            <Link
              to="/"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              صفحه اصلی
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              منابع
            </Link>
            <a
              href="#about"
              className="block px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              درباره
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

