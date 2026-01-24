import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Users,
  Shield,
  Zap,
  Target,
  Heart,
  CheckCircle2,
  Award,
  TrendingUp,
  Briefcase,
  Home,
  Building2,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AboutUs = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  const coreValues = [
    {
      icon: Shield,
      title: "Trust & Verification",
      description: "Captain KYC verification ensures all service providers are genuine, verified, and trustworthy.",
      color: "text-primary",
    },
    {
      icon: Users,
      title: "Community First",
      description: "We believe in empowering local communities by connecting them with trusted services and opportunities.",
      color: "text-secondary",
    },
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "Fast, seamless connections between service seekers and providers with minimal hassle.",
      color: "text-accent",
    },
    {
      icon: Heart,
      title: "Customer Care",
      description: "24/7 support and customer-centric approach to ensure satisfaction on every transaction.",
      color: "text-destructive",
    },
  ];

  const achievements = [
    {
      icon: Users,
      stat: "500+",
      label: "Verified Providers",
      description: "Across multiple service categories",
    },
    {
      icon: Home,
      stat: "10,000+",
      label: "Happy Customers",
      description: "Trusted by thousands of households",
    },
    {
      icon: Building2,
      stat: "50+",
      label: "Service Categories",
      description: "From home services to government schemes",
    },
    {
      icon: TrendingUp,
      stat: "100%",
      label: "KYC Verified",
      description: "All providers go through Captain verification",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Captain KYC Verification",
      description: "Our unique in-person Captain verification process ensures every service provider is genuine and reliable.",
    },
    {
      icon: Globe,
      title: "Government Integration",
      description: "Access to government schemes, subsidies, and digital services all in one unified platform.",
    },
    {
      icon: CheckCircle2,
      title: "Quality Assurance",
      description: "Rating and review system ensures service providers maintain high standards of quality.",
    },
    {
      icon: Award,
      title: "Competitive Pricing",
      description: "Fair and transparent pricing with no hidden charges. Compare quotes from multiple providers.",
    },
    {
      icon: Zap,
      title: "Quick Booking",
      description: "Direct call or WhatsApp to service providers. Book within minutes, not hours.",
    },
    {
      icon: Heart,
      title: "24/7 Support",
      description: "Round-the-clock customer support to resolve issues and assist with any queries.",
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Platform Launch",
      description: "BharatAbhiyan officially launched with Captain KYC verification system in Bhiwadi, Rajasthan.",
    },
    {
      year: "Q1 2025",
      title: "Expansion Phase",
      description: "Expanding to 5+ new cities with focus on building provider network and customer base.",
    },
    {
      year: "Q2 2025",
      title: "Service Enhancement",
      description: "Adding AI-powered provider matching and enhanced customer dashboard features.",
    },
    {
      year: "Q3 2025+",
      title: "Pan-India Growth",
      description: "Target expansion to 50+ cities with 5000+ verified service providers nationwide.",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary text-secondary-foreground py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              About <span className="text-accent">Bharat</span>
              <span className="text-primary">Abhiyan</span>
            </h1>
            <p className="text-xl text-secondary-foreground/90 max-w-3xl mx-auto">
              Empowering local services across India through a trusted, verified platform connecting citizens with verified service providers and government schemes.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To revolutionize the local services ecosystem by providing a unified digital platform where verified service providers can grow their businesses and citizens can access quality services with complete trust and transparency.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To make every Indian citizen empowered with access to verified local services and government schemes through a single, trusted, technology-driven platform that operates with integrity and efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make and shape how we serve our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 rounded-xl bg-muted flex items-center justify-center mb-4`}>
                    <value.icon className={`w-7 h-7 ${value.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Growing together with our community of service providers and satisfied customers.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{achievement.stat}</div>
                  <div className="font-semibold text-foreground mb-1">{achievement.label}</div>
                  <div className="text-xs text-muted-foreground">{achievement.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose BharatAbhiyan?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our unique approach to connecting services and customers sets us apart.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey & Roadmap</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From launch to pan-India expansion, our growth strategy is ambitious and customer-focused.
              </p>
            </div>

            <div className="relative">
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className={`flex gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Content */}
                    <div className="flex-1 md:flex-1">
                      <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                        <div className="text-sm font-semibold text-primary mb-1">{item.year}</div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline dot */}
                    <div className="hidden md:flex items-center justify-center">
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10" />
                    </div>

                    {/* Mobile timeline marker */}
                    <div className="md:hidden absolute left-0 w-4 h-4 bg-primary rounded-full border-4 border-background top-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Captain Verification */}
        <section className="py-16 px-4 bg-primary/5 border-t border-primary/20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    Captain <span className="text-primary">KYC Verification</span>
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Our unique in-person Captain verification process is the backbone of BharatAbhiyan's trust system. Every service provider undergoes rigorous background checks and in-person verification before being listed on our platform.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">In-person identity verification</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">Background & reference checks</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">Credential validation & certification</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">Ongoing compliance monitoring</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8 text-center">
                    <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every provider on our platform carries the BharatAbhiyan verification badge, ensuring customers can book services with complete confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking for a service provider or want to grow your business as a service provider, BharatAbhiyan is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base">
                  Find Services <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/service-provider-registration">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-base">
                  Become a Provider <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-12 px-4 bg-muted/30 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-6">Get In Touch</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Phone</p>
                  <p className="font-semibold text-foreground">1800-XXX-XXXX</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Email</p>
                  <p className="font-semibold text-foreground">help@bharatabhiyan.gov.in</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Hours</p>
                  <p className="font-semibold text-foreground">Mon-Sat, 9 AM - 6 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
