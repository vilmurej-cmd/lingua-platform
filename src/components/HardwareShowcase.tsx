import { Check } from 'lucide-react';

interface Device {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  emoji: string;
  color: string;
}

interface HardwareShowcaseProps {
  devices: Device[];
}

export default function HardwareShowcase({ devices }: HardwareShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {devices.map((device) => (
        <div
          key={device.name}
          className="relative bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden group hover:shadow-xl transition-shadow"
        >
          {/* Gradient accent */}
          <div
            className="h-1.5"
            style={{
              background: `linear-gradient(90deg, ${device.color}, ${device.color}80)`,
            }}
          />

          <div className="p-8">
            {/* Emoji placeholder */}
            <span
              className="text-5xl block mb-6"
              role="img"
              aria-hidden="true"
            >
              {device.emoji}
            </span>

            {/* Name */}
            <h3 className="font-serif text-2xl font-bold text-text-primary mb-1">
              {device.name}
            </h3>

            {/* Tagline */}
            <p
              className="text-sm font-medium mb-4"
              style={{ color: device.color }}
            >
              {device.tagline}
            </p>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              {device.description}
            </p>

            {/* Features */}
            <ul className="space-y-2" role="list">
              {device.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    size={16}
                    className="flex-shrink-0 mt-0.5"
                    style={{ color: device.color }}
                  />
                  <span className="text-sm text-text-primary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
