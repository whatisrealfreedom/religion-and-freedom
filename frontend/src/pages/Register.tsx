import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authApi, setAuthToken } from '../services/api';
import { useLocale } from '../i18n/LocaleProvider';
import { withLocalePath } from '../i18n/localePath';
import { Locale } from '../i18n/messages';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const Register: React.FC = () => {
  const { locale } = useParams<{ locale: string }>();
  const { isRTL } = useLocale();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(isRTL ? 'رمزهای عبور مطابقت ندارند' : 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError(isRTL ? 'رمز عبور باید حداقل 6 کاراکتر باشد' : 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authApi.register({
        email: formData.email,
        password: formData.password,
        name: formData.name || undefined,
      });
      setSuccess(isRTL ? 'ثبت نام موفق! لطفا ایمیل خود را بررسی کنید.' : 'Registration successful! Please check your email.');
      setStep('verify');
    } catch (err: any) {
      setError(err.response?.data?.error || (isRTL ? 'ثبت نام ناموفق بود. لطفا دوباره تلاش کنید.' : 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setVerifying(true);

    try {
      const response = await authApi.verifyEmail({
        email: formData.email,
        code: verificationCode,
      });
      setAuthToken(response.token);
      setSuccess(isRTL ? 'ایمیل تایید شد! در حال انتقال...' : 'Email verified! Redirecting...');
      setTimeout(() => {
        const validLocale: Locale = (locale === 'fa' || locale === 'en') ? locale : 'fa';
        navigate(withLocalePath(validLocale, '/'));
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || (isRTL ? 'کد تایید نامعتبر است' : 'Invalid verification code'));
    } finally {
      setVerifying(false);
    }
  };

  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                RealFreedom
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                {isRTL ? 'تایید ایمیل' : 'Verify Email'}
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
              >
                <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700 text-sm">{error}</p>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
              >
                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                <p className="text-green-700 text-sm">{success}</p>
              </motion.div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <p className="text-sm text-gray-600 mb-4 text-center">
                  {isRTL 
                    ? `کد تایید 5 رقمی به ${formData.email} ارسال شد. لطفا کد را وارد کنید.`
                    : `A 5-digit verification code has been sent to ${formData.email}. Please enter the code.`
                  }
                </p>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                  {isRTL ? 'کد تایید' : 'Verification Code'}
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  maxLength={5}
                  required
                  value={verificationCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                    setVerificationCode(value);
                    setError('');
                  }}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-center text-2xl tracking-widest font-mono"
                  placeholder="00000"
                />
              </div>

              <button
                type="submit"
                disabled={verifying || verificationCode.length !== 5}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {verifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {isRTL ? 'در حال تایید...' : 'Verifying...'}
                  </span>
                ) : (
                  isRTL ? 'تایید' : 'Verify'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setStep('register')}
                className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
              >
                {isRTL ? 'بازگشت به ثبت نام' : 'Back to registration'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
              RealFreedom
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              {isRTL ? 'ایجاد حساب کاربری جدید' : 'Create a new account'}
            </p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
            >
              <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
            >
              <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </motion.div>
          )}

          {/* Register Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Field (Optional) */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'نام (اختیاری)' : 'Name (Optional)'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder={isRTL ? 'نام خود را وارد کنید' : 'Enter your name'}
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'ایمیل' : 'Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder={isRTL ? 'ایمیل خود را وارد کنید' : 'Enter your email'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'رمز عبور' : 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder={isRTL ? 'رمز عبور خود را وارد کنید' : 'Enter your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                {isRTL ? 'تایید رمز عبور' : 'Confirm Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  placeholder={isRTL ? 'رمز عبور را دوباره وارد کنید' : 'Confirm your password'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {isRTL ? 'در حال ثبت نام...' : 'Registering...'}
                </span>
              ) : (
                isRTL ? 'ثبت نام' : 'Sign Up'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isRTL ? 'قبلا ثبت نام کرده‌اید؟' : 'Already have an account?'}{' '}
              <Link
                to={withLocalePath((locale === 'fa' || locale === 'en') ? locale : 'fa', '/login')}
                className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
              >
                {isRTL ? 'ورود' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

