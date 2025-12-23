import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { resourceApi, PDFResource } from '../services/api';
import { DocumentIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const Resources: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDFResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const data = await resourceApi.getPDFs();
        setPdfs(data);
      } catch (error) {
        console.error('Failed to fetch PDFs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPDFs();
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
            منابع و PDFها
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            دسترسی به تمام فایل‌های PDF نظریه آزادی جنت‌خواه
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600 text-sm sm:text-base">در حال بارگذاری...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {pdfs.map((pdf, index) => (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:scale-105"
              >
                <div className="flex items-start space-x-3 sm:space-x-4 space-x-reverse mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform flex-shrink-0">
                    <DocumentIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-red-600 font-semibold mb-1">
                      PDF {pdf.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors leading-tight">
                      {pdf.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4">
                      {pdf.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 flex-wrap gap-2">
                  <div className="text-xs sm:text-sm text-gray-500">
                    {pdf.pages} صفحه • {formatFileSize(pdf.file_size)}
                  </div>
                  <a
                    href={pdf.file_url}
                    download
                    className="flex items-center space-x-1 space-x-reverse text-primary-600 hover:text-primary-700 font-semibold transition-colors text-xs sm:text-sm"
                  >
                    <span>دانلود</span>
                    <ArrowDownTrayIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;

