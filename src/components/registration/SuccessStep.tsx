import { CheckCircle, LayoutDashboard, Eye, FileText, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


interface SuccessStepProps {
  profile: any;
}

const SuccessStep = ({ profile }: SuccessStepProps) => {
  const navigate = useNavigate();

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
          <PartyPopper className="w-6 h-6" />
          <h2 className="text-xl sm:text-2xl font-bold">Welcome Aboard!</h2>
        </div>
        <p className="text-white/90 mt-1">Your service listing is now active</p>
      </div>

      {/* Success Content */}
      <div className="text-center py-6">
        <div className="mb-4 flex justify-center">
          <PartyPopper className="w-12 h-12 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Congratulations! Your service provider account is now active. Customers in {profile?.city_name} can now find and contact you for services.
        </p>
      </div>

      {/* Account Details */}
      <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Application ID</span>
          <span className="font-semibold text-foreground">{profile?.application_id}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Business Name</span>
          <span className="font-semibold text-foreground">{profile?.business_name}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Category</span>
          <span className="font-semibold text-foreground">{profile?.category_name}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Service Type</span>
          <span className="font-semibold text-foreground">{profile?.service_type_name}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">Status</span>
          <span className="font-semibold text-green-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            {profile?.verification_status}
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
