import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Users,
  Building2,
  Handshake,
  Newspaper,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const contactChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our dedicated support team",
      primary: "1800-XXX-XXXX",
      secondary: "Available Mon-Sat, 9 AM - 6 PM IST",
      color: "text-primary",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      primary: "help@bharatabhiyan.gov.in",
      secondary: "Response within 24 hours",
      color: "text-secondary",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our office location",
      primary: "BharatAbhiyan HQ, Bhiwadi, Rajasthan",
      secondary: "Sector 1-10, Bhiwadi - 301019",
      color: "text-accent",
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "When we're available",
      primary: "Monday - Saturday",
      secondary: "9:00 AM - 6:00 PM IST",
      color: "text-destructive",
    },
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "support", label: "Technical Support" },
    { value: "provider", label: "Service Provider Query" },
    { value: "complaint", label: "File a Complaint" },
    { value: "partnership", label: "Partnership Opportunity" },
    { value: "feedback", label: "Share Feedback" },
  ];

  const faqs = [
    {
      question: "What is the best way to reach you?",
      answer: "You can reach us via phone at 1800-XXX-XXXX (Mon-Sat, 9 AM - 6 PM IST), email at help@bharatabhiyan.gov.in, or use this contact form. We respond to inquiries within 24 hours.",
    },
    {
      question: "How can I report an issue with a service provider?",
      answer: "Select 'File a Complaint' in the contact form above or call our support team directly. Provide details about the provider and the issue. We investigate and take appropriate action within 48 hours.",
    },
    {
      question: "Do you offer phone support in regional languages?",
      answer: "Yes! Our support team can assist you in Hindi and English. For other regional languages, please email us and we'll connect you with a multilingual representative.",
    },
    {
      question: "What is your response time for emails?",
      answer: "We aim to respond to all emails within 24 business hours. For urgent matters, please call our toll-free number.",
    },
    {
      question: "How do I become a service provider?",
      answer: "Visit the 'Become a Provider' section on our website or call our support team. They'll guide you through the registration and Captain KYC verification process.",
    },
    {
      question: "Can I request a demo of your platform?",
      answer: "Yes! For business and partnership inquiries, please fill out the contact form selecting 'Partnership Opportunity' and our team will schedule a demo call with you.",
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.category || !formData.message) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    setSubmitStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        category: "",
        message: "",
      });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary text-secondary-foreground py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Get In <span className="text-accent">Touch</span>
            </h1>
            <p className="text-xl text-secondary-foreground/90 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to our support team via phone, email, or the contact form below.
            </p>
          </div>
        </section>

        {/* Contact Channels */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactChannels.map((channel, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4`}>
                    <channel.icon className={`w-6 h-6 ${channel.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground text-sm">{channel.primary}</p>
                    <p className="text-xs text-muted-foreground">{channel.secondary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-card rounded-xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-900">Message Sent Successfully!</p>
                      <p className="text-sm text-green-800">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-red-900">Please fill all required fields</p>
                      <p className="text-sm text-red-800">Name, email, subject, category, and message are required.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Name <span className="text-destructive">*</span></label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Email <span className="text-destructive">*</span></label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98XX-XXXXXX"
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Subject <span className="text-destructive">*</span></label>
                      <Input
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Brief subject"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Category <span className="text-destructive">*</span></label>
                    <Select value={formData.category} onValueChange={handleSelectChange}>
                      <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Message <span className="text-destructive">*</span></label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      className="bg-background min-h-32 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitStatus === "loading"}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
                  >
                    {submitStatus === "loading" ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Info Section */}
              <div className="flex flex-col justify-center space-y-8">
                {/* Response Time */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Average Response Time</h3>
                      <p className="text-sm text-muted-foreground">
                        We aim to respond to all inquiries within <span className="font-semibold text-foreground">24 business hours</span>. For urgent matters, call us directly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Support Channels */}
                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Multiple Support Channels</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Choose the channel that works best for you:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> <span className="font-medium">Toll Free:</span> 1800-XXX-XXXX</li>
                        <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> <span className="font-medium">Email:</span> help@bharatabhiyan.gov.in</li>
                        <li className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> <span className="font-medium">This Form:</span> For detailed inquiries</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Need Immediate Help */}
                <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
                  <h3 className="font-semibold text-foreground mb-2">Need Immediate Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For urgent matters or technical issues, please call our toll-free number directly.
                  </p>
                  <a href="tel:1800XXXXXXX" className="inline-block">
                    <Button className="bg-destructive hover:bg-destructive/90 text-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find quick answers to common questions about contacting and working with BharatAbhiyan.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-card rounded-xl border border-border p-6 cursor-pointer hover:border-primary/50 transition-colors">
                  <summary className="flex items-center justify-between font-semibold text-foreground">
                    <span>{faq.question}</span>
                    <span className="transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Contact for Specific Needs</h2>
            <p className="text-muted-foreground text-center mb-12">
              Different teams handle different types of inquiries. Select the most relevant category to get faster support.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Customer Support</h3>
                <p className="text-sm text-muted-foreground mb-3">Help with finding services, booking, or account issues</p>
                <a href="tel:1800XXXXXXX" className="text-primary text-sm font-medium hover:underline">1800-XXX-XXXX →</a>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Building2 className="w-5 h-5 text-secondary" /> Service Providers</h3>
                <p className="text-sm text-muted-foreground mb-3">Registration, verification, or provider dashboard issues</p>
                <a href="mailto:providers@bharatabhiyan.gov.in" className="text-primary text-sm font-medium hover:underline">providers@bharatabhiyan.gov.in →</a>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Handshake className="w-5 h-5 text-accent" /> Partnerships</h3>
                <p className="text-sm text-muted-foreground mb-3">Business collaborations and partnership opportunities</p>
                <a href="mailto:partnerships@bharatabhiyan.gov.in" className="text-primary text-sm font-medium hover:underline">partnerships@bharatabhiyan.gov.in →</a>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2"><Newspaper className="w-5 h-5 text-destructive" /> Media</h3>
                <p className="text-sm text-muted-foreground mb-3">Press inquiries, media coverage, and brand information</p>
                <a href="mailto:media@bharatabhiyan.gov.in" className="text-primary text-sm font-medium hover:underline">media@bharatabhiyan.gov.in →</a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Check out our comprehensive help center or explore more about BharatAbhiyan and how it works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/help/faqs">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-base">
                  View FAQs
                </Button>
              </Link>
              <Link to="/about">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base">
                  Learn About Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUs;
