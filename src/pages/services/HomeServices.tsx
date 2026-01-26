import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

import { fetchServiceCategories } from "@/api/provider";
import { categoryIconMap } from "@/utils/categoryIcons";

const HomeServices = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- LOAD CATEGORIES ---------- */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchServiceCategories();
        setServices(res.data.data || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Home Services
              </h1>
              <p className="text-muted-foreground">
                Find verified professionals for all your home needs
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {!loading &&
              services.map((service) => {
                const Icon =
                  categoryIconMap[service.icon] || categoryIconMap.Wrench;

                return (
                  <div
                    key={service.id}
                    className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>

                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {service.name}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description ||
                        "Verified professionals available for this service."}
                    </p>

                    <Link
                      to={`/services/home/category/${service.id}`}
                      className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
                    >
                      View Services <ArrowRight className="w-4 h-4" />
                    </Link>

                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeServices;
