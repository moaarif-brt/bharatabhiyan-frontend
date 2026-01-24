import { Clock, X, CheckCircle, Phone, FileText, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

type VerificationStatus = "pending" | "rejected" | "verified";

interface CaptainVerificationStepProps {
  status: VerificationStatus;
  onContinue?: () => void;
  onResubmit?: () => void;
}

const CaptainVerificationStep = ({ status, onContinue, onResubmit }: CaptainVerificationStepProps) => {
  if (status === "pending") {
    return (
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-primary text-primary-foreground rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">Application Submitted</h2>
          <p className="text-primary-foreground/90 mt-1">Your application is pending Captain verification</p>
        </div>

        {/* Content */}
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2">Pending KYC Verification</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your application has been submitted successfully. A BharatAbhiyan Captain will visit your registered address within 2-3 business days for in-person verification.
          </p>
        </div>

        {/* Application Details */}
        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Application ID</span>
            <span className="font-semibold text-foreground">BA-PRV-2024-00156</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Submitted On</span>
            <span className="font-semibold text-foreground">15 Jan 2024, 2:30 PM</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold text-amber-600">Pending Verification</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Expected Visit</span>
            <span className="font-semibold text-foreground">Within 3 business days</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            Contact Support
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            View Application
          </Button>
        </div>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="space-y-6">
        {/* Header Banner */}
        <div className="bg-destructive text-destructive-foreground rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">Application Rejected</h2>
          <p className="text-destructive-foreground/90 mt-1">Your application requires attention</p>
        </div>

        {/* Content */}
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2">Verification Unsuccessful</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Unfortunately, your application could not be verified. Please review the reason below and resubmit with the correct information.
          </p>
        </div>

        {/* Rejection Reason */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground">Reason for Rejection</h4>
            <p className="text-muted-foreground text-sm mt-1">
              Address proof document was not clearly readable. The document appears to be blurred and the address does not match the business address provided.
            </p>
          </div>
        </div>

        {/* Application Details */}
        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Application ID</span>
            <span className="font-semibold text-foreground">BA-PRV-2024-00156</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Verified By</span>
            <span className="font-semibold text-foreground">Captain Mohan (CAP-042)</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Verification Date</span>
            <span className="font-semibold text-foreground">17 Jan 2024</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold text-destructive">Rejected</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onResubmit} className="gap-2">
            <FileText className="w-4 h-4" />
            Resubmit Application
          </Button>
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            Contact Support
          </Button>
        </div>
      </div>
    );
  }

  // Verified status
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-green-600 text-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎉</span>
          <h2 className="text-xl sm:text-2xl font-bold">Verification Successful!</h2>
        </div>
        <p className="text-white/90 mt-1">Your KYC has been approved. Select a plan to activate your listing.</p>
      </div>

      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-foreground">Congratulations! You're almost there.</h4>
          <p className="text-muted-foreground text-sm mt-1">
            Your identity and business have been verified by Captain Mohan (CAP-042). Select a subscription plan below to make your listing visible to customers.
          </p>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Application ID</span>
          <span className="font-semibold text-foreground">BA-PRV-2024-00156</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Verified By</span>
          <span className="font-semibold text-foreground">Captain Mohan (CAP-042)</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-border">
          <span className="text-muted-foreground">Verification Date</span>
          <span className="font-semibold text-foreground">17 Jan 2024, 11:30 AM</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">Status</span>
          <span className="font-semibold text-green-600 flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Verified
          </span>
        </div>
      </div>

      {/* Continue Button */}
      <Button onClick={onContinue} className="w-full">
        Continue to Select Plan →
      </Button>
    </div>
  );
};

export default CaptainVerificationStep;
