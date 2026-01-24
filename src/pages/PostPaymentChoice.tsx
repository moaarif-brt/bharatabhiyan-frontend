import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User, Briefcase } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

const PostPaymentChoice = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();

  useEffect(() => {
    const access = params.get("access_token");
    const refresh = params.get("refresh_token");
    const userId = sessionStorage.getItem("user_id");
    const userEmail = sessionStorage.getItem("user_email");

    // If coming from payment gateway
    if (access && refresh) {
      sessionStorage.setItem("access", access);
      sessionStorage.setItem("refresh", refresh);
      window.history.replaceState({}, "", "/dashboard");
      return;
    }

    // If coming from registration without payment
    if (userId || userEmail) {
      // User has completed registration, allow them to choose role
      return;
    }

    // No valid session
    toast({
      title: "Session Error",
      description: "Please complete registration or login first.",
      variant: "destructive",
    });
    navigate("/login");
  }, []);

  return (
    <PageLayout
      title="Choose Your Role"
      subtitle="What would you like to do next?"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Welcome" },
      ]}
    >
      <div className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-8">

        <p className="text-center text-muted-foreground">
          Your account has been created successfully!  
          Choose your role to get started.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 🟢 Consumer Card */}
          <div
            onClick={() => navigate("/login")}
            className="cursor-pointer rounded-xl border border-border bg-background p-6 transition-all
                       hover:shadow-lg hover:border-primary group"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  Become a Consumer
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Find and book verified local service providers near you.
                </p>
              </div>
            </div>
          </div>

          {/* 🔵 Service Provider Card */}
          <div
            onClick={() => navigate("/service-provider-registration")}
            className="cursor-pointer rounded-xl border border-border bg-background p-6 transition-all
                       hover:shadow-lg hover:border-primary group"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary">
                  Become a Service Provider
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  List your services, get customers, and grow your business.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default PostPaymentChoice;
