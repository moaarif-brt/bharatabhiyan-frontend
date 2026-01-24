import { useState } from "react";
import {
  Clock,
  X,
  CheckCircle,
  Phone,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusStamp from "@/components/ui/StatusStamp";
import { createRegistrationPayment } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext";

type VerificationStatus =
  | "DRAFT"
  | "PENDING_VERIFICATION"
  | "REJECTED"
  | "VERIFIED";

interface CaptainVerificationStepProps {
  profile: {
    application_id?: string | null;
    verification_status: VerificationStatus;
    verified_by?: string | null;
    verification_date?: string | null;
    rejection_reason?: string | null;
    submitted_at?: string | null;
  };
  onContinue?: () => void;
  onResubmit?: () => void;
  onViewApplication?: () => void;
}


/* ---------------- HELPERS ---------------- */

const val = (v?: string | null) => (v ? v : "Not Assigned");

const dateVal = (v?: string | null) =>
  v ? new Date(v).toLocaleString() : "Not Assigned";

/* ---------------- COMPONENT ---------------- */

const CaptainVerificationStep = ({
  profile,
  onContinue,
  onResubmit,
  onViewApplication,
}: CaptainVerificationStepProps) => {

  const { user } = useAuth();
  const [paying, setPaying] = useState(false);

  const handleProceedToPayment = async () => {
    if (!user?.id) return;

    try {
      setPaying(true);
      const res = await createRegistrationPayment(user.id);

      if (res?.payment_url) {
        window.location.href = res.payment_url;
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
    } finally {
      setPaying(false);
    }
  };
  const {
    verification_status,
    application_id,
    verified_by,
    verification_date,
    rejection_reason,
    submitted_at,
  } = profile;

  /* =======================
     DRAFT
  ======================== */
  if (verification_status === "DRAFT") {
    return (
      <div className="relative space-y-6">
        <StatusStamp status="DRAFT" />
        <div className="bg-muted/70 rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Application In Draft
          </h2>
          <p className="text-muted-foreground mt-1">
            Your application has been successfully submitted and is currently awaiting Captain assignment.
            Verification will begin once a Captain is assigned to your application.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Application ID</span>
            <span className="font-semibold">{val(application_id)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold">Draft</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="gap-2"
            onClick={onViewApplication}
          >
            <FileText className="w-4 h-4" />
            View Application
          </Button>


        </div>
      </div>
    );
  }

  /* =======================
     PENDING VERIFICATION
  ======================== */
  if (verification_status === "PENDING_VERIFICATION") {
    return (
      <div className="relative space-y-6">
        <StatusStamp status="PENDING_VERIFICATION" />
        <div className="bg-primary text-primary-foreground rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Application Submitted
          </h2>
          <p className="text-primary-foreground/90 mt-1">
            Your application is pending Captain verification
          </p>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            Pending KYC Verification
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            A BharatAbhiyan Captain will visit your registered address.
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Application ID</span>
            <span className="font-semibold">{val(application_id)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Submitted On</span>
            <span className="font-semibold">{dateVal(submitted_at)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Status</span>
            <span className="font-semibold text-amber-600">
              Pending Verification
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            Contact Support
          </Button>
          <Button
            variant="outline"
            className="gap-2"
            onClick={onViewApplication}
          >
            <FileText className="w-4 h-4" />
            View Application
          </Button>
        </div>
      </div>
    );
  }

  /* =======================
     REJECTED
  ======================== */
  if (verification_status === "REJECTED") {
    return (
      <div className="relative space-y-6">
        <StatusStamp status="REJECTED" />
        <div className="bg-destructive text-destructive-foreground rounded-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            Application Rejected
          </h2>
          <p className="text-destructive-foreground/90 mt-1">
            Your application requires attention
          </p>
        </div>

        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            Verification Unsuccessful
          </h3>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold">Reason for Rejection</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {val(rejection_reason)}
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Application ID</span>
            <span className="font-semibold">{val(application_id)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Verified By</span>
            <span className="font-semibold">{val(verified_by)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Verification Date</span>
            <span className="font-semibold">
              {dateVal(verification_date)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-3">
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

  /* =======================
     VERIFIED
  ======================== */
  return (
    <div className="relative space-y-6">
      <StatusStamp status="VERIFIED" />
      <div className="bg-green-600 text-white rounded-lg p-4 sm:p-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-white" />
          <h2 className="text-xl sm:text-2xl font-bold">
            Verification Successful!
          </h2>
        </div>
        <p className="text-white/90 mt-1">
          Your KYC has been approved. Select a plan to activate your listing.
        </p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <h4 className="font-semibold">
            Congratulations! You're almost there.
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            Your profile has been verified successfully.
          </p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 sm:p-6 space-y-3">
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-muted-foreground">Application ID</span>
          <span className="font-semibold">{val(application_id)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-muted-foreground">Verified By</span>
          <span className="font-semibold">{val(verified_by)}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-muted-foreground">Verification Date</span>
          <span className="font-semibold">
            {dateVal(verification_date)}
          </span>
        </div>
      </div>

      <Button
        onClick={handleProceedToPayment}
        className="w-full"
        disabled={paying}
      >
        {paying ? "Redirecting to Payment..." : "Proceed to Payment"}
      </Button>

    </div>
  );
};

export default CaptainVerificationStep;
