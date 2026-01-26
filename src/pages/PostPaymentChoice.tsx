import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Sparkles,
  CheckCircle,
  Rocket,
  Home,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PostPaymentWelcome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [params] = useSearchParams();


  return (
    <PageLayout
      title="Welcome to BharatAbhiyan"
      subtitle="Your journey as a verified service provider begins now"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Welcome" },
      ]}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-12">

        {/* Floating Gradient Orbs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-pulse" />

        {/* Success Icon */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-6">

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-ping" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl">
              <CheckCircle className="h-10 w-10" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Payment Successful
          </h1>

          <p className="max-w-2xl text-muted-foreground text-base sm:text-lg">
            You’re officially onboarded as a{" "}
            <span className="text-primary font-semibold">
              Verified Service Provider
            </span>{" "}
            on BharatAbhiyan.
          </p>

          {/* Status Badges */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Captain KYC Verified
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Trusted Provider
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-background px-4 py-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Ready to Receive Leads
            </div>
          </div>

          {/* Journey Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 w-full max-w-4xl">
            {[
              {
                icon: Rocket,
                title: "You’re Live",
                desc: "Your profile is now visible to customers in your area.",
              },
              {
                icon: Sparkles,
                title: "Get Leads",
                desc: "Customers can call or WhatsApp you directly.",
              },
              {
                icon: Home,
                title: "Grow Faster",
                desc: "Build trust, earn reviews, and scale your business.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative rounded-xl border bg-background p-6
                          flex flex-col items-center text-center
                          transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                  <step.icon className="h-6 w-6 block shrink-0 leading-none" />
                </div>

                <h3 className="font-semibold text-foreground mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-12">
            <Button
              size="lg"
              onClick={() => navigate("/")}
              className="group relative overflow-hidden bg-primary px-10 py-6 text-lg font-semibold"
            >
              <span className="relative z-10 flex items-center gap-2">
                Go to Home
                <Home className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-primary/80 transition-transform group-hover:translate-x-0" />
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              You can start receiving customer requests immediately.
            </p>
          </div>

        </div>
      </div>
    </PageLayout>
  );
};

export default PostPaymentWelcome;
