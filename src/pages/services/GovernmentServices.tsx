import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, FileText, CreditCard, Users, Building2, Scale } from "lucide-react";

const GovernmentServices = () => {
  const services = [
    { icon: FileText, title: "Document Services", description: "Aadhaar, PAN card, passport, and other document applications." },
    { icon: CreditCard, title: "Financial Schemes", description: "PM Jan Dhan, PM Mudra, and other financial assistance programs." },
    { icon: Users, title: "Social Welfare", description: "Pension schemes, widow assistance, and disability benefits." },
    { icon: Building2, title: "Housing Schemes", description: "PM Awas Yojana and other housing assistance programs." },
    { icon: Scale, title: "Legal Services", description: "Free legal aid, RTI filing, and consumer grievance redressal." },
    { icon: Landmark, title: "Other Services", description: "Birth/death certificates, caste certificates, and more." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Government Services</h1>
              <p className="text-muted-foreground">Access government schemes and services easily</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((service) => (
              <div key={service.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <Link to="#" className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 text-sm transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GovernmentServices;
