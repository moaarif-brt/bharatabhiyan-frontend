import { User } from "lucide-react";

const testimonials = [
  {
    quote: "Found an excellent plumber within minutes. The verification badge gave me confidence. Highly recommended platform!",
    name: "Priya Sharma",
    location: "Sector 5, Bhiwadi"
  },
  {
    quote: "As a service provider, this platform has helped me get more customers. The Captain verification process is professional.",
    name: "Mahesh Kumar",
    location: "Electrician, Bhiwadi"
  },
  {
    quote: "Finally a trusted platform to find local services. No more asking neighbors for recommendations!",
    name: "Anita Verma",
    location: "Ashiana Town, Bhiwadi"
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            What Our <span className="text-accent">Users</span> Say
          </h2>
          <p className="text-muted-foreground">
            Real feedback from customers and service providers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card rounded-xl p-6 border border-border">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                <span className="text-primary text-3xl font-serif leading-none">"</span>
                <span className="italic">{testimonial.quote}</span>
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
