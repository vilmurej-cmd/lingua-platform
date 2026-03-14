'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Stat {
  value: number;
  label: string;
  color: string;
  suffix?: string;
  prefix?: string;
}

interface ImpactStatsProps {
  stats: Stat[];
}

function useCountUp(target: number, running: boolean, duration = 2000): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!running) return;
    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, running, duration]);

  return current;
}

function StatItem({ stat, visible }: { stat: Stat; visible: boolean }) {
  const count = useCountUp(stat.value, visible);

  return (
    <div className="text-center p-6">
      <p
        className="text-4xl md:text-5xl font-bold font-serif tabular-nums"
        style={{ color: stat.color }}
        aria-label={`${stat.prefix || ''}${stat.value.toLocaleString()}${stat.suffix || ''} ${stat.label}`}
      >
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-text-secondary font-medium">
        {stat.label}
      </p>
    </div>
  );
}

export default function ImpactStats({ stats }: ImpactStatsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) setVisible(true);
    },
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleIntersection]);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      role="group"
      aria-label="Impact statistics"
    >
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} visible={visible} />
      ))}
    </div>
  );
}
