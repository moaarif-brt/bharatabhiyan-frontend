import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle, AlertTriangle } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import OTPInput from "@/components/auth/OTPInput";
import { useToast } from "@/hooks/use-toast";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Verified Successfully!",
      description: "Proceeding to payment...",
    });

    setIsLoading(false);
    navigate("/payment");
  };

  const handleResend = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(30);

    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your device.",
    });
  };

  return (
    <PageLayout
      title="Verify Your Phone Number"
      subtitle="Enter the 6-digit code sent to your mobile"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/" },
        { label: "Verify Phone" },
      ]}
    >
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 lg:p-8">
        {/* Back Link */}
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-primary hover:underline text-sm mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>

        {/* OTP Sent Success Banner */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-800 text-sm sm:text-base">OTP Sent Successfully</h3>
              <p className="text-green-700 text-xs sm:text-sm mt-1">
                A 6-digit verification code has been sent to your registered mobile number.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground text-sm">Enter the code sent to</p>
            <p className="text-foreground font-semibold text-base sm:text-lg">+91 98765 43210</p>
          </div>

          <OTPInput value={otp} onChange={setOtp} />

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Verify & Continue
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Didn't receive the code?{" "}
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-primary hover:underline"
            >
              Resend OTP
            </button>
          ) : (
            <span>
              <span className="text-primary font-semibold">Resend OTP</span>
              {" "}in {String(Math.floor(resendTimer / 60)).padStart(2, '0')}:{String(resendTimer % 60).padStart(2, '0')}
            </span>
          )}
        </p>

        {/* Security Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 text-sm">Security Notice</h3>
              <p className="text-amber-700 text-xs sm:text-sm mt-1">
                Never share your OTP with anyone. BharatAbhiyan representatives will never ask for your OTP.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default VerifyOTP;
