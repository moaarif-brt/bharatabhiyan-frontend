import { FileText, Key, Smartphone, CreditCard, HelpCircle, Phone, Mail, Clock, MapPin } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // const screens = [
  //   { label: "Login", path: "/login" },
  //   { label: "Register", path: "/register" },
  //   { label: "OTP Verify", path: "/verify-otp" },
  //   { label: "Payment", path: "/payment" },
  //   { label: "Service Provider", path: "/service-provider-registration" },
  // ];

  return (
    <aside className="flex flex-col h-full gap-4 sm:gap-6">
      {/* View Screens */}
      {/* <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">
          View Screens
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-2">
          {screens.map((screen) => (
            <Link
              key={screen.path}
              to={screen.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === screen.path
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {screen.label}
            </Link>
          ))}
        </div>
      </div> */}

      {/* Need Help */}
      <div className="bg-card rounded-lg border border-border p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-secondary mb-4">NEED HELP?</h3>
        <ul className="space-y-3">
          <li>
            <Link to="/help/how-to-register" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <FileText className="w-4 h-4" />
              How to register
            </Link>
          </li>
          <li>
            <Link to="/help/forgot-password" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <Key className="w-4 h-4" />
              Forgot password
            </Link>
          </li>
          <li>
            <Link to="/help/otp-not-received" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <Smartphone className="w-4 h-4" />
              OTP not received
            </Link>
          </li>
          <li>
            <Link to="/help/payment-issues" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <CreditCard className="w-4 h-4" />
              Payment issues
            </Link>
          </li>
          <li>
            <Link to="/help/faqs" className="flex items-center gap-2 text-primary hover:underline text-sm">
              <HelpCircle className="w-4 h-4" />
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact Us */}
      <div className="bg-card rounded-lg border border-border p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-secondary mb-4">CONTACT US</h3>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="font-medium">Toll Free:</span>{" "}
              <span className="text-muted-foreground">1800-XXX-XXXX</span>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="font-medium">Email:</span>{" "}
              <span className="text-muted-foreground">help@bharatabhiyan.gov.in</span>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <div>
              <span className="font-medium">Hours:</span>{" "}
              <span className="text-muted-foreground">Mon-Sat, 9 AM - 6 PM</span>
            </div>
          </li>
        </ul>
      </div>

      {/* Currently Active In */}
      <div className="bg-card rounded-lg border border-border p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-secondary mb-4">CURRENTLY ACTIVE IN</h3>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-destructive mt-0.5" />
          <div>
            <p className="font-medium">Bhiwadi, Rajasthan</p>
            <p className="text-sm text-muted-foreground">
              More cities coming soon.{" "}
              <a href="#" className="text-primary hover:underline">
                Request your city
              </a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
