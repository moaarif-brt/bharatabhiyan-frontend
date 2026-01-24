import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
  subtitle?: string;
  completed: boolean;
  current: boolean;
}

interface RegistrationStepsSidebarProps {
  steps: Step[];
  onStepClick: (step: number) => void;
}

const RegistrationStepsSidebar = ({ steps, onStepClick }: RegistrationStepsSidebarProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <h3 className="font-semibold text-foreground mb-4 uppercase text-sm tracking-wide">Registration Steps</h3>
      <div className="relative">
        <div className="space-y-1 relative">
          {steps.map((step, index) => (
            <button
              key={step.number}
              onClick={() => onStepClick(step.number)}
              className="w-full flex items-start gap-3 p-2 text-left transition-colors hover:bg-muted/50 rounded-lg"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 relative z-10 ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : step.current
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.completed ? <Check className="w-4 h-4" /> : step.number}
              </div>
              <div className="pt-1">
                <span className={`text-sm font-medium block ${
                  step.current ? "text-foreground" : step.completed ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {step.title}
                </span>
                {step.subtitle && (
                  <span className={`text-xs ${
                    step.current ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step.subtitle}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationStepsSidebar;
