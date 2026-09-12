import React, { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  User,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  LogIn,
  Save,
  Building,
  Phone,
  Mail,
  MapPin,
  IdCard,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export interface StudentRecordData {
  // Step 1: Personal & Contact Details
  fullName: string;
  studentId: string;
  dateOfBirth: string;
  institutionalEmail: string;
  personalEmail: string;
  phone: string;
  campusAddress: string;

  // Step 2: Academic Information
  degreeLevel: string;
  faculty: string;
  major: string;
  academicStanding: string;
  currentTerm: string;
  academicAdvisor: string;

  // Step 3: Emergency & Verification
  emergencyContact: string;
  emergencyRelation: string;
  emergencyPhone: string;
  accommodationNotes: string;
  certifyInformation: boolean;
}

interface StudentInformationProps {
  onSwitchToLogin?: () => void;
}

export const StudentInformation: React.FC<StudentInformationProps> = ({ onSwitchToLogin }) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Preloaded with official student record data
  const [formData, setFormData] = useState<StudentRecordData>({
    fullName: 'Maya Elizabeth Lin',
    studentId: 'AEG-2026-89421',
    dateOfBirth: '2004-05-18',
    institutionalEmail: 'm.lin@aegis.edu',
    personalEmail: 'maya.lin.personal@example.com',
    phone: '+1 (555) 234-5678',
    campusAddress: 'Oak Hall Dormitory, Suite 412, Campus North',
    degreeLevel: "Undergraduate (Bachelor's)",
    faculty: 'School of Computing & Data Sciences',
    major: 'Computer Science & Software Engineering',
    academicStanding: 'Active - Dean’s Honors List',
    currentTerm: 'Fall Semester 2026',
    academicAdvisor: 'Dr. Eleanor Vance (Department of CS)',
    emergencyContact: 'Robert Lin',
    emergencyRelation: 'Parent / Legal Guardian',
    emergencyPhone: '+1 (555) 987-6543',
    accommodationNotes: 'None requested for current term',
    certifyInformation: true,
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('September 12, 2026 at 3:20 PM');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleInputChange = (field: keyof StudentRecordData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepErrors[field]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step Validation
  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        errors.fullName = 'Full legal name is required.';
      }
      if (!formData.studentId.trim()) {
        errors.studentId = 'Official Student ID number is required.';
      }
      if (!formData.dateOfBirth) {
        errors.dateOfBirth = 'Date of birth is required for institutional records.';
      }
      if (!formData.institutionalEmail.trim() || !isValidEmail(formData.institutionalEmail)) {
        errors.institutionalEmail = 'Valid institutional student email is required.';
      }
      if (!formData.personalEmail.trim() || !isValidEmail(formData.personalEmail)) {
        errors.personalEmail = 'Valid backup contact email is required.';
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 7) {
        errors.phone = 'Valid primary contact phone number is required.';
      }
    } else if (step === 2) {
      if (!formData.faculty) errors.faculty = 'Faculty / School is required.';
      if (!formData.major) errors.major = 'Enrolled Major is required.';
      if (!formData.currentTerm) errors.currentTerm = 'Current academic term is required.';
    } else if (step === 3) {
      if (!formData.emergencyContact.trim()) {
        errors.emergencyContact = 'Emergency contact person is required.';
      }
      if (!formData.emergencyPhone.trim()) {
        errors.emergencyPhone = 'Emergency contact phone number is required.';
      }
      if (!formData.certifyInformation) {
        errors.certifyInformation = 'You must certify that the student record information is accurate.';
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
      const now = new Date();
      setLastUpdated(now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      }));
      setIsSaved(true);
    }, 750);
  };

  const stepsConfig = [
    { number: 1, title: 'Personal', subtitle: 'Identity & Contact', icon: User },
    { number: 2, title: 'Academics', subtitle: 'Major & Status', icon: GraduationCap },
    { number: 3, title: 'Emergency', subtitle: 'Contacts & Consent', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto text-left px-1 sm:px-0">
      <Card className="p-4 sm:p-8 shadow-sm">
        {/* Header Branding */}
        <div className="border-b border-slate-100 pb-4 sm:pb-5 mb-5 sm:mb-6">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                <IdCard className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 truncate">
                  Official Student Information Record
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                  Aegis University • Office of the Registrar & Student Academic Records
                </p>
              </div>
            </div>

            {onSwitchToLogin && !isSaved && (
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
        {!isSaved && (
          <div className="mb-6 sm:mb-8" aria-label="Student Record Progress">
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
                        {isDone ? 'Verified' : isCurrent ? 'Active' : isRemaining ? 'Upcoming' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Stepper Content */}
        {isSaved ? (
          /* Information Saved Confirmation State */
          <div className="text-center py-4 sm:py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200/60 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Student Record Verified & Updated
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Official Student Information Updated
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                All personal, academic, and emergency details have been updated in the Aegis Registrar Database.
              </p>
            </div>

            {/* Official Student Credentials Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 text-left max-w-md mx-auto shadow-xs space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-200 pb-2.5 gap-1">
                <span className="text-[10px] sm:text-xs text-slate-500 uppercase font-semibold tracking-wider">
                  Official Student ID
                </span>
                <span className="font-mono text-sm sm:text-base font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded border border-indigo-100 inline-block w-fit">
                  {formData.studentId}
                </span>
              </div>

              <div className="text-xs space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Legal Name:</span>
                  <span className="font-medium text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Enrolled Program:</span>
                  <span className="font-medium text-slate-900">{formData.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Standing:</span>
                  <span className="font-medium text-emerald-700 font-semibold">{formData.academicStanding}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Term:</span>
                  <span className="font-medium text-slate-900">{formData.currentTerm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Faculty Advisor:</span>
                  <span className="font-medium text-slate-900">{formData.academicAdvisor}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200/60 pt-2 text-[11px] text-slate-400">
                  <span>Last Verified:</span>
                  <span>{lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-2.5 sm:gap-3 pt-2">
              <Button
                variant="secondary"
                onClick={() => setIsSaved(false)}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="w-full sm:w-auto justify-center"
              >
                Edit Student Information
              </Button>
              {onSwitchToLogin && (
                <Button
                  variant="primary"
                  onClick={onSwitchToLogin}
                  leftIcon={<LogIn className="w-4 h-4" />}
                  className="w-full sm:w-auto justify-center"
                >
                  Return to Portal Login
                </Button>
              )}
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
                    <span>Step 1: Student Identity & Contact Information</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official personal identity, legal coordinates, and campus communication channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    label="Legal Full Name"
                    id="info-fullname"
                    required
                    placeholder="e.g. Maya Elizabeth Lin"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    error={stepErrors.fullName}
                    helperText="Official university registrar records"
                  />

                  <Input
                    label="Student ID Number"
                    id="info-studentid"
                    required
                    placeholder="e.g. AEG-2026-89421"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    error={stepErrors.studentId}
                    helperText="Issued upon admission"
                  />
                </div>

                <div className="text-left space-y-1.5">
                  <label htmlFor="info-dob" className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Date of Birth <span className="text-rose-500 font-semibold">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="info-dob"
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
                    <p className="text-xs text-slate-500 mt-0.5">Recorded for institutional identity verification</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    label="Institutional Student Email"
                    id="info-inst-email"
                    type="email"
                    required
                    placeholder="e.g. m.lin@aegis.edu"
                    value={formData.institutionalEmail}
                    onChange={(e) => handleInputChange('institutionalEmail', e.target.value)}
                    error={stepErrors.institutionalEmail}
                    leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                    helperText="Primary academic correspondence"
                  />

                  <Input
                    label="Personal Backup Email"
                    id="info-pers-email"
                    type="email"
                    required
                    placeholder="e.g. maya.lin@example.com"
                    value={formData.personalEmail}
                    onChange={(e) => handleInputChange('personalEmail', e.target.value)}
                    error={stepErrors.personalEmail}
                    helperText="Used for account recovery"
                  />
                </div>

                <Input
                  label="Primary Contact Phone"
                  id="info-phone"
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 234-5678"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={stepErrors.phone}
                  leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
                  helperText="Emergency campus notification alerts"
                />

                <Input
                  label="Campus / Local Residence Address"
                  id="info-address"
                  placeholder="e.g. Oak Hall Dormitory, Suite 412, Campus North"
                  value={formData.campusAddress}
                  onChange={(e) => handleInputChange('campusAddress', e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
                  helperText="Current residential address while enrolled"
                />
              </div>
            )}

            {/* STEP 2: Academic Program & Curriculum */}
            {currentStep === 2 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span>Step 2: Academic Program & Curriculum Details</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official curriculum, faculty department, academic standing, and assigned faculty advisor.
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
                    Enrolled Major / Discipline <span className="text-rose-500 font-semibold">*</span>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Input
                    label="Academic Standing"
                    value={formData.academicStanding}
                    onChange={(e) => handleInputChange('academicStanding', e.target.value)}
                    helperText="Official university evaluation status"
                  />

                  <Input
                    label="Current Academic Term"
                    value={formData.currentTerm}
                    onChange={(e) => handleInputChange('currentTerm', e.target.value)}
                    helperText="Active semester of study"
                  />
                </div>

                <Input
                  label="Assigned Faculty Advisor"
                  value={formData.academicAdvisor}
                  onChange={(e) => handleInputChange('academicAdvisor', e.target.value)}
                  leftIcon={<Building className="w-4 h-4 text-slate-400" />}
                  helperText="Primary point of contact for degree plan audits"
                />
              </div>
            )}

            {/* STEP 3: Emergency Contacts, Records & Verification */}
            {currentStep === 3 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                    <span>Step 3: Emergency Contacts & Record Verification</span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Review official student data, designate emergency contacts, and confirm record accuracy.
                  </p>
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Input
                    label="Emergency Contact Name"
                    required
                    placeholder="e.g. Robert Lin"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    error={stepErrors.emergencyContact}
                  />

                  <div className="text-left space-y-1.5">
                    <label className="text-xs sm:text-sm font-medium text-slate-800">
                      Relationship
                    </label>
                    <select
                      value={formData.emergencyRelation}
                      onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                      className="block w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                    >
                      <option value="Parent / Legal Guardian">Parent / Legal Guardian</option>
                      <option value="Spouse / Partner">Spouse / Partner</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other Relative / Friend">Other Relative / Friend</option>
                    </select>
                  </div>

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

                {/* Special Accommodations / Medical notes */}
                <Input
                  label="Health or Academic Accommodation Notes (Optional)"
                  placeholder="e.g. Campus mobility access or dietary considerations"
                  value={formData.accommodationNotes}
                  onChange={(e) => handleInputChange('accommodationNotes', e.target.value)}
                  helperText="Forwarded to the Dean of Students and Disability Services"
                />

                {/* Summary Card: Review Previous Steps */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 sm:p-4 text-left space-y-2 text-xs mt-2">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                    <span className="font-semibold text-slate-900 uppercase tracking-wider text-[10px] sm:text-[11px]">
                      Student Profile Summary Review
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
                      <span className="text-slate-400 block">Student ID:</span>
                      <strong className="text-slate-800 font-mono">{formData.studentId || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Institutional Email:</span>
                      <strong className="text-slate-800 break-all">{formData.institutionalEmail || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Enrolled Major:</span>
                      <strong className="text-slate-800">{formData.major}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Current Academic Term:</span>
                      <strong className="text-slate-800">{formData.currentTerm}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Academic Standing:</span>
                      <strong className="text-slate-800">{formData.academicStanding}</strong>
                    </div>
                  </div>
                </div>

                {/* Certification Checkbox */}
                <div className="text-left pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.certifyInformation}
                      onChange={(e) => handleInputChange('certifyInformation', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I certify that all official student information provided above is correct and up to date.
                      I understand that submitting false academic records is subject to disciplinary action under the
                      Aegis University Student Code of Conduct.
                    </span>
                  </label>
                  {stepErrors.certifyInformation && (
                    <p className="text-xs text-rose-600 font-medium mt-1">
                      {stepErrors.certifyInformation}
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
                      Next: {currentStep === 1 ? 'Academics' : 'Emergency & Verification'}
                    </span>
                    <span className="sm:hidden">Next</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting && <Save className="w-4 h-4" />}
                  >
                    Save Student Information
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

