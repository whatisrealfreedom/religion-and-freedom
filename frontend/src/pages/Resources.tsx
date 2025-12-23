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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            منابع و PDFها
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            دسترسی به تمام فایل‌های PDF نظریه آزادی جنت‌خواه
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600">در حال بارگذاری...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pdfs.map((pdf, index) => (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:scale-105"
              >
                <div className="flex items-start space-x-4 space-x-reverse mb-4">
                  <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <DocumentIcon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-red-600 font-semibold mb-1">
                      PDF {pdf.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
                      {pdf.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {pdf.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    {pdf.pages} صفحه • {formatFileSize(pdf.file_size)}
                  </div>
                  <a
                    href={pdf.file_url}
                    download
                    className="flex items-center space-x-1 space-x-reverse text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                  >
                    <span>دانلود</span>
                    <ArrowDownTrayIcon className="w-5 h-5" />
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

