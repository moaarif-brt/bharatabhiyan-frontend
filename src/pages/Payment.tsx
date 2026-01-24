import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ArrowLeft, Lock, Info } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import PaymentOption from "@/components/auth/PaymentOption";
import { useToast } from "@/hooks/use-toast";

const paymentMethods = [
  {
    id: "upi",
    icon: "📱",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm, BHIM UPI",
  },
  {
    id: "card",
    icon: "💳",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, RuPay",
  },
  {
    id: "netbanking",
    icon: "🏦",
    label: "Net Banking",
    description: "All major Indian banks supported",
  },
];

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Payment Successful! 🎉",
      description: "Your account has been activated successfully.",
    });

    setIsLoading(false);
    navigate("/");
  };

  return (
    <PageLayout
      title="Complete Registration"
      subtitle="Pay the registration fee to activate your account"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "#" },
        { label: "Payment" },
      ]}
    >
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to registration
        </Link>

        {/* Payment Summary */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-4">
            Payment Summary
          </h2>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Registration Fee</span>
              <span className="text-foreground">₹100.00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">GST (18%)</span>
              <span className="text-foreground">₹18.00</span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-secondary">Total Amount</span>
                <span className="text-lg font-bold text-primary">₹118.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <form onSubmit={handlePayment} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-secondary">
              Select Payment Method
            </h2>
            {paymentMethods.map((method) => (
              <PaymentOption
                key={method.id}
                icon={method.icon}
                label={method.label}
                description={method.description}
                selected={selectedMethod === method.id}
                onSelect={() => setSelectedMethod(method.id)}
              />
            ))}
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-lg text-base font-semibold text-primary-foreground bg-secondary hover:bg-secondary/90 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Pay ₹118.00
                <span>→</span>
              </>
            )}
          </button>
        </form>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4" />
          <span>Secure payment powered by Razorpay | PCI DSS Compliant</span>
        </div>

        {/* Refund Policy */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-secondary">Refund Policy</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Registration fee is non-refundable. For any payment issues, contact our helpdesk at 1800-XXX-XXXX.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Payment;
