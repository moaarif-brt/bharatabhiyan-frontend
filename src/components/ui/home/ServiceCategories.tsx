import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Home,
  Heart,
  GraduationCap,
  Briefcase,
  Building2,
  Factory,
  AlertTriangle,
} from "lucide-react";

const serviceCategories = [
  { icon: Home, title: "Home Services", description: "Find plumbers, electricians, carpenters, painters, and other home repair professionals.", href: "/services/home" },
  { icon: Heart, title: "Health & Wellness", description: "Connect with doctors, clinics, hospitals, and healthcare services. Get health information.", isDisabled: true },
  { icon: GraduationCap, title: "Education", description: "Find schools, colleges, coaching classes. Access scholarships and education programs.", isDisabled: true },
  { icon: Briefcase, title: "Jobs & Employment", description: "Find job opportunities, skill development programs, and employment services.", isDisabled: true },
  { icon: Building2, title: "Housing & Real Estate", description: "Find properties for rent or sale, housing schemes, and real estate services.", isDisabled: true },
  { icon: Factory, title: "Industry & Business", description: "B2B services, suppliers, manufacturers, and business support services.", isDisabled: true },
  { icon: Building2, title: "Government Services", description: "Access government schemes, tenders, notices, and apply for various programs.", href: "/services/government" },
  { icon: AlertTriangle, title: "Emergency Services", description: "Quick access to police, ambulance, fire, and other emergency services. Dial 112.", isEmergency: true, href: "/services/emergency" },
];

const ServiceCategories = () => {
  return (
    <section id="services" className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-secondary inline-flex items-center gap-2">
            All topics and services
          </h2>
          <div className="w-12 h-1 bg-primary mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((category, index) => {
            const isLink = !!category.href;
            const CardWrapper = isLink ? Link : "div";

            return (
              <CardWrapper
                key={index}
                to={category.href || "#"}
                className={`bg-card rounded-xl p-6 border transition-all duration-200 group block relative ${category.isDisabled ? "opacity-60 grayscale cursor-not-allowed" : "hover:shadow-lg cursor-pointer"
                  } ${category.isEmergency
                    ? "border-destructive/50 hover:border-destructive"
                    : "border-border hover:border-primary/30"
                  }`}
              >
                {category.isDisabled && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">Coming Soon</span>
                )}
                <div className="text-4xl mb-4 pb-4 border-b border-border">
                  <category.icon
                    className={`w-8 h-8 ${category.isEmergency ? "text-destructive" : "text-primary"
                      }`}
                  />
                </div>
                <h3
                  className={`font-semibold text-lg mb-2 ${category.isEmergency ? "text-destructive" : "text-foreground"
                    }`}
                >
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div
                  className={`font-medium text-sm inline-flex items-center gap-1 ${category.isEmergency
                    ? "text-destructive"
                    : "text-secondary hover:text-primary"
                    } transition-colors ${category.isDisabled ? "opacity-50" : ""}`}
                >
                  {category.isDisabled ? "Coming Soon" : (category.isEmergency ? "Get help now" : "Learn more")}{" "}
                  {!category.isDisabled && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services/all"
            className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 transition-colors"
          >
            View all 50+ service categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
