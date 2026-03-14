interface Step {
  description: string;
  linguaAction: string;
}

interface UseCaseScenarioProps {
  title: string;
  location: string;
  scenario: string;
  steps: Step[];
}

const stepColors = [
  '#3B82F6',
  '#8B5CF6',
  '#14B8A6',
  '#F59E0B',
  '#FB7185',
  '#10B981',
];

export default function UseCaseScenario({
  title,
  location,
  scenario,
  steps,
}: UseCaseScenarioProps) {
  return (
    <div className="bg-white rounded-2xl border border-lingua-border-light shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-lingua-border-light">
        <p className="text-xs font-semibold uppercase tracking-wider text-lingua-blue mb-1">
          {location}
        </p>
        <h3 className="font-serif text-xl font-bold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {scenario}
        </p>
      </div>

      {/* Steps */}
      <div className="px-8 py-6">
        <ol className="space-y-6" role="list">
          {steps.map((step, i) => {
            const color = stepColors[i % stepColors.length];
            return (
              <li key={i} className="flex gap-4">
                {/* Step number + line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-[2px] flex-1 mt-2 bg-lingua-border-light" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <p className="text-sm text-text-primary font-medium mb-1.5">
                    {step.description}
                  </p>
                  <div
                    className="text-xs font-medium px-3 py-1.5 rounded-lg inline-block"
                    style={{
                      backgroundColor: `${color}10`,
                      color,
                    }}
                  >
                    LINGUA: {step.linguaAction}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
