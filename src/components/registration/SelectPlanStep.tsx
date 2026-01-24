import { Check, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SelectPlanStepProps {
  onContinue: (plan: string) => void;
  onBack: () => void;
}

const SelectPlanStep = ({ onContinue, onBack }: SelectPlanStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");

  const plans = [
    {
      id: "monthly",
      name: "Monthly Plan",
      price: "₹199",
      period: "/ month",
      features: [
        "1 Service listing slot",
        "Basic profile visibility",
        "Monthly renewal",
        "Cancel anytime",
      ],
      popular: false,
    },
    {
      id: "yearly",
      name: "Yearly Plan",
      price: "₹1,499",
      period: "/ year",
      features: [
        "3 Service listing slots",
        "Priority in search results",
        "Save ₹889 vs monthly",
        "Highlighted profile badge",
      ],
      popular: true,
    },
  ];

  const includedFeatures = [
    "Verified provider badge on your profile",
    "Appear in customer search results",
    "Direct call & WhatsApp inquiries from customers",
    "Access to provider dashboard",
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold">Select Subscription Plan</h2>
        <p className="text-primary-foreground/90 mt-1">Choose a plan to activate your service listing</p>
      </div>

      {/* What's included */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span className="font-semibold text-foreground">What's included in all plans:</span>
        </div>
        <ul className="space-y-2">
          {includedFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded">
                MOST POPULAR
              </div>
            )}

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">{plan.name}</h3>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id ? "border-primary bg-primary" : "border-muted-foreground"
                }`}
              >
                {selectedPlan === plan.id && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
              </div>
            </div>

            <div className="mb-4">
              <span className="text-3xl font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <Button variant="outline" onClick={onBack}>
          ← Back
        </Button>
        <Button onClick={() => onContinue(selectedPlan)}>
          Continue to Payment →
        </Button>
      </div>
    </div>
  );
};

export default SelectPlanStep;
