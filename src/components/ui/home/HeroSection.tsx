import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, ArrowRight, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  fetchServiceTypes,
  fetchServiceAreas,
} from "@/api/provider";

const HeroSection = ({ user }: { user: any }) => {
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);

  // ✅ CONTROLLED STATES
  const [selectedServiceType, setSelectedServiceType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

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
    if (!selectedServiceType || !selectedLocation) return;

    navigate(
      `/services/home/${selectedServiceType}?area=${selectedLocation}`
    );
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
                    Become a Provider
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right Search Card */}
          <div className="bg-card rounded-xl p-6 shadow-xl border border-border">
            <div className="flex items-center gap-2 mb-6">
              <Search className="w-5 h-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-card-foreground">
                What service do you need?
              </h3>
            </div>

            <div className="space-y-4">
              {/* Service Type */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Service Type
                </label>
                <Select
                  value={selectedServiceType}
                  onValueChange={(val) => {
                    setSelectedServiceType(val);
                    setSelectedLocation("");
                  }}
                >
                  <SelectTrigger className="w-full h-12 rounded-lg text-foreground [&_[data-placeholder]]:text-muted-foreground">
                    <SelectValue placeholder="Select a service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((st) => (
                      <SelectItem key={st.id} value={String(st.id)}>
                        {st.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Your Location
                </label>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                  disabled={!selectedServiceType}
                >
                  <SelectTrigger className="w-full h-12 rounded-lg text-foreground [&_[data-placeholder]]:text-muted-foreground">
                    <SelectValue placeholder="Select your area" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.id} value={String(loc.id)}>
                        {loc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-6 text-base font-semibold rounded-lg"
                disabled={!selectedServiceType || !selectedLocation}
                onClick={handleSearch}
              >
                <Search className="w-5 h-5 mr-2" />
                Search Providers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
