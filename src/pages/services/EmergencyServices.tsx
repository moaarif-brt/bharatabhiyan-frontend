import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, AlertTriangle, Ambulance, Flame, Shield, HeartPulse, Car } from "lucide-react";

const EmergencyServices = () => {
  const services = [
    { icon: Phone, title: "Emergency Helpline", description: "Dial 112 for all emergencies - police, fire, ambulance.", number: "112", isMain: true },
    { icon: Shield, title: "Police", description: "Report crimes, file FIR, and get police assistance.", number: "100" },
    { icon: Ambulance, title: "Ambulance", description: "Medical emergencies and hospital transport services.", number: "108" },
    { icon: Flame, title: "Fire Brigade", description: "Fire emergencies and rescue operations.", number: "101" },
    { icon: HeartPulse, title: "Medical Emergency", description: "Nearby hospitals, blood banks, and medical help.", number: "102" },
    { icon: Car, title: "Road Accident", description: "Highway patrol and accident assistance.", number: "1073" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Emergency Services</h1>
              <p className="text-muted-foreground">Quick access to all emergency helplines</p>
            </div>
          </div>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mt-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-destructive flex items-center justify-center">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-destructive">Dial 112</h2>
                <p className="text-muted-foreground">Single emergency number for Police, Fire & Ambulance</p>
              </div>
              <a href="tel:112" className="ml-auto">
                <Button className="bg-destructive hover:bg-destructive/90 text-white px-8">
                  <Phone className="w-5 h-5 mr-2" /> Call Now
                </Button>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.filter(s => !s.isMain).map((service) => (
              <div key={service.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-destructive" />
                  </div>
                  <span className="text-2xl font-bold text-destructive">{service.number}</span>
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <a href={`tel:${service.number}`}>
                  <Button variant="outline" className="w-full border-destructive text-destructive hover:bg-destructive/10">
                    <Phone className="w-4 h-4 mr-2" /> Call {service.number}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmergencyServices;
