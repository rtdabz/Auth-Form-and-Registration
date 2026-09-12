import React, { useState, useId } from 'react';
import { User, Mail, Building2, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface FormFields {
  fullName: string;
  workEmail: string;
  company: string;
}

interface FormErrors {
  fullName?: string;
  workEmail?: string;
  company?: string;
}

export const CreateAccountForm: React.FC = () => {
  const formId = useId();

  const [formData, setFormData] = useState<FormFields>({
    fullName: '',
    workEmail: '',
    company: '',
  });

  const [touched, setTouched] = useState<Record<keyof FormFields, boolean>>({
    fullName: false,
    workEmail: false,
    company: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormFields | null>(null);

  // Email validation regex (RFC 5322 simplified standard)
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Validation rules
  const validateField = (field: keyof FormFields, value: string): string | undefined => {
    switch (field) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required.';
        if (value.trim().length < 2) return 'Full Name must be at least 2 characters.';
        return undefined;
      case 'workEmail':
        if (!value.trim()) return 'Work Email is required.';
        if (!isValidEmail(value)) return 'Please enter a valid work email address (e.g. alex@company.com).';
        return undefined;
      case 'company':
        if (!value.trim()) return 'Company is required.';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters.';
        return undefined;
      default:
        return undefined;
    }
  };

  const errors: FormErrors = {
    fullName: touched.fullName ? validateField('fullName', formData.fullName) : undefined,
    workEmail: touched.workEmail ? validateField('workEmail', formData.workEmail) : undefined,
    company: touched.company ? validateField('company', formData.company) : undefined,
  };

  // All required fields must be valid and non-empty
  const isFormValid =
    Boolean(formData.fullName.trim()) &&
    formData.fullName.trim().length >= 2 &&
    Boolean(formData.workEmail.trim()) &&
    isValidEmail(formData.workEmail) &&
    Boolean(formData.company.trim()) &&
    formData.company.trim().length >= 2;

  const handleChange = (field: keyof FormFields, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      fullName: true,
      workEmail: true,
      company: true,
    });

    if (!isFormValid) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      workEmail: '',
      company: '',
    });
    setTouched({
      fullName: false,
      workEmail: false,
      company: false,
    });
    setSubmittedData(null);
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 sm:px-0">
      <Card className="p-5 sm:p-8 shadow-sm">
        {submittedData ? (
          /* Clear Success State */
          <div className="text-center py-2 sm:py-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Account Created Successfully
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Your workspace profile has been configured and is ready to use.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 sm:p-4 text-left space-y-2 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-slate-200/60 gap-0.5 sm:gap-2">
                <span className="text-slate-500 font-medium">Full Name:</span>
                <span className="text-slate-900 font-semibold">{submittedData.fullName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 border-b border-slate-200/60 gap-0.5 sm:gap-2">
                <span className="text-slate-500 font-medium">Work Email:</span>
                <span className="text-slate-900 font-semibold break-all">{submittedData.workEmail}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1 gap-0.5 sm:gap-2">
                <span className="text-slate-500 font-medium">Company:</span>
                <span className="text-slate-900 font-semibold">{submittedData.company}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                onClick={handleReset}
                leftIcon={<RotateCcw className="w-4 h-4" />}
                className="w-full justify-center"
              >
                Create Another Account
              </Button>
            </div>
          </div>
        ) : (
          /* Single-column Form */
          <div>
            <div className="mb-5 sm:mb-6 text-left">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Create Account
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Enter your details to create your organization account.
              </p>
            </div>

            <form
              id={formId}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4 sm:gap-5 text-left"
            >
              {/* Field 1: Full Name */}
              <Input
                label="Full Name"
                id="full-name"
                name="fullName"
                type="text"
                required
                placeholder="e.g. Alex Morgan"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                error={errors.fullName}
                helperText="Enter your first and last name"
                leftIcon={<User className="w-4 h-4 text-slate-400" />}
                autoComplete="name"
              />

              {/* Field 2: Work Email */}
              <Input
                label="Work Email"
                id="work-email"
                name="workEmail"
                type="email"
                required
                placeholder="e.g. alex@company.com"
                value={formData.workEmail}
                onChange={(e) => handleChange('workEmail', e.target.value)}
                onBlur={() => handleBlur('workEmail')}
                error={errors.workEmail}
                helperText="We will send your verification link here"
                leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
                autoComplete="email"
              />

              {/* Field 3: Company */}
              <Input
                label="Company"
                id="company"
                name="company"
                type="text"
                required
                placeholder="e.g. Acme Corporation"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                onBlur={() => handleBlur('company')}
                error={errors.company}
                helperText="Your organization or registered business name"
                leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
                autoComplete="organization"
              />

              {/* Single Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={!isFormValid || isSubmitting}
                  isLoading={isSubmitting}
                  rightIcon={!isSubmitting && <ArrowRight className="w-4 h-4" />}
                >
                  Create Account
                </Button>

                {!isFormValid && (
                  <p className="mt-2 text-[11px] sm:text-xs text-slate-400 text-center select-none leading-normal">
                    Fill out all required fields with valid information to proceed
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};
