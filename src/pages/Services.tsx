import { Link } from "react-router-dom";
import { 
  Wrench, 
  Zap, 
  Paintbrush, 
  Hammer, 
  Snowflake, 
  Sparkles, 
  Truck, 
  Settings,
  Search,
  Star,
  CheckCircle2,
  Phone,
  MapPin,
  Droplets,
  Home,
  Scissors,
  Camera,
  Car,
  Utensils,
  Baby,
  Dog,
  Laptop,
  Shield
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Services = () => {
  const serviceCategories = [
    {
      title: "Home Services",
      services: [
        { name: "Plumber", icon: Wrench, providers: 48, description: "Pipe repair, installation & maintenance" },
        { name: "Electrician", icon: Zap, providers: 62, description: "Wiring, repairs & electrical work" },
        { name: "Painter", icon: Paintbrush, providers: 35, description: "Interior & exterior painting" },
        { name: "Carpenter", icon: Hammer, providers: 28, description: "Furniture repair & woodwork" },
        { name: "AC Repair", icon: Snowflake, providers: 41, description: "AC service, repair & installation" },
        { name: "Cleaning", icon: Sparkles, providers: 55, description: "Home & office deep cleaning" },
      ]
    },
    {
      title: "Appliance & Electronics",
      services: [
        { name: "Appliance Repair", icon: Settings, providers: 38, description: "Washing machine, fridge & more" },
        { name: "Laptop/PC Repair", icon: Laptop, providers: 22, description: "Computer service & repair" },
        { name: "Water Purifier", icon: Droplets, providers: 18, description: "RO service & installation" },
      ]
    },
    {
      title: "Moving & Logistics",
      services: [
        { name: "Packers & Movers", icon: Truck, providers: 22, description: "Relocation & packing services" },
        { name: "Car Service", icon: Car, providers: 30, description: "Vehicle maintenance & repair" },
      ]
    },
    {
      title: "Personal Services",
      services: [
        { name: "Salon at Home", icon: Scissors, providers: 25, description: "Beauty services at your doorstep" },
        { name: "Photography", icon: Camera, providers: 15, description: "Event & portrait photography" },
        { name: "Catering", icon: Utensils, providers: 20, description: "Food service for events" },
        { name: "Baby Care", icon: Baby, providers: 12, description: "Nanny & childcare services" },
        { name: "Pet Care", icon: Dog, providers: 10, description: "Pet grooming & sitting" },
      ]
    },
    {
      title: "Security & Safety",
      services: [
        { name: "Security Guard", icon: Shield, providers: 15, description: "Security personnel services" },
        { name: "Home Security", icon: Home, providers: 8, description: "CCTV & alarm installation" },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Browse All <span className="text-primary">Services</span>
          </h1>
          <p className="text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Find trusted and verified service providers for all your needs. All providers are Captain KYC verified.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search for a service..." 
                className="pl-10 py-6 bg-background text-foreground"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground py-6 px-8">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {serviceCategories.map((category) => (
            <div key={category.title}>
              <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full"></span>
                {category.title}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => (
                  <Link
                    key={service.name}
                    to="#"
                    className="bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary mb-1">{service.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1 text-primary">
                            <CheckCircle2 className="w-3 h-3" />
                            {service.providers} Providers
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Star className="w-3 h-3 fill-primary text-primary" />
                            4.5+ Rating
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-secondary mb-4">Are you a Service Provider?</h2>
          <p className="text-muted-foreground mb-6">
            Join BharatAbhiyan and connect with thousands of customers in your area. Get verified and grow your business.
          </p>
          <Link to="/service-provider-registration">
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6">
              Become a Provider
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
