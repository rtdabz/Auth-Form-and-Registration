import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog viewport container */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          ref={modalRef}
          className={`relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all w-full max-h-[92vh] flex flex-col ${maxWidthStyles[maxWidth]} border border-slate-200 animate-in fade-in zoom-in-95 duration-150 my-auto`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-3.5 sm:py-4 shrink-0">
            <h3
              id="modal-title"
              className="text-base sm:text-lg font-semibold text-slate-900 truncate pr-2"
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              type="button"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors shrink-0 min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with inner scroll for smaller vertical viewports */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 overflow-y-auto flex-1">
            {children}
          </div>

          {/* Footer with responsive flex */}
          {footer && (
            <div className="border-t border-slate-100 bg-slate-50/70 px-4 sm:px-6 py-3 sm:py-4 shrink-0">
              <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 [&>button]:w-full sm:[&>button]:w-auto">
                {footer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
