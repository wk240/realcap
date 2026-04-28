'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">
          {question}
        </span>
        <span
          className={cn(
            'flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 transition-transform',
            isOpen && 'rotate-180'
          )}
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="pb-6 pr-12">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}