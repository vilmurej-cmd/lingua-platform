'use client';

import { useState, useMemo, useCallback } from 'react';

interface Marker {
  lat: number;
  lng: number;
  color: string;
  label: string;
  onClick?: () => void;
}

interface WorldMapProps {
  markers: Marker[];
}

// Map coordinates: viewport is 1000x500, Mercator-like projection
function latLngToXY(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  // Simple Mercator-ish
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 250 - (mercN / Math.PI) * 250;
  return { x: Math.max(0, Math.min(1000, x)), y: Math.max(0, Math.min(500, y)) };
}

// Simplified continent outlines as path data
const continentPaths = [
  // North America
  'M 80 100 Q 120 80 200 90 L 240 120 Q 260 160 230 200 L 190 210 Q 150 220 130 180 L 100 150 Z',
  // South America
  'M 200 250 Q 220 240 240 260 L 250 320 Q 240 370 220 390 L 200 380 Q 180 350 185 300 Z',
  // Europe
  'M 440 80 Q 470 70 510 85 L 520 110 Q 510 130 480 130 L 450 120 Z',
  // Africa
  'M 440 160 Q 470 150 510 170 L 520 240 Q 510 310 490 330 L 460 320 Q 440 280 440 220 Z',
  // Asia
  'M 530 60 Q 600 50 700 70 L 750 100 Q 770 140 740 180 L 680 190 Q 620 180 570 150 L 540 120 Z',
  // Southeast Asia / Indonesia
  'M 700 200 Q 730 190 770 200 L 790 220 Q 780 240 750 240 L 720 230 Z',
  // Australia
  'M 760 300 Q 800 290 840 300 L 850 330 Q 840 360 810 360 L 770 340 Z',
];

export default function WorldMap({ markers }: WorldMapProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const projectedMarkers = useMemo(
    () =>
      markers.map((m) => ({
        ...m,
        ...latLngToXY(m.lat, m.lng),
      })),
    [markers]
  );

  const handleMarkerKeyDown = useCallback(
    (e: React.KeyboardEvent, marker: Marker) => {
      if ((e.key === 'Enter' || e.key === ' ') && marker.onClick) {
        e.preventDefault();
        marker.onClick();
      }
    },
    []
  );

  return (
    <div className="w-full" style={{ aspectRatio: '2 / 1' }}>
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full"
        role="img"
        aria-label="World map showing language locations"
      >
        {/* Background */}
        <rect width="1000" height="500" fill="#FAFBFC" rx="8" />

        {/* Continents */}
        {continentPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="#E2E8F0"
            stroke="#CBD5E1"
            strokeWidth="1"
          />
        ))}

        {/* Markers */}
        {projectedMarkers.map((m, i) => (
          <g key={i}>
            {/* Pulse ring */}
            <circle
              cx={m.x}
              cy={m.y}
              r="12"
              fill={m.color}
              opacity="0.15"
            >
              <animate
                attributeName="r"
                values="8;14;8"
                dur="3s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.15;0.05;0.15"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Dot */}
            <circle
              cx={m.x}
              cy={m.y}
              r="5"
              fill={m.color}
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={m.label}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              onFocus={() => setHoveredIdx(i)}
              onBlur={() => setHoveredIdx(null)}
              onClick={() => m.onClick?.()}
              onKeyDown={(e) => handleMarkerKeyDown(e, m)}
              style={{ outline: 'none' }}
            />

            {/* Tooltip */}
            {hoveredIdx === i && (
              <g>
                <rect
                  x={m.x - 60}
                  y={m.y - 32}
                  width="120"
                  height="22"
                  rx="6"
                  fill="#1E293B"
                  opacity="0.9"
                />
                <text
                  x={m.x}
                  y={m.y - 17}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="system-ui, sans-serif"
                >
                  {m.label.length > 18 ? m.label.slice(0, 18) + '...' : m.label}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
