import React, { useState } from 'react';
import {
  GraduationCap,
  LogIn,
  UserCheck,
  AlertCircle,
  BookOpen,
  Calendar,
  LogOut,
  Bell,
  ArrowRight,
  IdCard,
} from 'lucide-react';
import { Input } from '../ui/Input';
import { PasswordInput } from '../ui/PasswordInput';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface StudentLoginProps {
  onSwitchToRegister?: () => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onSwitchToRegister }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [touched, setTouched] = useState({
    identifier: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Field validation
  const validateIdentifier = (val: string) => {
    if (!val.trim()) return 'Student ID or institutional email is required.';
    if (val.includes('@')) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) {
        return 'Please enter a valid institutional email format.';
      }
    } else if (val.trim().length < 5) {
      return 'Student ID must be at least 5 alphanumeric characters.';
    }
    return undefined;
  };

  const validatePassword = (val: string) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return undefined;
  };

  const identifierError = touched.identifier ? validateIdentifier(identifier) : undefined;
  const passwordError = touched.password ? validatePassword(password) : undefined;

  const isFormValid =
    Boolean(identifier.trim()) &&
    !validateIdentifier(identifier) &&
    Boolean(password) &&
    !validatePassword(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ identifier: true, password: true });
    setLoginError(null);

    if (!isFormValid) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (identifier.toLowerCase().includes('fail')) {
        setLoginError('Invalid student credentials. Please verify your Student ID and password.');
      } else {
        setIsLoggedIn(true);
      }
    }, 750);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setLoginError(null);
    setTimeout(() => {
      setIsLoading(false);
      setIdentifier('alex.student@gmail.com');
      setIsLoggedIn(true);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    setTouched({ identifier: false, password: false });
    setLoginError(null);
  };

  if (isLoggedIn) {
    return (
      <div className="w-full max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-200 text-left px-1 sm:px-0">
        <Card className="p-5 sm:p-8 bg-white shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 sm:pb-5 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100 shrink-0">
                <UserCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
                  Welcome Back, Student
                </h2>
                <p className="text-xs text-slate-500">
                  ID: <span className="font-mono text-slate-700 font-medium">STU-2026-89421</span> • Term: Fall 2026
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
              className="w-full sm:w-auto justify-center"
            >
              Sign Out
            </Button>
          </div>

          <div className="mt-5 sm:mt-6 space-y-4">
            <div className="p-3.5 sm:p-4 rounded-lg bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 sm:gap-3">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-indigo-900 leading-relaxed">
                <p className="font-semibold">Academic Status: Active & In Good Standing</p>
                <p className="mt-0.5 text-indigo-800/80">
                  Course registration for next term opens on Monday. Make sure to review your degree audit with your advisor.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Enrolled Courses</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900">5 Courses (15 Credits)</p>
              </div>

              <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium mb-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Upcoming Milestone</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-900">Midterm Exams (Oct 18)</p>
              </div>
            </div>

            {onSwitchToRegister && (
              <div className="pt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onSwitchToRegister}
                  leftIcon={<IdCard className="w-4 h-4" />}
                  className="w-full justify-center"
                >
                  View & Update Student Information Record
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto text-left px-1 sm:px-0">
      <Card className="p-5 sm:p-8 shadow-sm">
        {/* Header with University Portal Branding */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-md mb-3">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Student Portal Sign In
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Access your courses, schedule, grades, and university services.
          </p>
        </div>

        {/* Global Error Banner */}
        {loginError && (
          <div className="mb-4 sm:mb-5 p-3 sm:p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="leading-tight">{loginError}</span>
          </div>
        )}

        {/* Single-Column Login Form */}
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5 sm:gap-4">
          {/* Field 1: Student Identifier */}
          <Input
            label="Student ID or Institutional Email"
            id="student-identifier"
            name="identifier"
            type="text"
            required
            placeholder="e.g. s2026104 or alex@aegis.edu"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (loginError) setLoginError(null);
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, identifier: true }))}
            error={identifierError}
            helperText="Provided in your official acceptance letter or student ID"
            autoComplete="username"
          />

          {/* Field 2: Password */}
          <PasswordInput
            label="Password"
            id="student-password"
            name="password"
            required
            placeholder="Enter your student password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (loginError) setLoginError(null);
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            error={passwordError}
            autoComplete="current-password"
          />

          {/* Secondary Controls: Remember Me & Forgot Password */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-2 select-none">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 shrink-0"
              />
              <span>Remember this device</span>
            </label>

            <button
              type="button"
              onClick={() => alert('Please contact registrar@aegis.edu or your IT Helpdesk (ext 4357) to reset your student password.')}
              className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline focus:outline-none text-left sm:text-right py-0.5"
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              disabled={!isFormValid || isLoading}
              isLoading={isLoading}
              rightIcon={!isLoading && <LogIn className="w-4 h-4" />}
            >
              Sign in
            </Button>

            {!isFormValid && (
              <p className="text-[11px] text-slate-400 text-center mt-2 leading-normal">
                Enter your registered student ID/email and password to continue
              </p>
            )}

            <div className="relative flex py-2 items-center">
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
              disabled={isLoading}
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
          </div>
        </form>

        {/* Portal Student Information Switcher */}
        {onSwitchToRegister && (
          <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600 flex flex-wrap items-center justify-center gap-1">
              <span>Looking for student records?</span>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 focus:outline-none"
              >
                <span>Access Student Information</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};
