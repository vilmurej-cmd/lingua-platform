'use client';

import { useMemo } from 'react';
import { BookOpen, Flame, CheckCircle } from 'lucide-react';

interface LearningDashboardProps {
  language: string;
  progress: number;
  streak: number;
  todayComplete: boolean;
}

export default function LearningDashboard({
  language,
  progress,
  streak,
  todayComplete,
}: LearningDashboardProps) {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  const circumference = 2 * Math.PI * 54; // r=54
  const dashOffset = circumference - (clampedProgress / 100) * circumference;

  const greeting = useMemo(() => {
    if (todayComplete) return 'Great work today!';
    if (clampedProgress >= 75) return 'Almost there, keep going!';
    if (clampedProgress >= 25) return 'You are making progress!';
    return `Let's start learning ${language}!`;
  }, [todayComplete, clampedProgress, language]);

  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Progress ring */}
        <div className="relative flex-shrink-0" role="progressbar" aria-valuenow={clampedProgress} aria-valuemin={0} aria-valuemax={100} aria-label={`${language} progress`}>
          <svg width="128" height="128" viewBox="0 0 128 128">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 64 64)"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-text-primary">
              {clampedProgress}%
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-serif text-xl font-semibold text-text-primary mb-1">
            {language}
          </h3>
          <p className="text-sm text-text-secondary mb-4">{greeting}</p>

          {/* Streak */}
          <div className="flex items-center gap-4 mb-6 justify-center sm:justify-start">
            <div className="flex items-center gap-1.5">
              <Flame size={18} className="text-lingua-amber" />
              <span className="text-sm font-semibold text-text-primary">
                {streak} day streak
              </span>
            </div>
            {todayComplete && (
              <div className="flex items-center gap-1.5 text-lingua-emerald">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Today done</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={
              todayComplete
                ? {
                    background: '#F0FDF4',
                    color: '#10B981',
                    border: '1px solid #BBF7D0',
                  }
                : {
                    background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                    color: '#FFFFFF',
                  }
            }
          >
            {todayComplete ? (
              <>
                <CheckCircle size={16} />
                Lesson Complete
              </>
            ) : (
              <>
                <BookOpen size={16} />
                Continue Learning
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
