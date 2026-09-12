/**
 * Backend Validation Service (Simulated Server-Side API Endpoint)
 * Enforces strict validation rules on incoming registration and application payloads
 * to ensure database records remain reliable regardless of client environment.
 */

export interface BackendValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  timestamp: string;
  statusCode: 200 | 400 | 422;
}

export function validateBackendSubmission(data: {
  email?: string;
  fullName?: string;
  password?: string;
  dateOfBirth?: string;
  phone?: string;
  emergencyPhone?: string;
  emergencyRelation?: string;
  degreeType?: string;
  department?: string;
  major?: string;
  startTerm?: string;
  classFormat?: string;
}): BackendValidationResult {
  const errors: Record<string, string> = {};

  // Local calendar date (YYYY-MM-DD)
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // 1. Email validation: Requires '@' and valid top-level domain
  if (data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!data.email.trim()) {
      errors.email = 'Backend API: Email address is required.';
    } else if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Backend API: Email format invalid. A full domain is required (e.g. name@domain.com).';
    }
  }

  // 2. Birthdate validation: strictly on or before today, reasonable year
  if (data.dateOfBirth !== undefined) {
    if (!data.dateOfBirth) {
      errors.dateOfBirth = 'Backend API: Birthdate is required.';
    } else if (data.dateOfBirth > today) {
      errors.dateOfBirth = 'Backend API: Birthdate cannot be in the future. Maximum date allowed is today.';
    } else {
      const birthYear = new Date(data.dateOfBirth).getFullYear();
      if (birthYear < 1900) {
        errors.dateOfBirth = 'Backend API: Birth year must be 1900 or later.';
      }
    }
  }

  // 3. Phone number: numbers only, required 10-11 digits
  if (data.phone !== undefined) {
    if (!data.phone.trim()) {
      errors.phone = 'Backend API: Phone number is required.';
    } else if (!/^\d+$/.test(data.phone.trim())) {
      errors.phone = 'Backend API: Phone number must contain numbers only.';
    } else if (data.phone.trim().length < 10 || data.phone.trim().length > 11) {
      errors.phone = 'Backend API: Phone number must be 10 or 11 digits.';
    }
  }

  // 4. Emergency phone: numbers only, required 10-11 digits
  if (data.emergencyPhone !== undefined) {
    if (!data.emergencyPhone.trim()) {
      errors.emergencyPhone = 'Backend API: Emergency phone number is required.';
    } else if (!/^\d+$/.test(data.emergencyPhone.trim())) {
      errors.emergencyPhone = 'Backend API: Emergency phone number must contain numbers only.';
    } else if (data.emergencyPhone.trim().length < 10 || data.emergencyPhone.trim().length > 11) {
      errors.emergencyPhone = 'Backend API: Emergency phone number must be 10 or 11 digits.';
    }
  }

  // 5. Program selection dropdown validations
  if (data.degreeType !== undefined && !data.degreeType) {
    errors.degreeType = 'Backend API: Degree type is required.';
  }
  if (data.department !== undefined && !data.department) {
    errors.department = 'Backend API: School/Department is required.';
  }
  if (data.major !== undefined && !data.major) {
    errors.major = 'Backend API: Major is required.';
  }
  if (data.startTerm !== undefined && !data.startTerm) {
    errors.startTerm = 'Backend API: Start term is required.';
  }
  if (data.classFormat !== undefined && !data.classFormat) {
    errors.classFormat = 'Backend API: Class format is required.';
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    timestamp: new Date().toISOString(),
    statusCode: isValid ? 200 : 422,
  };
}

