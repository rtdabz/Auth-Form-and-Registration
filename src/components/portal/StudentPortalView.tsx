import React, { useState } from 'react';
import {
  GraduationCap,
  LogIn,
  IdCard,
  Calendar,
  ShieldCheck,
  Building,
  PhoneCall,
} from 'lucide-react';
import { StudentLogin } from './StudentLogin';
import { StudentInformation } from './StudentInformation';
import { Card } from '../ui/Card';

export const StudentPortalView: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'login' | 'information'>('information');

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 text-left px-1 sm:px-0">
      {/* University Portal Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Background Academic Watermark */}
        <div className="absolute -right-8 -bottom-8 text-white/5 pointer-events-none hidden sm:block">
          <GraduationCap className="w-64 h-64" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5 sm:pb-4 mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-indigo-300 block">
                  Aegis University
                </span>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-snug">
                  Student Information & Services Portal
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full w-fit">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Fall Semester 2026 • Records & Services</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Official institutional gateway for managing student records, academic degree details, and university portal access.
            </p>

            {/* Responsive Mode Switcher */}
            <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex rounded-lg bg-slate-800/90 p-1 border border-white/10 shrink-0 gap-1 sm:gap-0">
              <button
                type="button"
                onClick={() => setActiveMode('information')}
                className={`
                  flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs font-semibold transition-all duration-150
                  ${
                    activeMode === 'information'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }
                `}
              >
                <IdCard className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Student Information</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode('login')}
                className={`
                  flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md text-xs font-semibold transition-all duration-150
                  ${
                    activeMode === 'login'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }
                `}
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>Student Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Form Area */}
      <div>
        {activeMode === 'login' ? (
          <StudentLogin onSwitchToRegister={() => setActiveMode('information')} />
        ) : (
          <StudentInformation onSwitchToLogin={() => setActiveMode('login')} />
        )}
      </div>

      {/* University Support & Guidance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-4 text-xs">
        <Card className="p-3.5 sm:p-4 bg-white border-slate-200">
          <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
            <Building className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Registrar & Student Records</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Need to update your official major or order academic transcripts? Contact registrar@aegis.edu or visit Hall of Sciences 104.
          </p>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-white border-slate-200">
          <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
            <PhoneCall className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>IT & Student Helpdesk</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            For password resets, two-factor authentication, or campus ID inquiries, call (555) 019-4357 (24/7 student line).
          </p>
        </Card>

        <Card className="p-3.5 sm:p-4 bg-white border-slate-200">
          <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>FERPA & Educational Records</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            All student academic records are legally safeguarded under FERPA and university data security governance.
          </p>
        </Card>
      </div>
    </div>
  );
};
