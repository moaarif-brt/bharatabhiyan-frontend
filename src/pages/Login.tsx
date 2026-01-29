import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, ArrowRight, Info } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import AuthTabs from "@/components/auth/AuthTabs";
import PhoneInput from "@/components/auth/PhoneInput";
import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";
import SocialLogin from "@/components/auth/SocialLogin";
import { useToast } from "@/hooks/use-toast";
import { useLogin } from "@/hooks/useLogin";

const Login = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const { loginByEmail, loginByPhone, loading } = useLogin();
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 📞 Phone login → OTP page
    if (activeTab === "phone") {
      loginByPhone();
      return;
    }

    // 📧 Email login → authenticate directly
    loginByEmail({
      email: formData.email,
      password: formData.password,
      redirectTo
    });
  };

  return (
    <PageLayout
      title="Sign In to Your Account"
      subtitle="Access local services and government schemes in your area"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/" },
        { label: "Sign In" },
      ]}
    >
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6 lg:p-8">
        {/* New to BharatAbhiyan Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-secondary text-sm sm:text-base">New to BharatAbhiyan?</h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Create an account to access verified local service providers and government schemes.
              </p>
              <Link to="/register" className="text-primary font-semibold hover:underline text-sm mt-2 inline-block">
                Register now
              </Link>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Choose Sign In Method</h2>
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          <div className="space-y-5">
            {activeTab === "phone" ? (
              <PhoneInput
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            ) : (
              <>
                <EmailInput
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <PasswordInput
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </>
            )}
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
                {activeTab === "phone" ? "Send OTP" : "Sign In"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <SocialLogin />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </PageLayout>
  );
};

export default Login;
