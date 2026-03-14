'use client';

import { useState, useCallback } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface WaitlistCaptureProps {
  productName: string;
}

const WAITLIST_KEY = 'lingua-waitlist';

function getWaitlist(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(WAITLIST_KEY) || '{}');
  } catch {
    return {};
  }
}

export default function WaitlistCapture({ productName }: WaitlistCaptureProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !!getWaitlist()[productName];
  });
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError('');

      const trimmed = email.trim();
      if (!trimmed) {
        setError('Please enter your email address.');
        return;
      }

      // Basic email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setError('Please enter a valid email address.');
        return;
      }

      try {
        const list = getWaitlist();
        list[productName] = trimmed;
        localStorage.setItem(WAITLIST_KEY, JSON.stringify(list));
        setSubmitted(true);
      } catch {
        setError('Could not save. Please try again.');
      }
    },
    [email, productName]
  );

  if (submitted) {
    return (
      <div className="bg-lingua-emerald/5 border border-lingua-emerald/20 rounded-2xl p-6 text-center">
        <CheckCircle size={32} className="text-lingua-emerald mx-auto mb-3" />
        <p className="font-serif text-lg font-semibold text-text-primary mb-1">
          You&apos;re on the list!
        </p>
        <p className="text-sm text-text-secondary">
          We&apos;ll notify you when {productName} is available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light p-6 shadow-sm">
      <h4 className="font-serif text-lg font-semibold text-text-primary mb-1">
        Join the waitlist for {productName}
      </h4>
      <p className="text-sm text-text-secondary mb-4">
        Be the first to know when it launches.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor={`waitlist-${productName}`} className="sr-only">
              Email address
            </label>
            <input
              id={`waitlist-${productName}`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-lingua-border-light rounded-xl focus:outline-none focus:ring-2 focus:ring-lingua-blue focus:border-transparent"
              aria-describedby={error ? `waitlist-error-${productName}` : undefined}
              aria-invalid={!!error}
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lingua-amber focus-visible:ring-offset-2"
            style={{
              background: 'linear-gradient(135deg, #F59E0B, #F97316)',
            }}
          >
            Join
            <ArrowRight size={14} />
          </button>
        </div>
        {error && (
          <p
            id={`waitlist-error-${productName}`}
            className="text-xs text-red-500 mt-2"
            role="alert"
          >
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
