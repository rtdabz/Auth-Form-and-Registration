import React, { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Send,
  Building,
  User,
  ShieldCheck,
  CheckCircle2,
  RotateCcw,
  Layers,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface MultiStepData {
  fullName: string;
  workEmail: string;
  jobRole: string;
  projectName: string;
  teamSize: string;
  environment: string;
  notificationDigest: string;
  agreeToTerms: boolean;
}

export const MultiStepStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<MultiStepData>({
    fullName: '',
    workEmail: '',
    jobRole: '',
    projectName: '',
    teamSize: '5-20 members',
    environment: 'Production',
    notificationDigest: 'Daily digest',
    agreeToTerms: false,
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleInputChange = (field: keyof MultiStepData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (stepErrors[field]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateCurrentStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
      if (!formData.workEmail.trim()) {
        errors.workEmail = 'Work Email is required.';
      } else if (!isValidEmail(formData.workEmail)) {
        errors.workEmail = 'Please enter a valid work email address.';
      }
      if (!formData.jobRole.trim()) errors.jobRole = 'Job Title / Role is required.';
    } else if (step === 2) {
      if (!formData.projectName.trim()) errors.projectName = 'Project / Workspace Name is required.';
      if (!formData.teamSize) errors.teamSize = 'Please select your team size.';
      if (!formData.environment) errors.environment = 'Please select your environment.';
    } else if (step === 3) {
      if (!formData.agreeToTerms) {
        errors.agreeToTerms = 'You must accept the terms and privacy guidelines.';
      }
    }

    setStepErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep(currentStep)) {
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
    if (!validateCurrentStep(3)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCompleted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      workEmail: '',
      jobRole: '',
      projectName: '',
      teamSize: '5-20 members',
      environment: 'Production',
      notificationDigest: 'Daily digest',
      agreeToTerms: false,
    });
    setStepErrors({});
    setCurrentStep(1);
    setIsCompleted(false);
  };

  const stepsConfig = [
    { number: 1, title: 'Identity', description: 'Personal info', icon: User },
    { number: 2, title: 'Workspace', description: 'Project details', icon: Building },
    { number: 3, title: 'Review', description: 'Confirm & submit', icon: ShieldCheck },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-0 text-left">
      <Card className="p-4 sm:p-8 shadow-sm">
        {/* Stepper Header: Responsive progress and indicator */}
        <div className="mb-6 sm:mb-8" aria-label="Step Progress">
          <div className="flex items-center justify-between relative">
            {/* Background connecting bar */}
            <div className="absolute left-6 right-6 sm:left-8 sm:right-8 top-4 sm:top-5 h-0.5 bg-slate-200 -z-0" />
            {/* Active connecting fill */}
            <div
              className="absolute left-6 top-4 sm:top-5 h-0.5 bg-indigo-600 transition-all duration-300 -z-0"
              style={{
                width:
                  currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
              }}
            />

            {stepsConfig.map((step) => {
              const isDone = isCompleted || currentStep > step.number;
              const isCurrent = !isCompleted && currentStep === step.number;
              const isRemaining = !isCompleted && currentStep < step.number;

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
                    {isDone ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : (
                      <span>{step.number}</span>
                    )}
                  </div>

                  <div className="mt-1.5 sm:mt-2 text-center max-w-[75px] sm:max-w-none">
                    <span
                      className={`text-[11px] sm:text-xs font-semibold block leading-tight truncate sm:overflow-visible ${
                        isCurrent
                          ? 'text-indigo-600'
                          : isDone
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-slate-500 hidden sm:block mt-0.5">
                      {isDone ? 'Completed' : isCurrent ? 'Current step' : isRemaining ? 'Remaining' : ''}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stepper Body */}
        {isCompleted ? (
          /* Completion State */
          <div className="text-center py-4 sm:py-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Project Workspace Created!</h2>
              <p className="text-xs sm:text-sm text-slate-600">
                All 3 setup steps have been completed and verified.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left text-xs sm:text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  User Details
                </span>
                <p className="font-semibold text-slate-900 mt-1">{formData.fullName}</p>
                <p className="text-xs text-slate-600 break-all">{formData.workEmail}</p>
                <p className="text-xs text-slate-600">{formData.jobRole}</p>
              </div>

              <div>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-wider block">
                  Workspace
                </span>
                <p className="font-semibold text-slate-900 mt-1">{formData.projectName}</p>
                <p className="text-xs text-slate-600">Team: {formData.teamSize}</p>
                <p className="text-xs text-slate-600">Environment: {formData.environment}</p>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              className="w-full sm:w-auto justify-center"
            >
              Start New Setup Flow
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900">Step 1: Account Identity</h2>
                  <p className="text-xs text-slate-500">Provide your official work credentials.</p>
                </div>

                <Input
                  label="Full Name"
                  required
                  placeholder="e.g. Jordan Hayes"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  error={stepErrors.fullName}
                  helperText="Your legal name for workspace licensing"
                />

                <Input
                  label="Work Email"
                  type="email"
                  required
                  placeholder="e.g. jordan.hayes@enterprise.io"
                  value={formData.workEmail}
                  onChange={(e) => handleInputChange('workEmail', e.target.value)}
                  error={stepErrors.workEmail}
                  helperText="Must be a corporate domain email"
                />

                <Input
                  label="Job Title / Role"
                  required
                  placeholder="e.g. Lead Architect"
                  value={formData.jobRole}
                  onChange={(e) => handleInputChange('jobRole', e.target.value)}
                  error={stepErrors.jobRole}
                  helperText="Your role inside the organization"
                />
              </div>
            )}

            {/* Step 2: Workspace Setup */}
            {currentStep === 2 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900">Step 2: Workspace Configuration</h2>
                  <p className="text-xs text-slate-500">Define the project environment and team parameters.</p>
                </div>

                <Input
                  label="Project or Workspace Name"
                  required
                  placeholder="e.g. Core Billing Engine"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  error={stepErrors.projectName}
                  helperText="A clear name to identify this project workspace"
                />

                <div className="text-left space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Team Size <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', e.target.value)}
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="1-5 members">1 - 5 members (Starter)</option>
                    <option value="5-20 members">5 - 20 members (Growth)</option>
                    <option value="20-50 members">20 - 50 members (Mid-tier)</option>
                    <option value="50+ members">50+ members (Enterprise)</option>
                  </select>
                </div>

                <div className="text-left space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1">
                    Environment Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.environment}
                    onChange={(e) => handleInputChange('environment', e.target.value)}
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px] text-slate-900 shadow-sm focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  >
                    <option value="Production">Production Cluster</option>
                    <option value="Staging">Staging & QA</option>
                    <option value="Development">Local Development</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Review and Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-3.5 sm:space-y-4 animate-in fade-in duration-150">
                <div className="border-b border-slate-100 pb-2.5 sm:pb-3">
                  <h2 className="text-base sm:text-lg font-semibold text-slate-900">Step 3: Review & Final Submission</h2>
                  <p className="text-xs text-slate-500">Confirm all details before launching the workspace.</p>
                </div>

                {/* Review Breakdown */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 sm:p-4 text-left space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      Summary of Entered Inputs
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline"
                    >
                      Edit inputs
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Full Name:</span>
                      <p className="font-semibold text-slate-800">{formData.fullName || '—'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Work Email:</span>
                      <p className="font-semibold text-slate-800 break-all">{formData.workEmail || '—'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Job Role:</span>
                      <p className="font-semibold text-slate-800">{formData.jobRole || '—'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Project Name:</span>
                      <p className="font-semibold text-slate-800">{formData.projectName || '—'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Team Size:</span>
                      <p className="font-semibold text-slate-800">{formData.teamSize}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Environment:</span>
                      <p className="font-semibold text-slate-800">{formData.environment}</p>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="text-left pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
                    />
                    <span className="text-xs text-slate-700 leading-relaxed">
                      I certify that all provided details are accurate and agree to the system’s standard
                      operational policies and data governance guidelines.
                    </span>
                  </label>
                  {stepErrors.agreeToTerms && (
                    <p className="text-xs text-rose-600 font-medium mt-1">
                      {stepErrors.agreeToTerms}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Stepper Navigation: Back and Next / Submit */}
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
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting && <Send className="w-4 h-4" />}
                  >
                    Submit
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
