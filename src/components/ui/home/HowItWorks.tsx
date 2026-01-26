import { FileText } from "lucide-react";

const steps = [
  { number: 1, title: "Search Service", description: "Tell us what service you need and your location" },
  { number: 2, title: "Compare Providers", description: "View verified providers, ratings, and reviews" },
  { number: 3, title: "Contact & Book", description: "Call or WhatsApp the provider directly" },
  { number: 4, title: "Get Work Done", description: "Provider visits and completes the job" },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            <FileText className="w-4 h-4" /> HOW IT WORKS
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Get Services in <span className="text-accent">4 Easy</span> Steps
          </h2>
          <p className="text-muted-foreground">
            Finding and hiring verified service providers has never been easier
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-secondary flex items-center justify-center text-2xl font-bold text-secondary bg-card shadow-sm">
                {step.number}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
