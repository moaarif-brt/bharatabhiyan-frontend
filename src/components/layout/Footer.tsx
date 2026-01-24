const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">About</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-secondary-foreground/80">
              <li><a href="/about" className="hover:text-secondary-foreground">About BharatAbhiyan</a></li>
              <li><a href="/about" className="hover:text-secondary-foreground">Our Mission</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground">Local Services</a></li>
              <li><a href="#" className="hover:text-secondary-foreground">Government Schemes</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Help & Support</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-secondary-foreground/80">
              <li><a href="/help/faqs" className="hover:text-secondary-foreground">FAQs</a></li>
              <li><a href="/contact" className="hover:text-secondary-foreground">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-3 text-sm sm:text-base">Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-secondary-foreground">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-secondary-foreground/60">
          <p>© 2024 BharatAbhiyan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
