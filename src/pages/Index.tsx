import { Link } from "react-router-dom";
import { 
  Search, 
  ArrowRight, 
  ArrowDown,
  CheckCircle2, 
  Shield, 
  Star, 
  Phone, 
  Clock,
  MapPin,
  Briefcase,
  Wrench,
  Zap,
  Paintbrush,
  MessageCircle,
  Home,
  Wheat,
  Heart,
  GraduationCap,
  Building2,
  AlertTriangle,
  Factory,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Lock,
  User,
  FileText
} from "lucide-react";
import logoImage from "@/assets/logo.jpeg";
import heroBg from "@/assets/hero-bg.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";

const Index = () => {
  const quickLinks = [
    "Find a verified plumber nearby",
    "Access government schemes",
    "Register as a service provider",
    "File a service complaint"
  ];

  const serviceCategories = [
    { icon: Home, title: "Home Services", description: "Find plumbers, electricians, carpenters, painters, and other home repair professionals.", color: "text-primary" },
    { icon: Heart, title: "Health & Wellness", description: "Connect with doctors, clinics, hospitals, and healthcare services. Get health information.", color: "text-destructive" },
    { icon: GraduationCap, title: "Education", description: "Find schools, colleges, coaching classes. Access scholarships and education programs.", color: "text-secondary" },
    { icon: Briefcase, title: "Jobs & Employment", description: "Find job opportunities, skill development programs, and employment services.", color: "text-secondary" },
    { icon: Building2, title: "Housing & Real Estate", description: "Find properties for rent or sale, housing schemes, and real estate services.", color: "text-accent" },
    { icon: Factory, title: "Industry & Business", description: "B2B services, suppliers, manufacturers, and business support services.", color: "text-secondary" },
    { icon: Building2, title: "Government Services", description: "Access government schemes, tenders, notices, and apply for various programs.", color: "text-secondary" },
    { icon: AlertTriangle, title: "Emergency Services", description: "Quick access to police, ambulance, fire, and other emergency services. Dial 112.", color: "text-destructive", isEmergency: true },
  ];

  const steps = [
    { number: 1, title: "Search Service", description: "Tell us what service you need and your location" },
    { number: 2, title: "Compare Providers", description: "View verified providers, ratings, and reviews" },
    { number: 3, title: "Contact & Book", description: "Call or WhatsApp the provider directly" },
    { number: 4, title: "Get Work Done", description: "Provider visits and completes the job" },
  ];

  const providers = [
    {
      initials: "RS",
      name: "Ramesh Sharma",
      service: "Plumber - General & Pipeline",
      rating: 4.9,
      reviews: 127,
      location: "Sector 1-20, Bhiwadi",
      experience: "10+ years experience",
      jobs: "500+ jobs completed",
    },
    {
      initials: "AK",
      name: "Anil Kumar",
      service: "Electrician - Wiring & Repair",
      rating: 4.8,
      reviews: 98,
      location: "All Bhiwadi Areas",
      experience: "8+ years experience",
      jobs: "350+ jobs completed",
    },
    {
      initials: "PY",
      name: "Praveen Yadav",
      service: "Painter - Interior & Exterior",
      rating: 4.7,
      reviews: 76,
      location: "Sector 11-30, Ashiana",
      experience: "12+ years experience",
      jobs: "200+ jobs completed",
    },
  ];

  const schemes = [
    {
      icon: Home,
      title: "PM Awas Yojana",
      description: "Affordable housing scheme for economically weaker sections with subsidy benefits up to ₹2.67 lakh.",
    },
    {
      icon: Zap,
      title: "PM SVANidhi",
      description: "Micro-credit facility for street vendors with loans up to ₹50,000 at subsidized interest rates.",
    },
    {
      icon: Wheat,
      title: "PM Kisan Samman",
      description: "Income support of ₹6,000 per year for farmer families in three equal installments.",
    },
  ];

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

  return (
    <div className="min-h-screen bg-background">
      {/* Common Header */}
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative text-secondary-foreground py-16 lg:py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Overlay for better text readability */}
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
                Find <span className="text-accent">Trusted</span> <span className="text-primary">Local Services</span> Near You
              </h1>

              <p className="text-lg text-secondary-foreground/80 max-w-xl">
                Connect with verified service providers in your area. From plumbers to electricians, painters to carpenters — all verified through our Captain KYC process.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-6 text-lg rounded-lg">
                  Find Services <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/service-provider-registration">
                  <Button variant="outline" className="border-secondary-foreground/30 bg-transparent text-secondary-foreground hover:bg-secondary-foreground/10 px-8 py-6 text-lg rounded-lg">
                    Become a Provider
                  </Button>
                </Link>
              </div>

              <div className="flex gap-8 pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-secondary-foreground/70">Verified Providers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">10,000+</p>
                  <p className="text-sm text-secondary-foreground/70">Happy Customers</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-secondary-foreground/70">Service Categories</p>
                </div>
              </div>
            </div>

            {/* Right - Search Card */}
            <div className="bg-card rounded-xl p-6 shadow-xl border border-border">
              <div className="flex items-center gap-2 mb-6">
                <Search className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold text-card-foreground">What service do you need?</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Service Type</label>
                  <Select>
                    <SelectTrigger className="w-full h-12 rounded-lg">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumber">Plumber</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="painter">Painter</SelectItem>
                      <SelectItem value="carpenter">Carpenter</SelectItem>
                      <SelectItem value="ac-repair">AC Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Your Location</label>
                  <Select>
                    <SelectTrigger className="w-full h-12 rounded-lg">
                      <SelectValue placeholder="Select your area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sector-1-10">Sector 1-10</SelectItem>
                      <SelectItem value="sector-11-20">Sector 11-20</SelectItem>
                      <SelectItem value="sector-21-30">Sector 21-30</SelectItem>
                      <SelectItem value="ashiana">Ashiana Town</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-primary hover:bg-primary-dark text-primary-foreground py-6 text-base font-semibold rounded-lg">
                  <Search className="w-5 h-5 mr-2" /> Search Providers
                </Button>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground">Popular:</span>
                  {["Plumber", "Electrician", "AC Repair", "Painter"].map((item) => (
                    <span key={item} className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-4 px-4 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 lg:gap-12">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground text-sm">100% <span className="text-accent font-medium">Verified</span> Providers</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground text-sm">Captain KYC Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            <span className="text-muted-foreground text-sm">Rated & Reviewed</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground text-sm"><span className="text-accent font-medium">Secure</span> Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-secondary" />
            <span className="text-muted-foreground text-sm">24/7 Support</span>
          </div>
        </div>
      </section>

      {/* How do I... Section */}
      <section className="py-12 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">How do <span className="text-accent">I</span> ...</h2>
          
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
            <Link to="#services" className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 transition-colors">
              Jump to all topics and services <ArrowDown className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* All Topics and Services */}
      <section id="services" className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-secondary inline-flex items-center gap-2">
              All topics and services
            </h2>
            <div className="w-12 h-1 bg-primary mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className={`bg-card rounded-xl p-6 border transition-all duration-200 hover:shadow-lg cursor-pointer group ${
                  category.isEmergency 
                    ? 'border-destructive/50 hover:border-destructive' 
                    : 'border-border hover:border-primary/30'
                }`}
              >
              <div className="text-4xl mb-4 pb-4 border-b border-border">
                  <category.icon className={`w-8 h-8 ${category.isEmergency ? 'text-destructive' : 'text-primary'}`} />
                </div>
                <h3 className={`font-semibold text-lg mb-2 ${category.isEmergency ? 'text-destructive' : 'text-foreground'}`}>
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {category.description}
                </p>
                <Link 
                  to="#" 
                  className={`font-medium text-sm inline-flex items-center gap-1 ${
                    category.isEmergency 
                      ? 'text-destructive hover:text-destructive/80' 
                      : 'text-secondary hover:text-primary'
                  } transition-colors`}
                >
                  {category.isEmergency ? 'Get help now' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="#" className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 transition-colors">
              View all 50+ service categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <FileText className="w-4 h-4" /> HOW IT WORKS
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Get Services in <span className="text-accent">4 Easy</span> Steps</h2>
            <p className="text-muted-foreground">Finding and hiring verified service providers has never been easier</p>
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

      {/* Government Schemes */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" /> GOVERNMENT SCHEMES
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Access <span className="text-accent">Government</span> Benefits</h2>
            <p className="text-muted-foreground">Discover and apply for government schemes and services through our platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {schemes.map((scheme) => (
              <div key={scheme.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <scheme.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{scheme.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{scheme.description}</p>
                <Link to="#" className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 text-sm transition-colors">
                  Learn More & Apply <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="#" className="text-secondary font-medium hover:text-primary inline-flex items-center gap-1 transition-colors">
              Explore All Government Schemes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our <span className="text-accent">Users</span> Say</h2>
            <p className="text-muted-foreground">Real feedback from customers and service providers</p>
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

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <img 
                  src={logoImage} 
                  alt="BharatAbhiyan Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-secondary-foreground/70 text-sm mb-4 leading-relaxed">
                Empowering local services across India. Connecting verified service providers with customers through our trusted Captain KYC verification system.
              </p>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-secondary-foreground/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-secondary-foreground/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-secondary-foreground/20 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center cursor-pointer hover:bg-secondary-foreground/20 transition-colors">
                  <Youtube className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">SERVICES</h4>
              <ul className="space-y-3 text-secondary-foreground/70 text-sm">
                <li><Link to="#" className="hover:text-primary transition-colors">Find Providers</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">All Categories</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Government Schemes</Link></li>
                <li><Link to="/service-provider-registration" className="hover:text-primary transition-colors">Become a Provider</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Captain Program</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">COMPANY</h4>
              <ul className="space-y-3 text-secondary-foreground/70 text-sm">
                <li><Link to="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Our Mission</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Press & Media</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-sm tracking-wider">SUPPORT</h4>
              <ul className="space-y-3 text-secondary-foreground/70 text-sm">
                <li><Link to="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Report an Issue</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Safety Guidelines</Link></li>
                <li><Link to="#" className="hover:text-primary transition-colors">Feedback</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/70 text-sm">
              © 2024 BharatAbhiyan. All rights reserved. An initiative under Digital India.
            </p>
            <div className="flex flex-wrap gap-6 text-secondary-foreground/70 text-sm">
              <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Accessibility</Link>
              <Link to="#" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
