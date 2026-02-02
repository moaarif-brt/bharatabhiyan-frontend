import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Landmark, FileText, CreditCard, Users, Building2, Scale } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { fetchGovernmentServices } from "@/api/government";
import { Skeleton } from "@/components/ui/skeleton";

const GovernmentServices = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["government-services"],
    queryFn: fetchGovernmentServices,
  });

  const services = response?.data || [];

  const getIcon = (name: string) => {
    const normalized = name.toUpperCase();
    if (normalized.includes("DOCUMENT")) return FileText;
    if (normalized.includes("FINANCIAL")) return CreditCard;
    if (normalized.includes("HOUSING")) return Building2;
    if (normalized.includes("LEGAL")) return Scale;
    if (normalized.includes("EDUCATION")) return FileText; // Or GraduationCap if available
    if (normalized.includes("HEALTH")) return Users; // Or Heart/Activity
    if (normalized.includes("EMPLOYMENT") || normalized.includes("BUSINESS")) return Users;
    if (normalized.includes("TRANSPORT")) return Building2; // Or Bus/Car
    return Landmark;
  };

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

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {services.map((service) => {
                const Icon = getIcon(service.name);
                return (
                  <div key={service.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-2">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                    <Link to={`/services/government/${service.id}`} className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 text-sm transition-colors">
                      Find Services <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default GovernmentServices;
