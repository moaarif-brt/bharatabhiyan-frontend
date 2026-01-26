import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";
import logoImage from "@/assets/logo.jpeg";

const Footer = ({ user }: { user: any }) => {
  return (
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
              {user && (
                <li>
                  <Link
                    to="/service-provider-registration"
                    className="hover:text-primary transition-colors"
                  >
                    Become a Provider
                  </Link>
                </li>
              )}
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
  );
};

export default Footer;
