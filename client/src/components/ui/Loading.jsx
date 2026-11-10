import React from 'react';

export default function Loading({ text = 'Loading...', fullPage = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-brand-orange animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-brand-red rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-600 animate-pulse">{text}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
}
