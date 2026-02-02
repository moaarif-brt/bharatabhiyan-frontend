import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, ArrowRight, Check } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import PhoneInput from "@/components/auth/PhoneInput";
import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { useToast } from "@/hooks/use-toast";
import { useRegister } from "@/hooks/useRegister";

const Register = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/dashboard";

  const { registerByEmail, registerByPhone, loading } = useRegister(); // ✅ hook
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [certifyInfo, setCertifyInfo] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    phone?: string;
    email?: string;
    password?: string;
  }>({});
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    const errors: typeof fieldErrors = {};

    if (!formData.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (activeTab === "phone") {
      if (!formData.phone.trim()) {
        errors.phone = "Phone number is required";
      } else if (formData.phone.replace(/\D/g, "").length < 10) {
        errors.phone = "Enter a valid phone number";
      }
    } else {
      if (!formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Enter a valid email address";
      }

      if (!formData.password.trim()) {
        errors.password = "Password is required";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fieldValidationErrors = validateFields();

    if (!agreedToTerms || !certifyInfo) {
      setShowValidationErrors(true);
      toast({
        title: "Consent Required",
        description: "Please accept all declarations to continue.",
        variant: "destructive",
      });
      return;
    }

    if (Object.keys(fieldValidationErrors).length > 0) {
      setFieldErrors(fieldValidationErrors);
      toast({
        title: "Please fill all required fields",
        description: "Check the form for errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setShowValidationErrors(false);
    setFieldErrors({});

    // 📞 Phone registration → OTP page
    if (activeTab === "phone") {
      registerByPhone();
      return;
    }

    // 📧 Email registration → payment
    registerByEmail({
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      redirectTo
    });
  };

  return (
    <PageLayout
      title="Create Provider Account"
      subtitle="Register your business to start getting customers"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/" },
        { label: "Provider Registration" },
      ]}
    >
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* UI untouched */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Personal Information
            </h2>
            <div>
              <input
                type="text"
                className={`input-field border-2 transition-all ${fieldErrors.fullName
                  ? "border-red-500 bg-red-50 dark:bg-red-950/20 focus:border-red-500"
                  : "border-border"
                  }`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (fieldErrors.fullName) {
                    setFieldErrors({ ...fieldErrors, fullName: undefined });
                  }
                }}
              />
              {fieldErrors.fullName && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
                  <span className="font-semibold">✕</span> {fieldErrors.fullName}
                </p>
              )}
            </div>
          </div>

          <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="space-y-4">
            {activeTab === "phone" ? (
              <PhoneInput
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (fieldErrors.phone) {
                    setFieldErrors({ ...fieldErrors, phone: undefined });
                  }
                }}
                error={fieldErrors.phone}
                helperText="We'll send an OTP to verify your number"
              />
            ) : (
              <>
                <EmailInput
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (fieldErrors.email) {
                      setFieldErrors({ ...fieldErrors, email: undefined });
                    }
                  }}
                  error={fieldErrors.email}
                />
                <PasswordInput
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    if (fieldErrors.password) {
                      setFieldErrors({ ...fieldErrors, password: undefined });
                    }
                  }}
                  error={fieldErrors.password}
                />
              </>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Terms & Conditions
            </h2>

            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg border-2 transition-all ${showValidationErrors && !agreedToTerms
                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                  : "border-border bg-background"
                  }`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${agreedToTerms
                      ? "bg-primary border-primary"
                      : showValidationErrors && !agreedToTerms
                        ? "border-red-500 bg-background"
                        : "border-input bg-background"
                      }`}
                    onClick={() => {
                      setAgreedToTerms(!agreedToTerms);
                      if (showValidationErrors) setShowValidationErrors(false);
                    }}
                  >
                    {agreedToTerms && (
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                    ,{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    , and consent to the collection of my data as described in the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Data Protection Notice
                    </a>
                    .
                  </span>
                </label>
                {showValidationErrors && !agreedToTerms && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
                    <span className="font-semibold">✕</span> Please accept the terms to continue
                  </p>
                )}
              </div>

              <div
                className={`p-4 rounded-lg border-2 transition-all ${showValidationErrors && !certifyInfo
                  ? "border-red-500 bg-red-50 dark:bg-red-950/20"
                  : "border-border bg-background"
                  }`}
              >
                <label className="flex items-start gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${certifyInfo
                      ? "bg-primary border-primary"
                      : showValidationErrors && !certifyInfo
                        ? "border-red-500 bg-background"
                        : "border-input bg-background"
                      }`}
                    onClick={() => {
                      setCertifyInfo(!certifyInfo);
                      if (showValidationErrors) setShowValidationErrors(false);
                    }}
                  >
                    {certifyInfo && (
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    I certify that the information provided is accurate and I am a resident
                    of India.
                  </span>
                </label>
                {showValidationErrors && !certifyInfo && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2 flex items-center gap-1">
                    <span className="font-semibold">✕</span> Please certify the information to continue
                  </p>
                )}
              </div>
            </div>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default Register;
