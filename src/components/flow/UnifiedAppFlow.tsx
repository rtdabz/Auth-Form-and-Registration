import React, { useState } from 'react';
import {
  GraduationCap,
  UserPlus,
  User,
  FileText,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send,
  RotateCcw,
  Sparkles,
  Phone,
  MapPin,
  AlertOctagon,
  LogOut,
  ArrowRight,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';

export type FlowStage =
  | 'login'
  | 'registration'
  | 'user_info'
  | 'request_info'
  | 'review'
  | 'confirmation';

export interface UnifiedFormData {
  // Step 1: Login
  loginEmail: string;
  loginPassword: string;
  rememberDevice: boolean;

  // Step 2: Registration (Create Account)
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currentSchoolOrWork: string;

  // Step 3: Personal Information
  dateOfBirth: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyPhone: string;
  emergencyRelation: string;

  // Step 4: Program Selection
  degreeType: string;
  department: string;
  major: string;
  startTerm: string;
  classFormat: string;
  notes: string;

  // Step 5: Review & Consent
  confirmAccuracy: boolean;

  // Confirmation Receipt
  generatedId: string;
  submissionTimestamp: string;
}

export const UnifiedAppFlow: React.FC = () => {
  const [stage, setStage] = useState<FlowStage>('login');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Form State across all continuous steps
  const [formData, setFormData] = useState<UnifiedFormData>({
    loginEmail: '',
    loginPassword: '',
    rememberDevice: false,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    currentSchoolOrWork: '',
    dateOfBirth: '',
    phone: '',
    address: '',
    emergencyContactName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    degreeType: '',
    department: '',
    major: '',
    startTerm: '',
    classFormat: '',
    notes: '',
    confirmAccuracy: false,
    generatedId: '',
    submissionTimestamp: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Strict email validation: requires an '@' symbol, domain name, dot, and valid extension
  // Will strictly reject plain names like "Richie" or plain numbers like "123"
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(val.trim());
  };

  const handleFieldChange = (field: keyof UnifiedFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Check validity for step 1 (Login)
  const isLoginValid =
    Boolean(formData.loginEmail.trim()) &&
    isValidEmail(formData.loginEmail) &&
    Boolean(formData.loginPassword);

  // Check validity for step 2 (Registration)
  const isRegistrationValid =
    Boolean(formData.fullName.trim()) &&
    formData.fullName.trim().length >= 2 &&
    Boolean(formData.email.trim()) &&
    isValidEmail(formData.email) &&
    Boolean(formData.password) &&
    formData.password.length >= 8 &&
    /\d/.test(formData.password) &&
    formData.password === formData.confirmPassword &&
    Boolean(formData.currentSchoolOrWork.trim());

  // Step-by-Step Validation with user-friendly error messages
  const validateStage = (currentStage: FlowStage): boolean => {
    const errs: Record<string, string> = {};

    if (currentStage === 'login') {
      if (!formData.loginEmail.trim()) {
        errs.loginEmail = 'Email address is required.';
      } else if (!isValidEmail(formData.loginEmail)) {
        errs.loginEmail =
          'Please enter a full email address with a domain (e.g. alex@example.com). Names like "Richie" or numbers like "123" are not valid.';
      }
      if (!formData.loginPassword) {
        errs.loginPassword = 'Password is required.';
      }
    } else if (currentStage === 'registration') {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        errs.fullName = 'Please enter your first and last name.';
      }
      if (!formData.email.trim()) {
        errs.email = 'Email address is required.';
      } else if (!isValidEmail(formData.email)) {
        errs.email =
          'Please enter a valid email address with a domain (e.g. alex@example.com). Just a name like "Richie" or number like "123" is not accepted.';
      }
      if (!formData.password || formData.password.length < 8) {
        errs.password = 'Password must be at least 8 characters long.';
      } else if (!/\d/.test(formData.password)) {
        errs.password = 'Password must include at least one number.';
      }
      if (formData.password !== formData.confirmPassword) {
        errs.confirmPassword = 'Passwords do not match. Please re-type your password.';
      }
      if (!formData.currentSchoolOrWork.trim()) {
        errs.currentSchoolOrWork = 'Please enter your current school or company name.';
      }
    } else if (currentStage === 'user_info') {
      if (!formData.dateOfBirth) {
        errs.dateOfBirth = 'Please select your date of birth.';
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 7) {
        errs.phone = 'Please enter a valid phone number with area code.';
      }
      if (!formData.address.trim()) {
        errs.address = 'Please enter your home address.';
      }
      if (!formData.emergencyContactName.trim()) {
        errs.emergencyContactName = 'Please enter an emergency contact name.';
      }
      if (!formData.emergencyPhone.trim()) {
        errs.emergencyPhone = 'Please enter an emergency contact phone number.';
      }
      if (!formData.emergencyRelation) {
        errs.emergencyRelation = 'Please select a relationship.';
      }
    } else if (currentStage === 'request_info') {
      if (!formData.degreeType) errs.degreeType = 'Please select a degree type.';
      if (!formData.department) errs.department = 'Please select a school or department.';
      if (!formData.major) errs.major = 'Please select a major.';
      if (!formData.startTerm) errs.startTerm = 'Please select when you want to start.';
      if (!formData.classFormat) errs.classFormat = 'Please select how you will attend classes.';
    } else if (currentStage === 'review') {
      if (!formData.confirmAccuracy) {
        errs.confirmAccuracy = 'Please check the box to confirm your information is true.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Step 1 Handler: Authenticates and moves directly to Step 2: Registration
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStage('login')) return;

    setLoginLoading(true);
    setLoginError(null);

    setTimeout(() => {
      setLoginLoading(false);
      if (formData.loginEmail.toLowerCase().includes('fail')) {
        setLoginError('Incorrect email or password. Please try again.');
      } else {
        // Pre-fill email in Registration and move directly to Step 2: Registration
        setFormData((prev) => ({
          ...prev,
          email: prev.email || prev.loginEmail,
        }));
        setStage('registration');
      }
    }, 500);
  };

  // Google Sign-In Handler: Authenticates with Google and moves directly to Step 2: Registration
  const handleGoogleSignIn = () => {
    setLoginLoading(true);
    setLoginError(null);

    setTimeout(() => {
      setLoginLoading(false);
      setFormData((prev) => ({
        ...prev,
        loginEmail: prev.loginEmail || 'student.alex@gmail.com',
        email: prev.email || 'student.alex@gmail.com',
        fullName: prev.fullName || 'Alex Rivera',
      }));
      setStage('registration');
    }, 500);
  };

  // Continuous flow forward navigation
  const handleNext = () => {
    if (stage === 'registration') {
      if (validateStage('registration')) setStage('user_info');
    } else if (stage === 'user_info') {
      if (validateStage('user_info')) setStage('request_info');
    } else if (stage === 'request_info') {
      if (validateStage('request_info')) setStage('review');
    } else if (stage === 'review') {
      if (validateStage('review')) {
        setIsConfirmModalOpen(true);
      }
    }
  };

  // Backward navigation
  const handleBack = () => {
    if (stage === 'registration') setStage('login');
    else if (stage === 'user_info') setStage('registration');
    else if (stage === 'request_info') setStage('user_info');
    else if (stage === 'review') setStage('request_info');
  };

  // Confirmation dialog submission
  const handleConfirmedSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);

      const now = new Date();
      const generatedCode = `APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const timestamp = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });

      setFormData((prev) => ({
        ...prev,
        generatedId: generatedCode,
        submissionTimestamp: timestamp,
      }));

      setStage('confirmation');
    }, 750);
  };

  const handleResetFlow = () => {
    setFormData({
      loginEmail: '',
      loginPassword: '',
      rememberDevice: false,
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      currentSchoolOrWork: '',
      dateOfBirth: '',
      phone: '',
      address: '',
      emergencyContactName: '',
      emergencyPhone: '',
      emergencyRelation: '',
      degreeType: '',
      department: '',
      major: '',
      startTerm: '',
      classFormat: '',
      notes: '',
      confirmAccuracy: false,
      generatedId: '',
      submissionTimestamp: '',
    });
    setErrors({});
    setStage('login');
  };

  // Simple, easy-to-understand step progress labels for the application form
  const stepsConfig = [
    { id: 'registration', number: 1, label: 'Account' },
    { id: 'user_info', number: 2, label: 'Personal Info' },
    { id: 'request_info', number: 3, label: 'Choose Program' },
    { id: 'review', number: 4, label: 'Review & Send' },
  ] as const;

  const getStepIndex = (current: FlowStage): number => {
    switch (current) {
      case 'registration':
        return 1;
      case 'user_info':
        return 2;
      case 'request_info':
        return 3;
      case 'review':
        return 4;
      case 'confirmation':
        return 5;
      default:
        return 0;
    }
  };

  const currentStepNumber = getStepIndex(stage);

  return (
    <div className="w-full max-w-2xl mx-auto text-left px-1 sm:px-0">
      {/* Visual Stepper: Hidden on Login screen and Confirmation receipt */}
      {stage !== 'login' && stage !== 'confirmation' && (
        <div className="mb-6 sm:mb-8" aria-label="Application Progress">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-6 right-6 sm:left-8 sm:right-8 top-4 sm:top-5 h-0.5 bg-slate-200 -z-0" />
            <div
              className="absolute left-6 top-4 sm:top-5 h-0.5 bg-indigo-600 transition-all duration-300 -z-0"
              style={{
                width: `${((currentStepNumber - 1) / (stepsConfig.length - 1)) * 100}%`,
              }}
            />

            {stepsConfig.map((s) => {
              const isDone = currentStepNumber > s.number;
              const isCurrent = currentStepNumber === s.number;
              const isRemaining = currentStepNumber < s.number;

              return (
                <div
                  key={s.id}
                  className="flex flex-col items-center relative z-10 select-none cursor-pointer"
                  onClick={() => {
                    // Allow navigating backwards directly to previously completed steps
                    if (s.number < currentStepNumber) {
                      setStage(s.id);
                    }
                  }}
                >
                  <div
                    className={`
                      w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm transition-all duration-200
                      ${
                        isDone
                          ? 'bg-emerald-600 text-white shadow-sm ring-2 sm:ring-4 ring-emerald-50'
                          : isCurrent
                          ? 'bg-indigo-600 text-white shadow-md ring-2 sm:ring-4 ring-indigo-100 ring-offset-1'
                          : 'bg-white text-slate-400 border-2 border-slate-300'
                      }
                    `}
                  >
                    {isDone ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : (
                      <span>{s.number}</span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] sm:text-xs font-semibold block mt-1.5 leading-tight truncate max-w-[65px] sm:max-w-none text-center ${
                      isCurrent
                        ? 'text-indigo-600'
                        : isDone
                        ? 'text-slate-900'
                        : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="text-[10px] text-slate-400 hidden sm:block">
                    {isDone ? 'Done' : isCurrent ? 'Active' : isRemaining ? 'Upcoming' : ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Single-Column Form Card */}
      <Card className="p-4 sm:p-8 shadow-sm">
        {/* =========================================================================
            STEP 1: LOGIN (Open App → Sign In)
            ========================================================================= */}
        {stage === 'login' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-md mb-3">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Sign In to Start
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Enter your email address and password to start or continue your application.
              </p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2 animate-fadeIn">
                <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} noValidate className="flex flex-col gap-4">
              <Input
                label="Email Address"
                id="login-email"
                type="email"
                required
                placeholder="e.g. alex@example.com"
                value={formData.loginEmail}
                onChange={(e) => handleFieldChange('loginEmail', e.target.value)}
                error={errors.loginEmail}
                helperText="Enter a full email ending with a domain like @example.com or @school.edu"
                autoComplete="email"
              />

              <PasswordInput
                label="Password"
                id="login-pwd"
                required
                placeholder="Enter your password"
                value={formData.loginPassword}
                onChange={(e) => handleFieldChange('loginPassword', e.target.value)}
                error={errors.loginPassword}
                autoComplete="current-password"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-2 select-none">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.rememberDevice}
                    onChange={(e) => handleFieldChange('rememberDevice', e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                  />
                  <span>Remember this device</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset link has been sent to your email.')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline text-left sm:text-right"
                >
                  Forgot password?
                </button>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={!isLoginValid || loginLoading}
                  isLoading={loginLoading}
                  rightIcon={!loginLoading && <ArrowRight className="w-4 h-4" />}
                >
                  Sign in
                </Button>

                {!isLoginValid && (
                  <p className="text-center text-[11px] text-slate-400">
                    Please enter a valid email address (e.g. name@example.com) and password
                  </p>
                )}

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200" />
                  <span className="flex-shrink mx-3 text-xs text-slate-400 font-medium">or</span>
                  <div className="flex-grow border-t border-slate-200" />
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center border-slate-300 hover:bg-slate-50 text-slate-700 font-medium"
                  onClick={handleGoogleSignIn}
                  disabled={loginLoading}
                  leftIcon={
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  }
                >
                  Continue with Google
                </Button>

                <div className="text-center pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-1">
                    <span>Don't have an account yet?</span>
                    <button
                      type="button"
                      onClick={() => setStage('registration')}
                      className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 focus:outline-none"
                    >
                      <span>Create your account directly</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 2: REGISTRATION (Create Account)
            ========================================================================= */}
        {stage === 'registration' && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-1.5">
                <UserPlus className="w-3 h-3" />
                Step 2 of 5 • Account Setup
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Enter your details to create your application account.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              noValidate
              className="flex flex-col gap-4 text-left"
            >
              <Input
                label="Full Name"
                id="reg-fullname"
                required
                placeholder="e.g. Alex Morgan"
                value={formData.fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value)}
                error={errors.fullName}
                helperText="Your first and last name"
                autoComplete="name"
              />

              <Input
                label="Email Address"
                id="reg-email"
                type="email"
                required
                placeholder="e.g. alex@example.com"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                error={errors.email}
                helperText="Must be a full email like name@example.com (names like 'Richie' or numbers like '123' are not accepted)"
                autoComplete="email"
              />

              <PasswordInput
                label="Create Password"
                id="reg-password"
                required
                placeholder="At least 8 characters with a number"
                value={formData.password}
                onChange={(e) => handleFieldChange('password', e.target.value)}
                error={errors.password}
                helperText="Must be at least 8 characters and include at least one number"
                autoComplete="new-password"
              />

              <PasswordInput
                label="Confirm Password"
                id="reg-conf-password"
                required
                placeholder="Type your password again"
                value={formData.confirmPassword}
                onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />

              <Input
                label="Current School or Company"
                id="reg-school"
                required
                placeholder="e.g. Lincoln High School or Acme Corp"
                value={formData.currentSchoolOrWork}
                onChange={(e) => handleFieldChange('currentSchoolOrWork', e.target.value)}
                error={errors.currentSchoolOrWork}
                helperText="Where you currently study or work"
              />

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleBack}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Back to Sign In
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!isRegistrationValid}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Next: Personal Information
                </Button>
              </div>

              {!isRegistrationValid && (
                <p className="text-center text-[11px] text-slate-400 mt-1">
                  Please fill out all required fields with a valid email (e.g. alex@example.com) to continue
                </p>
              )}
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 3: PERSONAL INFORMATION
            ========================================================================= */}
        {stage === 'user_info' && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-1.5">
                <User className="w-3 h-3" />
                Step 3 of 5 • Personal Information
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Personal Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Tell us a bit about yourself and how we can contact you.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              noValidate
              className="flex flex-col gap-4 text-left"
            >
              <div className="text-left space-y-1.5">
                <label htmlFor="user-dob" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                  Date of Birth <span className="text-rose-500 font-semibold">*</span>
                </label>
                <input
                  id="user-dob"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                  className={`
                    block w-full min-w-0 rounded-lg text-base sm:text-sm min-h-[44px] sm:min-h-[40px] border shadow-sm px-3.5 py-2 transition-colors
                    ${
                      errors.dateOfBirth
                        ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                    }
                  `}
                />
                {errors.dateOfBirth ? (
                  <p className="text-xs text-rose-600 font-medium">{errors.dateOfBirth}</p>
                ) : (
                  <p className="text-xs text-slate-500">Needed for official school records</p>
                )}
              </div>

              <Input
                label="Phone Number"
                id="user-phone"
                type="tel"
                required
                placeholder="e.g. (555) 234-5678"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                error={errors.phone}
                leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                helperText="For important updates about your application"
              />

              <Input
                label="Home Address"
                id="user-address"
                required
                placeholder="e.g. 123 Main Street, Apt 4B, Springfield, OR"
                value={formData.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                error={errors.address}
                leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
                helperText="Your current mailing address"
              />

              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                  Emergency Contact
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label="Contact Person Name"
                    required
                    placeholder="e.g. Jane Doe"
                    value={formData.emergencyContactName}
                    onChange={(e) => handleFieldChange('emergencyContactName', e.target.value)}
                    error={errors.emergencyContactName}
                  />

                  <div className="text-left space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                      Relationship <span className="text-rose-500 font-semibold">*</span>
                    </label>
                    <select
                      value={formData.emergencyRelation}
                      onChange={(e) => handleFieldChange('emergencyRelation', e.target.value)}
                      className={`block w-full min-w-0 rounded-lg border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] shadow-sm focus:outline-none focus:ring-1 ${
                        errors.emergencyRelation
                          ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                          : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                      } ${!formData.emergencyRelation ? 'text-slate-400' : 'text-slate-900'}`}
                    >
                      <option value="">Select Relationship</option>
                      <option value="Parent">Parent</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Relative">Relative</option>
                      <option value="Friend">Friend</option>
                    </select>
                    {errors.emergencyRelation && (
                      <p className="text-xs text-rose-600 font-medium">{errors.emergencyRelation}</p>
                    )}
                  </div>

                  <Input
                    label="Contact Phone"
                    type="tel"
                    required
                    placeholder="e.g. (555) 987-6543"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleFieldChange('emergencyPhone', e.target.value)}
                    error={errors.emergencyPhone}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleBack}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Back to Account
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Next: Choose Program
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 4: PROGRAM SELECTION (What Do You Want to Study?)
            ========================================================================= */}
        {stage === 'request_info' && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-1.5">
                <FileText className="w-3 h-3" />
                Step 4 of 5 • Program Selection
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                What Would You Like to Study?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select your degree type, school, major, and when you want to begin classes.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}
              noValidate
              className="flex flex-col gap-4 text-left"
            >
              <div className="text-left space-y-1.5">
                <label htmlFor="req-degree" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                  Degree Type <span className="text-rose-500 font-semibold">*</span>
                </label>
                <select
                  id="req-degree"
                  value={formData.degreeType}
                  onChange={(e) => handleFieldChange('degreeType', e.target.value)}
                  className={`block w-full min-w-0 rounded-lg border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] shadow-sm focus:outline-none focus:ring-1 ${
                    errors.degreeType
                      ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                  } ${!formData.degreeType ? 'text-slate-400' : 'text-slate-900'}`}
                >
                  <option value="">Select Degree Type</option>
                  <option value="Bachelor's Degree (4-Year Undergraduate)">Bachelor's Degree (4-Year Undergraduate)</option>
                  <option value="Master's Degree (Graduate Program)">Master's Degree (Graduate Program)</option>
                  <option value="Doctorate (Ph.D. / Research)">Doctorate (Ph.D. / Research)</option>
                </select>
                {errors.degreeType && (
                  <p className="text-xs text-rose-600 font-medium">{errors.degreeType}</p>
                )}
              </div>

              <div className="text-left space-y-1.5">
                <label htmlFor="req-dept" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                  School / Department <span className="text-rose-500 font-semibold">*</span>
                </label>
                <select
                  id="req-dept"
                  value={formData.department}
                  onChange={(e) => handleFieldChange('department', e.target.value)}
                  className={`block w-full min-w-0 rounded-lg border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] shadow-sm focus:outline-none focus:ring-1 ${
                    errors.department
                      ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                  } ${!formData.department ? 'text-slate-400' : 'text-slate-900'}`}
                >
                  <option value="">Select School / Department</option>
                  <option value="School of Computer Science & Technology">School of Computer Science & Technology</option>
                  <option value="College of Engineering">College of Engineering</option>
                  <option value="School of Business">School of Business</option>
                  <option value="School of Health & Medicine">School of Health & Medicine</option>
                </select>
                {errors.department && (
                  <p className="text-xs text-rose-600 font-medium">{errors.department}</p>
                )}
              </div>

              <div className="text-left space-y-1.5">
                <label htmlFor="req-major" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                  Choose Your Major <span className="text-rose-500 font-semibold">*</span>
                </label>
                <select
                  id="req-major"
                  value={formData.major}
                  onChange={(e) => handleFieldChange('major', e.target.value)}
                  className={`block w-full min-w-0 rounded-lg border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] shadow-sm focus:outline-none focus:ring-1 ${
                    errors.major
                      ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                      : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                  } ${!formData.major ? 'text-slate-400' : 'text-slate-900'}`}
                >
                  <option value="">Select Your Major</option>
                  <option value="Computer Science & Software">Computer Science & Software</option>
                  <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                  <option value="Cybersecurity & Defense">Cybersecurity & Defense</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
                {errors.major && (
                  <p className="text-xs text-rose-600 font-medium">{errors.major}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="text-left space-y-1.5">
                  <label htmlFor="req-term" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    When would you like to start? <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <select
                    id="req-term"
                    value={formData.startTerm}
                    onChange={(e) => handleFieldChange('startTerm', e.target.value)}
                    className={`block w-full min-w-0 rounded-lg border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] shadow-sm focus:outline-none focus:ring-1 ${
                      errors.startTerm
                        ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                    } ${!formData.startTerm ? 'text-slate-400' : 'text-slate-900'}`}
                  >
                    <option value="">Select Starting Term</option>
                    <option value="Fall 2026 (Starts September)">Fall 2026 (Starts September)</option>
                    <option value="Spring 2027 (Starts January)">Spring 2027 (Starts January)</option>
                    <option value="Summer 2027 (Starts June)">Summer 2027 (Starts June)</option>
                  </select>
                  {errors.startTerm && (
                    <p className="text-xs text-rose-600 font-medium">{errors.startTerm}</p>
                  )}
                </div>

                <div className="text-left space-y-1.5">
                  <label htmlFor="req-format" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    How will you attend classes? <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <select
                    id="req-format"
                    value={formData.classFormat}
                    onChange={(e) => handleFieldChange('classFormat', e.target.value)}
                    className={`block w-full min-w-0 rounded-lg border px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] shadow-sm focus:outline-none focus:ring-1 ${
                      errors.classFormat
                        ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                    } ${!formData.classFormat ? 'text-slate-400' : 'text-slate-900'}`}
                  >
                    <option value="">Select Class Format</option>
                    <option value="On Campus (In Person)">On Campus (In Person)</option>
                    <option value="Online (From Home)">Online (From Home)</option>
                    <option value="Hybrid (Both On Campus & Online)">Hybrid (Both On Campus & Online)</option>
                  </select>
                  {errors.classFormat && (
                    <p className="text-xs text-rose-600 font-medium">{errors.classFormat}</p>
                  )}
                </div>
              </div>

              <Input
                label="Any questions or special requests? (Optional)"
                id="req-notes"
                placeholder="e.g. Questions about transfer credits or campus housing"
                value={formData.notes}
                onChange={(e) => handleFieldChange('notes', e.target.value)}
                helperText="Our admissions team will read this along with your application"
              />

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handleBack}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Back to Personal Info
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Next: Review & Submit
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* =========================================================================
            STEP 5: REVIEW & CONFIRM
            ========================================================================= */}
        {stage === 'review' && (
          <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-semibold mb-1.5">
                <Layers className="w-3 h-3" />
                Step 5 of 5 • Review & Submit
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Review Your Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Please check all your details before sending your application.
              </p>
            </div>

            {/* Section 1: Account Details */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-left">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <UserPlus className="w-3.5 h-3.5 text-indigo-600" />
                  1. Account Details
                </span>
                <button
                  type="button"
                  onClick={() => setStage('registration')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block">Full Name:</span>
                  <strong className="text-slate-800">{formData.fullName || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Email Address:</span>
                  <strong className="text-slate-800 break-all">{formData.email || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Current School / Work:</span>
                  <strong className="text-slate-800">{formData.currentSchoolOrWork || '—'}</strong>
                </div>
              </div>
            </div>

            {/* Section 2: Personal Info */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-left">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  2. Personal Information
                </span>
                <button
                  type="button"
                  onClick={() => setStage('user_info')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block">Date of Birth:</span>
                  <strong className="text-slate-800">{formData.dateOfBirth || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number:</span>
                  <strong className="text-slate-800">{formData.phone || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Home Address:</span>
                  <strong className="text-slate-800">{formData.address || '—'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Emergency Contact:</span>
                  <strong className="text-slate-800">
                    {formData.emergencyContactName} ({formData.emergencyRelation}) • {formData.emergencyPhone}
                  </strong>
                </div>
              </div>
            </div>

            {/* Section 3: Program Selection */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2 text-left">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  3. Program Selection
                </span>
                <button
                  type="button"
                  onClick={() => setStage('request_info')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                >
                  Edit
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                <div>
                  <span className="text-slate-400 block">Degree Type:</span>
                  <strong className="text-slate-800">{formData.degreeType}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">School / Department:</span>
                  <strong className="text-slate-800">{formData.department}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Major:</span>
                  <strong className="text-slate-800">{formData.major}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Starting Term:</span>
                  <strong className="text-slate-800">{formData.startTerm}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Class Format:</span>
                  <strong className="text-slate-800">{formData.classFormat}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Special Notes:</span>
                  <strong className="text-slate-800">{formData.notes || 'None'}</strong>
                </div>
              </div>
            </div>

            {/* Simple Confirmation Checkbox */}
            <div className="text-left pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={formData.confirmAccuracy}
                  onChange={(e) => handleFieldChange('confirmAccuracy', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                />
                <span className="text-xs text-slate-700 leading-relaxed">
                  I confirm that all the information I provided is correct and complete.
                </span>
              </label>
              {errors.confirmAccuracy && (
                <p className="text-xs text-rose-600 font-medium mt-1">
                  {errors.confirmAccuracy}
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={handleBack}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Back to Program
              </Button>

              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => {
                  if (validateStage('review')) {
                    setIsConfirmModalOpen(true);
                  }
                }}
                disabled={!formData.confirmAccuracy}
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Submit Application
              </Button>
            </div>
          </div>
        )}

        {/* =========================================================================
            CONFIRMATION RECEIPT SCREEN
            ========================================================================= */}
        {stage === 'confirmation' && (
          <div className="text-center py-4 sm:py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Application Submitted Successfully
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                We Received Your Application!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Thank you, {formData.fullName}. Your application has been sent to our admissions team.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-left max-w-md mx-auto shadow-xs space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 pb-2.5 gap-1">
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-semibold tracking-wider">
                  Application Reference Number
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 inline-block w-fit">
                  {formData.generatedId}
                </span>
              </div>

              <div className="text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Applicant:</span>
                  <span className="font-semibold text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-medium text-slate-800 break-all">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Program / Major:</span>
                  <span className="font-semibold text-slate-900">{formData.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Starting Term:</span>
                  <span className="font-medium text-slate-800">{formData.startTerm}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/60 pt-2 text-[11px]">
                  <span className="text-slate-400">Date Submitted:</span>
                  <span className="text-slate-700 font-medium">{formData.submissionTimestamp}</span>
                </div>
              </div>
            </div>

            {/* Simple Next Steps */}
            <div className="p-3.5 sm:p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg text-left max-w-md mx-auto text-xs text-slate-700 space-y-1.5">
              <span className="font-bold text-indigo-900 block flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                What Happens Next?
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600 leading-relaxed">
                <li>A confirmation email has been sent to <strong>{formData.email}</strong>.</li>
                <li>Our team will review your application within 3 to 5 business days.</li>
                <li>You will receive an email update as soon as a decision is ready.</li>
              </ul>
            </div>

            {/* Simple Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 pt-2">
              <Button
                variant="primary"
                onClick={handleResetFlow}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Submit Another Application
              </Button>
              <Button
                variant="secondary"
                onClick={handleResetFlow}
                leftIcon={<LogOut className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* =========================================================================
          ACTION CONFIRMATION DIALOG (Prompt Standard 3: Explicit Action Buttons)
          ========================================================================= */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => !isSubmitting && setIsConfirmModalOpen(false)}
        title={`Submit Application for ${formData.fullName}?`}
        maxWidth="md"
        footer={
          <>
            <Button
              variant="secondary"
              disabled={isSubmitting}
              onClick={() => setIsConfirmModalOpen(false)}
            >
              Go Back & Check
            </Button>
            <Button
              variant="primary"
              isLoading={isSubmitting}
              onClick={handleConfirmedSubmit}
              leftIcon={!isSubmitting && <Send className="w-4 h-4" />}
            >
              Yes, Submit Application
            </Button>
          </>
        }
      >
        <div className="space-y-3.5 text-xs sm:text-sm text-left">
          <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-950 space-y-1">
            <span className="text-[10px] text-indigo-600 uppercase font-bold tracking-wider block">
              Application Summary
            </span>
            <div className="font-semibold text-sm text-indigo-950">
              {formData.fullName} • {formData.major}
            </div>
            <p className="text-xs text-indigo-800/80">
              {formData.department} • {formData.startTerm} ({formData.classFormat})
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              Once you submit, your application will be sent directly to the admissions office for review.
              You will get an application reference number on the next screen.
            </p>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Please make sure all your information is correct before submitting.
          </p>
        </div>
      </Modal>
    </div>
  );
};
