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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <FreedomBird size="sm" animated />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent block">
                سفر آزادی
              </span>
              <span className="text-xs text-gray-500 block">Journey to Freedom</span>
            </div>
          </Link>

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse flex-1 max-w-md mx-8">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-semibold text-gray-700">پیشرفت شما</span>
                <span className="text-sm font-bold text-primary-600">
                  {progress.chaptersRead.length}/{progress.totalChapters}
                </span>
              </div>
              <ProgressBar />
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-semibold text-base transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
              صفحه اصلی
            </Link>
            <Link to="/resources" className="text-gray-700 hover:text-primary-600 font-semibold text-base transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
              منابع
            </Link>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-semibold text-base transition-colors px-3 py-2 rounded-lg hover:bg-gray-50">
              درباره
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              صفحه اصلی
            </Link>
            <Link
              to="/resources"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              منابع
            </Link>
            <a
              href="#about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
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

