import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import logoImage from "@/assets/bharat-logo.png";
import headerLogo from "@/assets/header-logo.png";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  /* ---------- SERVICES ---------- */
  const serviceCategories = [
    { label: "Home Services", href: "/services/home" },
    { label: "Government Services", href: "/services/government" },
    { label: "Emergency Services", href: "/services/emergency" },
  ];

  /* ---------- NAV ITEMS ---------- */
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", hasDropdown: true },
    {
      label: user?.is_provider ? "Profile" : "Become a Provider",
      href: "/service-provider-registration"
    },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <header className="bg-background border-b border-border">
      {/* TOP BAR */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto text-sm flex justify-between">
          <span>🇮🇳 Official Portal of Bharat Abhiyan</span>
        </div>
      </div>

      {/* MAIN HEADER */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImage} alt="Bharat Abhiyan" className="h-10" />
            <img src={headerLogo} alt="Bharat Abhiyan" className="h-10 hidden sm:block mt-1" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger
                    className={`flex items-center gap-1 font-medium transition-colors ${location.pathname.startsWith("/services")
                      ? "text-secondary border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-secondary"
                      }`}
                  >
                    Services
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-card border shadow-lg">
                    {serviceCategories.map((cat) => (
                      <DropdownMenuItem key={cat.label} asChild>
                        <Link to={cat.href} className="cursor-pointer">
                          {cat.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-medium transition-colors ${isActive(item.href)
                    ? "text-secondary border-b-2 border-primary pb-1"
                    : "text-muted-foreground hover:text-secondary"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">
            <Select defaultValue="en">
              <SelectTrigger className="hidden sm:flex w-24 h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {getInitials(user.name)}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}


            {/* MOBILE TOGGLE */}
            <button
              className="lg:hidden p-2"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileServicesOpen(false);
              }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 border-t pt-4">
            <ul className="space-y-2">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <li key={item.label}>
                    <button
                      className="w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted"
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      Services
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {mobileServicesOpen && (
                      <ul className="ml-4 mt-2 space-y-1">
                        {serviceCategories.map((cat) => (
                          <li key={cat.label}>
                            <Link
                              to={cat.href}
                              className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted"
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileServicesOpen(false);
                              }}
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium ${isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
