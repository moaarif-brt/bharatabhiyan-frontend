import { Link } from "react-router-dom";
import { ArrowDown } from "lucide-react";

const quickLinks = [
  "Find a verified plumber nearby",
  "Access government schemes",
  "Register as a service provider",
  "File a service complaint"
];

const QuickLinks = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
          How do <span className="text-accent">I</span> ...
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to="#"
              className="flex items-center gap-3 p-4 border-l-4 border-primary text-secondary hover:text-primary transition-colors group"
            >
              <span className="font-medium">{link}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="#services"
            className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 transition-colors"
          >
            Jump to all topics and services <ArrowDown className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
