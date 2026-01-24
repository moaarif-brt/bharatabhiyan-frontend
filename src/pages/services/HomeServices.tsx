import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Wrench, Zap, Paintbrush, Hammer, Wind, Droplets, Home } from "lucide-react";

const HomeServices = () => {
  const services = [
    { icon: Wrench, title: "Plumbing", description: "Pipe repairs, leakage fixing, bathroom fittings, and water tank services." },
    { icon: Zap, title: "Electrical", description: "Wiring, repairs, fan installation, switch boards, and electrical safety." },
    { icon: Paintbrush, title: "Painting", description: "Interior & exterior painting, wall textures, and waterproofing." },
    { icon: Hammer, title: "Carpentry", description: "Furniture repair, door/window fitting, and custom woodwork." },
    { icon: Wind, title: "AC Repair", description: "AC installation, servicing, gas refilling, and maintenance." },
    { icon: Droplets, title: "Cleaning", description: "Deep cleaning, sofa cleaning, kitchen cleaning, and pest control." },
  ];

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
              <h1 className="text-3xl font-bold text-foreground">Home Services</h1>
              <p className="text-muted-foreground">Find verified professionals for all your home needs</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {services.map((service) => (
              <div key={service.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <Link 
                  to={`/services/home/${service.title.toLowerCase().replace(" ", "-")}`} 
                  className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
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

export default HomeServices;
