import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      name,
      error,
      helperText,
      leftIcon,
      required,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || name || label.toLowerCase().replace(/\s+/g, '-');
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full min-w-0 flex flex-col gap-1.5 text-left">
        <label
          htmlFor={inputId}
          className="text-xs sm:text-sm font-medium text-slate-800 flex items-center gap-1 select-none"
        >
          <span>{label}</span>
          {required && (
            <span className="text-rose-500 font-semibold" title="Required field">
              *
            </span>
          )}
        </label>

        <div className="relative rounded-lg shadow-sm w-full min-w-0">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name || inputId}
            required={required}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              block w-full min-w-0 rounded-lg transition-colors duration-150
              ${leftIcon ? 'pl-10' : 'pl-3.5'} pr-3.5
              py-2.5 sm:py-2 text-base sm:text-sm min-h-[44px] sm:min-h-[40px]
              ${
                error
                  ? 'border-rose-300 bg-rose-50/20 text-rose-900 placeholder-rose-300 focus:border-rose-500 focus:ring-rose-500 focus:outline-none focus:ring-1'
                  : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-400 focus:border-indigo-600 focus:ring-indigo-600 focus:outline-none focus:ring-1'
              }
              disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed
              border shadow-sm
              ${className}
            `}
            {...props}
          />
        </div>

        {error ? (
          <div
            id={errorId}
            role="alert"
            className="flex items-start gap-1.5 text-xs text-rose-600 font-medium mt-0.5 animate-fadeIn"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span className="leading-tight">{error}</span>
          </div>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-500 mt-0.5 leading-normal">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
