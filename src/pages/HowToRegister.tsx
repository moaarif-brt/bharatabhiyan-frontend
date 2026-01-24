import PageLayout from "@/components/layout/PageLayout";

const HowToRegister = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Help", href: "#" },
    { label: "How to Register" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} title="How to Register">
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <h2 className="text-xl font-semibold text-secondary">Step-by-Step Registration Guide</h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">1</div>
            <div>
              <h3 className="font-medium text-foreground">Visit the Registration Page</h3>
              <p className="text-muted-foreground text-sm mt-1">Click on "Register Now" from the login page or navigate directly to the registration page.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">2</div>
            <div>
              <h3 className="font-medium text-foreground">Enter Your Details</h3>
              <p className="text-muted-foreground text-sm mt-1">Provide your phone number or email address along with a secure password.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">3</div>
            <div>
              <h3 className="font-medium text-foreground">Accept Terms & Conditions</h3>
              <p className="text-muted-foreground text-sm mt-1">Read and agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">4</div>
            <div>
              <h3 className="font-medium text-foreground">Verify OTP</h3>
              <p className="text-muted-foreground text-sm mt-1">Enter the 6-digit OTP sent to your phone or email to verify your account.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">5</div>
            <div>
              <h3 className="font-medium text-foreground">Complete Payment</h3>
              <p className="text-muted-foreground text-sm mt-1">Pay the one-time registration fee of ₹100 to activate your account.</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-2">📌 Important Notes</h4>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>Ensure your phone number is active to receive OTP</li>
            <li>Use a valid email address for account recovery</li>
            <li>Keep your password secure and don't share it with anyone</li>
          </ul>
        </div>
      </div>
    </PageLayout>
  );
};

export default HowToRegister;
