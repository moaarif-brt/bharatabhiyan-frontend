import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone } from "lucide-react";

const ForgotPassword = () => {
  const [method, setMethod] = useState<"phone" | "email">("phone");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Help", href: "#" },
    { label: "Forgot Password" },
  ];

  return (
    <PageLayout breadcrumbs={breadcrumbs} title="Forgot Password">
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-secondary">Reset Your Password</h2>
          <p className="text-muted-foreground text-sm mt-1">Enter your registered phone number or email to receive a password reset link.</p>
        </div>

        {/* Method Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-xl w-fit">
          <button
            onClick={() => setMethod("phone")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              method === "phone"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Phone className="w-4 h-4" />
            Phone
          </button>
          <button
            onClick={() => setMethod("email")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              method === "email"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="w-4 h-4" />
            Email
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 max-w-md">
          {method === "phone" ? (
            <div className="space-y-2">
              <Label htmlFor="phone">Registered Phone Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-xl text-sm text-muted-foreground">
                  +91
                </span>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="rounded-l-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="email">Registered Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
              />
            </div>
          )}

          <Button className="w-full">
            Send Reset Link →
          </Button>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-2">📌 Note</h4>
          <p className="text-sm text-muted-foreground">
            If you don't receive the reset link within 5 minutes, please check your spam folder or try again.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ForgotPassword;
