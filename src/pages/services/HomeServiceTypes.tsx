import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const HomeServiceTypes = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServiceTypes = async () => {
      try {
        const res = await api.get(`/services/?categories=${categoryId}`);
        setServiceTypes(res.data.data.service_types || []);
      } catch (err) {
        console.error("Failed to load service types", err);
      } finally {
        setLoading(false);
      }
    };

    loadServiceTypes();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Select a Service
              </h1>
              <p className="text-muted-foreground">
                Choose the exact service you need
              </p>
            </div>
          </div>

          {/* GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!loading &&
              serviceTypes.map((st) => (
                <div
                  key={st.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {st.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    Verified professionals available for this service.
                  </p>

                  <Link
                    to={`/services/home/category/${categoryId}/service/${st.id}`}
                    className="inline-flex items-center gap-1 text-primary font-medium text-sm"
                  >
                    Find Providers <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeServiceTypes;
