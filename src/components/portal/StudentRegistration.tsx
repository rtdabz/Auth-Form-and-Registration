import React, { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  User,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  LogIn,
  FileCheck,
  Phone,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface RegistrationData {
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  degreeLevel: string;
  faculty: string;
  major: string;
  enrollmentTerm: string;
  password: string;
  confirmPassword: string;
  emergencyContact: string;
  emergencyPhone: string;
  acceptHonorCode: boolean;
}

interface StudentRegistrationProps {
  onSwitchToLogin?: () => void;
}

export const StudentRegistration: React.FC<StudentRegistrationProps> = ({ onSwitchToLogin }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    degreeLevel: "Undergraduate (Bachelor's)",
    faculty: 'School of Computing & Data Sciences',
    major: 'Computer Science & Software Engineering',
    enrollmentTerm: 'Fall Semester 2026',
    password: '',
    confirmPassword: '',
    emergencyContact: '',
    emergencyPhone: '',
    acceptHonorCode: false,
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [generatedStudentId, setGeneratedStudentId] = useState('');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleInputChange = (field: keyof RegistrationData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepErrors[field]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        errors.fullName = 'Full legal name is required.';
      }
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required for enrollment verification.';
      }
      if (!formData.email.trim() || !isValidEmail(formData.email)) {
        errors.email = 'Please provide a valid personal or preparatory email.';
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 7) {
        errors.phone = 'Valid primary contact phone number is required.';
      }
    } else if (step === 2) {
      if (!formData.degreeLevel) errors.degreeLevel = 'Please choose a degree level.';
      if (!formData.faculty) errors.faculty = 'Please select a school or faculty.';
      if (!formData.major) errors.major = 'Please choose your intended academic major.';
      if (!formData.enrollmentTerm) errors.enrollmentTerm = 'Please select your entry semester.';
    } else if (step === 3) {
      if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters long.';
      } else if (!/\d/.test(formData.password)) {
        errors.password = 'Password must include at least one number.';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match.';
      }
      if (!formData.emergencyContact.trim()) {
        errors.emergencyContact = 'Emergency contact person is required.';
      }
      if (!formData.emergencyPhone.trim()) {
        errors.emergencyPhone = 'Emergency contact phone is required.';
      }
      if (!formData.acceptHonorCode) {
        errors.acceptHonorCode = 'You must accept the University Honor Code & Enrollment Agreement.';
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as 2 | 3);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomId = `AEG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedStudentId(randomId);
      setIsEnrolled(true);
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      degreeLevel: "Undergraduate (Bachelor's)",
      faculty: 'School of Computing & Data Sciences',
      major: 'Computer Science & Software Engineering',
      enrollmentTerm: 'Fall Semester 2026',
      password: '',
      confirmPassword: '',
      emergencyContact: '',
      emergencyPhone: '',
      acceptHonorCode: false,
    });
    setStepErrors({});
    setCurrentStep(1);
    setIsEnrolled(false);
  };

  const stepsConfig = [
    { number: 1, title: 'Identity', subtitle: 'Legal & contact', icon: User },
    { number: 2, title: 'Academics', subtitle: 'Degree & major', icon: GraduationCap },
    { number: 3, title: 'Review', subtitle: 'Security & consent', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto text-left px-1 sm:px-0">
      <Card className="p-4 sm:p-8 shadow-sm">
        {/* Header Branding */}
        <div className="border-b border-slate-100 pb-4 sm:pb-5 mb-5 sm:mb-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 truncate">
                  New Student Registration
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                  Aegis University • Official Academic Admission & Onboarding
                </p>
              </div>
            </div>

            {onSwitchToLogin && !isEnrolled && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwitchToLogin}
                className="hidden sm:inline-flex text-indigo-600 text-xs shrink-0"
                rightIcon={<LogIn className="w-3.5 h-3.5" />}
              >
                Sign in
              </Button>
            )}
          </div>
        </div>

        {/* 3-Step Stepper Progress Bar */}
        {!isEnrolled && (
          <div className="mb-6 sm:mb-8" aria-label="Registration Progress">
            <div className="flex items-center justify-between relative">
              {/* Background Connecting Bar */}
              <div className="absolute left-6 right-6 sm:left-8 sm:right-8 top-4 sm:top-5 h-0.5 bg-slate-200 -z-0" />
              {/* Active Colored Progress */}
              <div
                className="absolute left-6 top-4 sm:top-5 h-0.5 bg-indigo-600 transition-all duration-300 -z-0"
                style={{
                  width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
                }}
              />

              {stepsConfig.map((step) => {
                const isDone = currentStep > step.number;
                const isCurrent = currentStep === step.number;
                const isRemaining = currentStep < step.number;

                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center relative z-10 select-none cursor-pointer"
                    onClick={() => {
                      if (step.number < currentStep) {
                        setCurrentStep(step.number as 1 | 2);
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
                      {isDone ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : <span>{step.number}</span>}
                    </div>

                    <div className="mt-1.5 sm:mt-2 text-center max-w-[75px] sm:max-w-none">
                      <span
                        className={`text-[11px] sm:text-xs font-semibold block leading-tight truncate sm:overflow-visible ${
                          isCurrent ? 'text-indigo-600' : isDone ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {step.title}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block mt-0.5">
                        {isDone ? 'Completed' : isCurrent ? 'Active' : isRemaining ? 'Upcoming' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stepper Content */}
        {isEnrolled ? (
          /* Enrollment Confirmation State */
          <div className="text-center py-4 sm:py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Enrollment Application Submitted
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Welcome to Aegis University!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Your student profile has been provisioned. Please save your assigned Student ID
                for logging in to the portal and accessing university services.
              </p>
            </div>

            {/* Official Student Credentials Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-left max-w-md mx-auto shadow-xs space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 pb-2.5 gap-1">
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-semibold tracking-wider">
                  Assigned Student ID
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 inline-block w-fit">
                  {generatedStudentId}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <span className="font-medium text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Program / Major:</span>
                  <span className="font-medium text-slate-900">{formData.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Term:</span>
                  <span className="font-medium text-slate-900">{formData.enrollmentTerm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Faculty:</span>
                  <span className="font-medium text-slate-900">{formData.faculty}</span>
                </div>
              </div>
            </div>

            {/* Onboarding Checklist */}
            <div className="p-3.5 sm:p-4 bg-indigo-50/50 border border-indigo-100 rounded-lg text-left max-w-md mx-auto text-xs text-slate-700 space-y-1.5">
              <span className="font-bold text-indigo-900 block flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                Next Onboarding Steps
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Check your personal email ({formData.email}) for activation link.</li>
                <li>Log in to the Student Portal to review your term schedule.</li>
                <li>Submit your campus identity card photo prior to orientation week.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 pt-2">
              {onSwitchToLogin && (
                <Button
                  variant="primary"
                  onClick={onSwitchToLogin}
                  leftIcon={<LogIn className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Proceed to Student Login
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={handleReset}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Register Another Student
              </Button>
            </div>
          </div>
        ) : (
          /* Step Forms */
          <form onSubmit={handleSubmit} noValidate>
            {/* STEP 1: Personal & Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span>Step 1: Student Identity & Contact</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please provide your legal name and direct contact coordinates for university records.
                  </p>
                </div>

                <Input
                  label="Legal Full Name"
                  id="reg-fullname"
                  required
                  placeholder="e.g. Maya Elizabeth Lin"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  error={stepErrors.fullName}
                  helperText="As it appears on your passport or official government ID"
                />

                <div className="text-left space-y-1.5">
                  <label htmlFor="reg-dob" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Date of Birth <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-dob"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className={`
                        block w-full min-w-0 rounded-lg text-base sm:text-sm min-h-[44px] sm:min-h-[40px] border shadow-sm px-3.5 py-2 transition-colors
                        ${
                          stepErrors.dateOfBirth
                            ? 'border-rose-300 bg-rose-50/20 text-rose-900 focus:border-rose-500 focus:ring-rose-500'
                            : 'border-slate-300 bg-white text-slate-900 focus:border-indigo-600 focus:ring-indigo-600'
                        }
                      `}
                    />
                  </div>
                  {stepErrors.dateOfBirth ? (
                    <p className="text-xs text-rose-600 font-medium mt-0.5">{stepErrors.dateOfBirth}</p>
                  ) : (
                    <p className="text-xs text-slate-500 mt-0.5">Required for institutional identity verification</p>
                  )}
                </div>

                <Input
                  label="Primary Email Address"
                  id="reg-email"
                  type="email"
                  required
                  placeholder="e.g. maya.lin@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={stepErrors.email}
                  helperText="Your official admission decision and activation link will be sent here"
                />

                <Input
                  label="Mobile Phone Number"
                  id="reg-phone"
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={stepErrors.phone}
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                  helperText="Used for two-factor authentication alerts and campus notices"
                />
              </div>
            )}

            {/* STEP 2: Academic Program & Term */}
            {currentStep === 2 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span>Step 2: Academic Program & Entry Term</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your degree track, department, and intended field of study.
                  </p>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Academic Degree Level <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <select
                    value={formData.degreeLevel}
                    onChange={(e) => handleInputChange('degreeLevel', e.target.value)}
                    className="block w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Undergraduate (Bachelor's)">Undergraduate (Bachelor of Science / Arts)</option>
                    <option value="Graduate (Master's)">Graduate (Master of Science / Professional Masters)</option>
                    <option value="Doctoral (Ph.D.)">Doctoral (Ph.D. / Research Doctorate)</option>
                  </select>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Faculty / Academic School <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <select
                    value={formData.faculty}
                    onChange={(e) => handleInputChange('faculty', e.target.value)}
                    className="block w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="School of Computing & Data Sciences">School of Computing & Data Sciences</option>
                    <option value="College of Engineering">College of Engineering</option>
                    <option value="School of Business & Economics">School of Business & Economics</option>
                    <option value="Faculty of Health & Life Sciences">Faculty of Health & Life Sciences</option>
                  </select>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Intended Major / Curriculum <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <select
                    value={formData.major}
                    onChange={(e) => handleInputChange('major', e.target.value)}
                    className="block w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Computer Science & Software Engineering">Computer Science & Software Engineering</option>
                    <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                    <option value="Cybersecurity & Information Assurance">Cybersecurity & Information Assurance</option>
                    <option value="Data Science & Quantitative Systems">Data Science & Quantitative Systems</option>
                    <option value="Electrical & Robotics Engineering">Electrical & Robotics Engineering</option>
                  </select>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Enrollment Entry Term <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <select
                    value={formData.enrollmentTerm}
                    onChange={(e) => handleInputChange('enrollmentTerm', e.target.value)}
                    className="block w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Fall Semester 2026">Fall Semester 2026 (Begins September 1)</option>
                    <option value="Spring Semester 2027">Spring Semester 2027 (Begins January 15)</option>
                    <option value="Summer Term 2027">Summer Term 2027 (Accelerated Session)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 3: Security, Declaration & Review */}
            {currentStep === 3 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span>Step 3: Portal Security & Application Review</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Set up your secure access credentials and review all enrollment details before submitting.
                  </p>
                </div>

                {/* Password Fields */}
                <div className="space-y-3">
                  <PasswordInput
                    label="Create Portal Password"
                    id="reg-password"
                    required
                    placeholder="At least 8 characters with a number"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={stepErrors.password}
                    helperText="Minimum 8 characters, including at least one number"
                  />

                  <PasswordInput
                    label="Confirm Portal Password"
                    id="reg-confirm-password"
                    required
                    placeholder="Re-enter your portal password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={stepErrors.confirmPassword}
                  />
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <Input
                    label="Emergency Contact Name"
                    required
                    placeholder="e.g. Robert Lin (Parent)"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    error={stepErrors.emergencyContact}
                  />
                  <Input
                    label="Emergency Phone"
                    type="tel"
                    required
                    placeholder="e.g. +1 (555) 987-6543"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    error={stepErrors.emergencyPhone}
                  />
                </div>

                {/* Summary Card: Review Previous Steps */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 text-left space-y-2 text-xs mt-2">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="font-semibold text-slate-900 uppercase tracking-wider text-[10px] sm:text-[11px]">
                      Enrollment Summary Review
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                    >
                      Edit details
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                    <div>
                      <span className="text-slate-400 block">Student Name:</span>
                      <strong className="text-slate-800">{formData.fullName || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Date of Birth:</span>
                      <strong className="text-slate-800">{formData.dateOfBirth || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Email Address:</span>
                      <strong className="text-slate-800 break-all">{formData.email || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Primary Major:</span>
                      <strong className="text-slate-800">{formData.major}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Academic Term:</span>
                      <strong className="text-slate-800">{formData.enrollmentTerm}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Degree Level:</span>
                      <strong className="text-slate-800">{formData.degreeLevel}</strong>
                    </div>
                  </div>
                </div>

                {/* Honor Code Declaration */}
                <div className="text-left pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.acceptHonorCode}
                      onChange={(e) => handleInputChange('acceptHonorCode', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I certify that all statements submitted in this application are accurate and complete.
                      I agree to abide by Aegis University's Academic Honor Code, Student Code of Conduct,
                      and Privacy Policy.
                    </span>
                  </label>
                  {stepErrors.acceptHonorCode && (
                    <p className="text-xs text-rose-600 font-medium mt-1">
                      {stepErrors.acceptHonorCode}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Stepper Navigation */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                {currentStep > 1 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleBack}
                    leftIcon={<ChevronLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}
              </div>

              <div>
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handleNext}
                    rightIcon={<ChevronRight className="w-4 h-4" />}
                  >
                    <span className="hidden sm:inline">
                      Next: {currentStep === 1 ? 'Academic Program' : 'Security & Review'}
                    </span>
                    <span className="sm:hidden">Next</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting && <Send className="w-4 h-4" />}
                  >
                    Submit Enrollment
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
