import {
  CheckCircle2,
  Shield,
  Star,
  Phone,
  Lock,
} from "lucide-react";

const TrustBadges = () => {
  return (
    <section className="py-4 px-4 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 lg:gap-12">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-accent" />
          <span className="text-muted-foreground text-sm">
            100% <span className="text-accent font-medium">Verified</span> Providers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground text-sm">Captain KYC Verified</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground text-sm">Rated & Reviewed</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-accent" />
          <span className="text-muted-foreground text-sm">
            <span className="text-accent font-medium">Secure</span> Payments
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-secondary" />
          <span className="text-muted-foreground text-sm">24/7 Support</span>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
