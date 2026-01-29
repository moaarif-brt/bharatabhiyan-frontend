import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import {
  fetchServiceTypes,
  fetchServiceAreas,
} from "@/api/provider";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Button } from "@/components/ui/button";

const HeroSection = ({ user }: { user: any }) => {
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // ✅ CONTROLLED STATES (MULTI-SELECT)
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const navigate = useNavigate();

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    const loadData = async () => {
      try {
        const [typeRes, areaRes] = await Promise.all([
          fetchServiceTypes(),
          fetchServiceAreas("1"), // Bhiwadi fixed
        ]);

        setServiceTypes(typeRes.data.data || []);
        setLocations(areaRes.data.data || []);
      } catch (err) {
        console.error("Hero search load failed", err);
      }
    };

    loadData();
  }, []);

  /* ---------- SEARCH (SINGLE API FLOW) ---------- */
  const handleSearch = () => {
    let query = "";
    if (selectedServiceTypes.length > 0) query += `service_types=${selectedServiceTypes.join(",")}`;
    if (selectedAreas.length > 0) {
      if (query) query += "&";
      query += `service_areas=${selectedAreas.join(",")}`;
    }

    navigate(`/services/home/search?${query}${query ? "&" : ""}page=1`);
  };

  return (
    <section className="relative text-secondary-foreground py-16 lg:py-20 px-4 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-secondary/60" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/90 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Now Live in Bhiwadi, Rajasthan
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Find <span className="text-accent">Trusted</span>{" "}
              <span className="text-primary">Local Services</span> Near You
            </h1>

            <p className="text-lg text-secondary-foreground/80 max-w-xl">
              Connect with verified service providers in your area. From plumbers
              to electricians, painters to carpenters — all verified through our
              Captain KYC process.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-6 text-lg rounded-lg">
                Find Services <ArrowRight className="ml-2 w-5 h-5" />
              </Button>

              {user && (
                <Link to="/service-provider-registration">
                  <Button
                    variant="outline"
                    className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 px-8 py-6 text-lg rounded-lg"
                  >
                    {user?.is_provider ? "Profile" : "Become a Provider"}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Search Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl relative">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Find Professionals</h3>
                <p className="text-sm text-white/60">Select services and your area</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Service Types (Multi) */}
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">
                  What service do you need?
                </label>
                <MultiSelect
                  options={serviceTypes.map((s) => ({ label: s.name, value: String(s.id) }))}
                  selected={selectedServiceTypes}
                  onChange={setSelectedServiceTypes}
                  placeholder="e.g. Plumber, Electrician..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              {/* Locations (Multi) */}
              <div>
                <label className="text-sm font-medium text-white/80 mb-2 block">
                  Your Area
                </label>
                <MultiSelect
                  options={locations.map((l) => ({ label: l.name, value: String(l.id) }))}
                  selected={selectedAreas}
                  onChange={setSelectedAreas}
                  placeholder="Which areas should we search?"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                />
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-7 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all transform hover:scale-[1.02]"
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 mr-2" />
                Search Now
              </Button>

              <p className="text-center text-xs text-white/40 mt-4">
                Trust BharatAbhiyan for verified & reliable services
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
