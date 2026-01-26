import { Link } from "react-router-dom";
import { Home, Zap, Wheat, ArrowRight, Building2 } from "lucide-react";

const schemes = [
  {
    icon: Home,
    title: "PM Awas Yojana",
    description: "Affordable housing scheme for economically weaker sections with subsidy benefits up to ₹2.67 lakh.",
  },
  {
    icon: Zap,
    title: "PM SVANidhi",
    description: "Micro-credit facility for street vendors with loans up to ₹50,000 at subsidized interest rates.",
  },
  {
    icon: Wheat,
    title: "PM Kisan Samman",
    description: "Income support of ₹6,000 per year for farmer families in three equal installments.",
  },
];

const GovernmentSchemes = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" /> GOVERNMENT SCHEMES
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Access <span className="text-accent">Government</span> Benefits
          </h2>
          <p className="text-muted-foreground">
            Discover and apply for government schemes and services through our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.title}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <scheme.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {scheme.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {scheme.description}
              </p>
              <Link
                to="#"
                className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
              >
                Learn More & Apply <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="#"
            className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 transition-colors"
          >
            Explore All Government Schemes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GovernmentSchemes;
