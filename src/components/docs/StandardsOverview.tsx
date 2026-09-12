import React from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Layout,
  Type,
  MousePointerClick,
  Sliders,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export const StandardsOverview: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 text-left px-1 sm:px-0">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-medium mb-3 sm:mb-4 backdrop-blur-sm border border-indigo-400/20">
          <Sparkles className="w-3.5 h-3.5" />
          System Design Standard
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
          UI/UX Form & Interaction Guidelines
        </h1>
        <p className="mt-2 sm:mt-3 text-xs sm:text-base text-indigo-100 max-w-3xl leading-relaxed">
          The foundational principles governing all forms, interactive dialogues, state feedback,
          and component behaviors across all devices and form factors.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* 1. Single-Column Forms */}
        <Card className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layout className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Single-Column Flow</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-column forms create visual zig-zagging and increase user completion time.
            Always use a clean, vertical single-column layout so eyes follow one natural path.
          </p>
          <div className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
            Standard: Top-to-bottom natural progression
          </div>
        </Card>

        {/* 2. Step Steppers */}
        <Card className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">3-Step Clear Stepper</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Divide complex workflows into sequential steps with explicit Back and Next buttons.
            Current, completed, and remaining steps must be clearly distinguished. Never wipe state on Back.
          </p>
          <div className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded">
            Standard: State persistence + Step validation
          </div>
        </Card>

        {/* 3. Action-based Dialogs */}
        <Card className="p-4 sm:p-6 space-y-2.5 sm:space-y-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">Explicit Confirmation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never use generic “Yes” or “OK”. Use explicit verbs like “Delete”, identify the
            targeted item in title and card, and apply high-contrast destructive styling.
          </p>
          <div className="text-[11px] font-medium text-rose-700 bg-rose-50 px-2.5 py-1 rounded">
            Standard: Verbs over ambiguous Yes/OK
          </div>
        </Card>
      </div>

      {/* Design System Foundations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* State Hierarchy Showcase */}
        <Card className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MousePointerClick className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Consistent Interactive States</h3>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1.5">Button States</span>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="primary">Default</Button>
                <Button size="sm" variant="primary" className="ring-2 ring-indigo-500 ring-offset-1">Focused</Button>
                <Button size="sm" variant="primary" disabled>Disabled</Button>
                <Button size="sm" variant="primary" isLoading>Loading</Button>
                <Button size="sm" variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-500 font-medium block mb-1.5">Input States</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 border border-slate-300 rounded-lg bg-white text-slate-700">
                  Normal Input Field
                </div>
                <div className="p-2.5 border border-rose-300 bg-rose-50/30 text-rose-700 rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Inline Error State</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography & Spacing Rules */}
        <Card className="p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Type className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">Typography & Spacing Standards</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-slate-100 gap-0.5">
              <span className="text-slate-500">Page Heading (H1):</span>
              <span className="font-bold text-slate-900 text-sm sm:text-base">24px (1.5rem) Bold</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-slate-100 gap-0.5">
              <span className="text-slate-500">Section Heading (H2):</span>
              <span className="font-semibold text-slate-900 text-xs sm:text-sm">18px (1.125rem) Semi-bold</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-slate-100 gap-0.5">
              <span className="text-slate-500">Field Label:</span>
              <span className="font-medium text-slate-800 text-xs">14px (0.875rem) Medium</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-slate-100 gap-0.5">
              <span className="text-slate-500">Inline Error & Helper:</span>
              <span className="font-medium text-rose-600 text-xs">12px (0.75rem) Regular/Medium</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 gap-0.5">
              <span className="text-slate-500">Base Spacing Unit:</span>
              <span className="font-mono text-slate-700">8px Grid (4px, 8px, 16px, 24px, 32px)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* System Checklist */}
      <Card className="p-4 sm:p-6 bg-slate-50 border-slate-200">
        <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          General UI Requirements Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Single-column forms to maximize speed & minimize cognitive load</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Button disabled until all required fields are validated</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Real-time inline validation with descriptive error guidance</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Persistent form state during stepper Back / Next navigation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Clear progress indicators (Current, Completed, Remaining)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Action-based confirmation buttons (Delete/Cancel vs OK/Yes)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
