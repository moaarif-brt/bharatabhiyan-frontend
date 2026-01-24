import { CreditCard, Building, Smartphone, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PaymentStepProps {
  selectedPlan: string;
  onComplete: () => void;
  onBack: () => void;
}

const PaymentStep = ({ selectedPlan, onComplete, onBack }: PaymentStepProps) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const planDetails = {
    monthly: { name: "Monthly Subscription Plan", price: 199 },
    yearly: { name: "Yearly Subscription Plan", price: 1499 },
  };

  const plan = planDetails[selectedPlan as keyof typeof planDetails] || planDetails.yearly;
  const gst = Math.round(plan.price * 0.18);
  const total = plan.price + gst;

  const paymentMethods = [
    {
      id: "upi",
      name: "UPI",
      description: "Google Pay, PhonePe, Paytm, BHIM UPI",
      icon: Smartphone,
    },
    {
      id: "card",
      name: "Credit / Debit Card",
      description: "Visa, Mastercard, RuPay",
      icon: CreditCard,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      description: "All major Indian banks supported",
      icon: Building,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold">Complete Payment</h2>
        <p className="text-primary-foreground/90 mt-1">Pay to activate your service listing</p>
      </div>

      {/* Order Summary */}
      <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
        <h3 className="font-semibold text-foreground uppercase text-sm mb-4">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">{plan.name}</span>
            <span className="font-medium text-foreground">₹{plan.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">GST (18%)</span>
            <span className="font-medium text-foreground">₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-semibold text-foreground">Total Amount</span>
            <span className="font-bold text-primary text-lg">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Select Payment Method</h3>
        <div className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {paymentMethod === method.id && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{method.name}</h4>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pay Button */}
      <Button onClick={onComplete} className="w-full" size="lg">
        Pay ₹{total.toLocaleString()} →
      </Button>

      {/* Security Note */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Lock className="w-4 h-4" />
        <span>Secure payment powered by Razorpay | PCI DSS Compliant</span>
      </div>

      {/* Back Button */}
      <Button variant="outline" onClick={onBack} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Plans
      </Button>
    </div>
  );
};

export default PaymentStep;
