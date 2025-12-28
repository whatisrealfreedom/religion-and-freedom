import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { authApi, setAuthToken } from '../services/api';
import { useLocale } from '../i18n/LocaleProvider';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  EyeIcon, 
  EyeSlashIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { isRTL } = useLocale();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [step, setStep] = useState<'form' | 'verify'>('form');
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  // Register state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  // Verification state
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Resend code timer effect
  useEffect(() => {
    if (step === 'verify' && resendTimer > 0) {
      timerRef.current = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [step, resendTimer]);

  // Start timer when entering verify step
  useEffect(() => {
    if (step === 'verify' && resendTimer === 0) {
      setResendTimer(40);
    }
  }, [step]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    setLoginLoading(true);

    try {
      const response = await authApi.login(loginData);
      setAuthToken(response.token);
      setLoginSuccess(isRTL ? 'ورود موفق! در حال انتقال...' : 'Login successful! Redirecting...');
      setTimeout(() => {
        onClose();
        // Dispatch a custom event to notify Navbar of auth state change
        window.dispatchEvent(new Event('authStateChanged'));
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || (isRTL ? 'ورود ناموفق بود. لطفا دوباره تلاش کنید.' : 'Login failed. Please try again.');
      
      // Check if email is not verified
      if (errorMessage.includes('Email not verified') || errorMessage.includes('email not verified')) {
        // Switch to verification step using login email
        setRegisterData({ ...registerData, email: loginData.email });
        setStep('verify');
        setLoginError('');
        // Automatically resend verification code
        try {
          await authApi.resendVerificationCode(loginData.email);
          setRegisterSuccess(isRTL ? 'کد تایید مجدداً ارسال شد. لطفا ایمیل خود را بررسی کنید.' : 'Verification code has been resent. Please check your email.');
        } catch (resendErr: any) {
          setVerifyError(resendErr.response?.data?.error || (isRTL ? 'خطا در ارسال مجدد کد' : 'Failed to resend code'));
        }
      } else {
        setLoginError(errorMessage);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (registerData.password.length < 6) {
      setRegisterError(isRTL ? 'رمز عبور باید حداقل 6 کاراکتر باشد' : 'Password must be at least 6 characters');
      return;
    }

    setRegisterLoading(true);

    try {
      await authApi.register({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name || undefined,
      });
      setRegisterSuccess(isRTL ? 'ثبت نام موفق! لطفا ایمیل خود را بررسی کنید.' : 'Registration successful! Please check your email.');
      setStep('verify');
    } catch (err: any) {
      setRegisterError(err.response?.data?.error || (isRTL ? 'ثبت نام ناموفق بود. لطفا دوباره تلاش کنید.' : 'Registration failed. Please try again.'));
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifyError('');
    setVerifying(true);

    try {
      // Use registerData.email (which might be set from login)
      const emailToVerify = registerData.email || loginData.email;
      const response = await authApi.verifyEmail({
        email: emailToVerify,
        code: verificationCode,
      });
      setAuthToken(response.token);
      setRegisterSuccess(isRTL ? 'ایمیل تایید شد! در حال انتقال...' : 'Email verified! Redirecting...');
      setTimeout(() => {
        onClose();
        // Dispatch a custom event to notify Navbar of auth state change
        window.dispatchEvent(new Event('authStateChanged'));
        window.location.reload();
      }, 1000);
    } catch (err: any) {
      setVerifyError(err.response?.data?.error || (isRTL ? 'کد تایید نامعتبر است' : 'Invalid verification code'));
      // Reset timer on error so user can request new code
      setResendTimer(0);
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (resendTimer > 0) return; // Prevent multiple requests

    setVerifyError('');
    setVerificationCode('');

    try {
      // Use registerData.email (which might be set from login)
      const emailToResend = registerData.email || loginData.email;
      await authApi.resendVerificationCode(emailToResend);
      setResendTimer(40); // Start 40 second timer after successful send
    } catch (err: any) {
      setVerifyError(err.response?.data?.error || (isRTL ? 'خطا در ارسال مجدد کد' : 'Failed to resend code'));
      setResendTimer(0); // Reset timer on error so user can try again
    }
  };

  const resetForm = () => {
    setStep('form');
    setLoginData({ email: '', password: '' });
    setRegisterData({ email: '', password: '', name: '' });
    setVerificationCode('');
    setLoginError('');
    setRegisterError('');
    setVerifyError('');
    setLoginSuccess('');
    setRegisterSuccess('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            style={{ minHeight: '100vh' }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden my-auto"
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-8 pb-6">
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 text-white/90 hover:text-white transition-all hover:scale-110 rounded-full p-1 hover:bg-white/10"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-1">
                    RealFreedom
                  </h2>
                  <p className="text-white/80 text-sm">
                    {step === 'form' 
                      ? (isRTL ? 'به دنیای آزادی خوش آمدید' : 'Welcome to Freedom')
                      : (isRTL ? 'تایید ایمیل' : 'Email Verification')
                    }
                  </p>
                </div>
                {step === 'form' && (
                  <div className="flex mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-1.5 border border-white/20">
                    <button
                      onClick={() => {
                        setActiveTab('login');
                        resetForm();
                      }}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                        activeTab === 'login'
                          ? 'bg-white text-primary-700 shadow-lg scale-105'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isRTL ? 'ورود' : 'Login'}
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('register');
                        resetForm();
                      }}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all duration-200 ${
                        activeTab === 'register'
                          ? 'bg-white text-primary-700 shadow-lg scale-105'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {isRTL ? 'ثبت نام' : 'Sign Up'}
                    </button>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8 pt-6">
                {step === 'form' ? (
                  activeTab === 'login' ? (
                    // Login Form
                    <form onSubmit={handleLogin} className="space-y-4">
                      {loginError && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                        >
                          <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{loginError}</p>
                        </motion.div>
                      )}

                      {loginSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <p className="text-green-700 text-sm">{loginSuccess}</p>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                          {isRTL ? 'ایمیل' : 'Email'}
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            required
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={isRTL ? 'ایمیل خود را وارد کنید' : 'Enter your email'}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                          {isRTL ? 'رمز عبور' : 'Password'}
                        </label>
                        <div className="relative">
                          <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showLoginPassword ? 'text' : 'password'}
                            required
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                            className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={isRTL ? 'رمز عبور خود را وارد کنید' : 'Enter your password'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showLoginPassword ? (
                              <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loginLoading}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
                      >
                        {loginLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            {isRTL ? 'در حال ورود...' : 'Signing in...'}
                          </span>
                        ) : (
                          isRTL ? 'ورود' : 'Sign In'
                        )}
                      </button>
                    </form>
                  ) : (
                    // Register Form
                    <form onSubmit={handleRegister} className="space-y-4">
                      {registerError && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                        >
                          <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                          <p className="text-red-700 text-sm">{registerError}</p>
                        </motion.div>
                      )}

                      {registerSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
                        >
                          <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <p className="text-green-700 text-sm">{registerSuccess}</p>
                        </motion.div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                          {isRTL ? 'نام (اختیاری)' : 'Name (Optional)'}
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={registerData.name}
                            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={isRTL ? 'نام خود را وارد کنید' : 'Enter your name'}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                          {isRTL ? 'ایمیل' : 'Email'}
                        </label>
                        <div className="relative">
                          <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            required
                            value={registerData.email}
                            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={isRTL ? 'ایمیل خود را وارد کنید' : 'Enter your email'}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2.5">
                          {isRTL ? 'رمز عبور' : 'Password'}
                        </label>
                        <div className="relative">
                          <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type={showRegisterPassword ? 'text' : 'password'}
                            required
                            value={registerData.password}
                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                            className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                            placeholder={isRTL ? 'رمز عبور خود را وارد کنید' : 'Enter your password'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showRegisterPassword ? (
                              <EyeSlashIcon className="w-5 h-5" />
                            ) : (
                              <EyeIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={registerLoading}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
                      >
                        {registerLoading ? (
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
                  )
                ) : (
                  // Verification Step
                  <form onSubmit={handleVerify} className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <EnvelopeIcon className="w-8 h-8 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {isRTL ? 'تایید ایمیل' : 'Verify Email'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {isRTL 
                          ? `کد تایید 5 رقمی به ${registerData.email || loginData.email} ارسال شد. لطفا کد را وارد کنید.`
                          : `A 5-digit verification code has been sent to ${registerData.email || loginData.email}. Please enter the code.`
                        }
                      </p>
                    </div>

                    {verifyError && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
                      >
                        <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{verifyError}</p>
                      </motion.div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 text-center">
                        {isRTL ? 'کد تایید' : 'Verification Code'}
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        required
                        value={verificationCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                          setVerificationCode(value);
                          setVerifyError('');
                        }}
                        className="block w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-center text-4xl tracking-[0.5em] font-mono bg-gray-50 focus:bg-white"
                        placeholder="00000"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={verifying || verificationCode.length !== 5}
                      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-4 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-6"
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

                    {/* Resend Code Button */}
                    <div className="mt-4 text-center">
                      {resendTimer > 0 ? (
                        <p className="text-sm text-gray-600">
                          {isRTL ? (
                            <>
                              درخواست مجدد کد در <span className="font-bold text-primary-600">{resendTimer}</span> ثانیه
                            </>
                          ) : (
                            <>
                              Resend code in <span className="font-bold text-primary-600">{resendTimer}</span> seconds
                            </>
                          )}
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendCode}
                          className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors underline"
                        >
                          {isRTL ? 'درخواست مجدد کد' : 'Resend Code'}
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setStep('form');
                        setVerifyError('');
                        setResendTimer(0);
                      }}
                      className="w-full text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors mt-2"
                    >
                      {isRTL ? 'بازگشت به ثبت نام' : 'Back to registration'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;

