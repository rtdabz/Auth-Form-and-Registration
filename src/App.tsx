import React from 'react';
import { UnifiedAppFlow } from './components/flow/UnifiedAppFlow';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans antialiased text-slate-900 selection:bg-indigo-500 selection:text-white px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
      <main className="w-full max-w-2xl mx-auto flex flex-col justify-center">
        <UnifiedAppFlow />
      </main>
    </div>
  );
};
