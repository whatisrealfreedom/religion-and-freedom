import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../../i18n/LocaleProvider';

interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
  minLength?: number;
  maxLength?: number;
  showPreview?: boolean;
}

const RichEditor: React.FC<RichEditorProps> = ({
  value,
  onChange,
  onSubmit,
  onCancel,
  placeholder,
  submitLabel,
  cancelLabel,
  minLength = 1,
  maxLength = 10000,
  showPreview = true,
}) => {
  const { isRTL } = useLocale();
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = () => {
    if (value.trim().length >= minLength && value.trim().length <= maxLength) {
      onSubmit();
    }
  };

  const canSubmit = value.trim().length >= minLength && value.trim().length <= maxLength;

  // Simple markdown rendering
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br />');
    return { __html: html };
  };

  return (
    <div className="space-y-3">
      <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-primary-500 transition-colors">
        {showPreview && (
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsPreview(false)}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                !isPreview
                  ? 'bg-white text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isRTL ? 'ویرایش' : 'Edit'}
            </button>
            <button
              onClick={() => setIsPreview(true)}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                isPreview
                  ? 'bg-white text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isRTL ? 'پیش‌نمایش' : 'Preview'}
            </button>
          </div>
        )}

        {isPreview ? (
          <div
            className="p-4 min-h-[150px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={renderMarkdown(value || placeholder || '')}
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-4 min-h-[150px] resize-none focus:outline-none"
            dir={isRTL ? 'rtl' : 'ltr'}
            maxLength={maxLength}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">
          {value.length} / {maxLength} {isRTL ? 'کاراکتر' : 'characters'}
        </span>
        <div className="flex gap-2">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {cancelLabel || (isRTL ? 'لغو' : 'Cancel')}
            </button>
          )}
          <motion.button
            whileHover={{ scale: canSubmit ? 1.05 : 1 }}
            whileTap={{ scale: canSubmit ? 0.95 : 1 }}
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              px-6 py-2 text-sm font-semibold rounded-lg transition-colors
              ${canSubmit
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {submitLabel || (isRTL ? 'ارسال' : 'Submit')}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RichEditor;

