import PageLayout from "@/components/layout/PageLayout";
import { AlertCircle, CheckCircle, RefreshCw, Smartphone } from "lucide-react";

const OTPHelp = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Help", href: "#" },
    { label: "OTP Not Received" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} title="OTP Not Received">
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-secondary">Troubleshooting OTP Issues</h2>
          <p className="text-muted-foreground text-sm mt-1">Follow these steps if you haven't received your OTP.</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border">
            <Smartphone className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Check Network Signal</h3>
              <p className="text-muted-foreground text-sm mt-1">Ensure you have proper network coverage. Move to an area with better signal if needed.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border">
            <RefreshCw className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Wait and Retry</h3>
              <p className="text-muted-foreground text-sm mt-1">OTP may take up to 2 minutes to arrive. Wait for the timer to complete, then click "Resend OTP".</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border">
            <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Verify Phone Number</h3>
              <p className="text-muted-foreground text-sm mt-1">Double-check that you entered the correct phone number with country code.</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg border border-border">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground">Check DND Settings</h3>
              <p className="text-muted-foreground text-sm mt-1">If DND (Do Not Disturb) is enabled, transactional SMS may be blocked. Disable DND or whitelist our sender ID.</p>
            </div>
          </div>
        </div>

        <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
          <h4 className="font-medium text-destructive mb-2">Still not receiving OTP?</h4>
          <p className="text-sm text-muted-foreground">
            Contact our support team at <span className="text-primary font-medium">1800-XXX-XXXX</span> or email us at <span className="text-primary font-medium">help@bharatabhiyan.gov.in</span>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default OTPHelp;
