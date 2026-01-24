import { CheckCircle, LayoutDashboard, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SuccessStepProps {
  selectedPlan: string;
}

const SuccessStep = ({ selectedPlan }: SuccessStepProps) => {
  const navigate = useNavigate();

  const planDetails = {
    monthly: { name: "Monthly (1 slot)", validUntil: "17 Feb 2024" },
    yearly: { name: "Yearly (3 slots)", validUntil: "17 Jan 2025" },
  };

  const plan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails.yearly;

  const nextSteps = [
    "Complete your profile by adding more photos of your work",
    "Set your working hours and availability",
    "Add your service rates (optional)",
    "Share your profile link to get more customers",
    "Respond promptly to customer inquiries",
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-green-600 text-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <h2 className="text-xl sm:text-2xl font-bold">Welcome Aboard!</h2>
        </div>
        <p className="text-white/90 mt-1">Your service listing is now active</p>
      </div>

      {/* Success Content */}
      <div className="text-center py-6">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Congratulations! Your service provider account is now active. Customers in Bhiwadi can now find and contact you for services.
        </p>
      </div>

      {/* Account Details */}
      <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Provider ID</span>
          <span className="font-semibold text-foreground">BA-PRV-2024-00156</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Plan</span>
          <span className="font-semibold text-foreground">{plan.name}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Valid Until</span>
          <span className="font-semibold text-foreground">{plan.validUntil}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Payment ID</span>
          <span className="font-semibold text-foreground">pay_NxYz123456</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">Status</span>
          <span className="font-semibold text-green-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={() => navigate("/")} className="gap-2">
          <LayoutDashboard className="w-4 h-4" />
          Go to Dashboard
        </Button>
        <Button variant="outline" className="gap-2">
          <Eye className="w-4 h-4" />
          View My Listing
        </Button>
      </div>

      {/* Next Steps */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-amber-600" />
          <span className="font-semibold text-foreground">Next Steps:</span>
        </div>
        <ul className="space-y-2">
          {nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuccessStep;
