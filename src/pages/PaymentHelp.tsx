import PageLayout from "@/components/layout/PageLayout";
import { CreditCard, RefreshCw, Shield, AlertTriangle } from "lucide-react";

const PaymentHelp = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Help", href: "#" },
    { label: "Payment Issues" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} title="Payment Issues">
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-secondary">Payment Troubleshooting</h2>
          <p className="text-muted-foreground text-sm mt-1">Common payment issues and how to resolve them.</p>
        </div>

        <div className="space-y-4">
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-foreground">Payment Failed</h3>
            </div>
            <div className="p-4 text-sm text-muted-foreground space-y-2">
              <p>If your payment failed, please check:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Sufficient balance in your account</li>
                <li>Card/UPI details are correct</li>
                <li>Internet connection is stable</li>
                <li>Transaction limits are not exceeded</li>
              </ul>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-foreground">Amount Deducted but Registration Not Complete</h3>
            </div>
            <div className="p-4 text-sm text-muted-foreground space-y-2">
              <p>If money was deducted but registration shows incomplete:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Wait for 30 minutes - status updates automatically</li>
                <li>Check your email for payment confirmation</li>
                <li>If issue persists, contact support with transaction ID</li>
              </ul>
            </div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-foreground">Refund Policy</h3>
            </div>
            <div className="p-4 text-sm text-muted-foreground space-y-2">
              <p>Our refund policy:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Failed transactions are auto-refunded within 5-7 business days</li>
                <li>For duplicate payments, contact support for refund</li>
                <li>Registration fee is non-refundable once account is activated</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-warning/10 rounded-lg p-4 border border-warning/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Important</h4>
              <p className="text-sm text-muted-foreground">
                Never share your OTP, card details, or UPI PIN with anyone claiming to be from our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentHelp;
