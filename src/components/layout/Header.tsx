import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import logoImage from "@/assets/bharat-logo.png";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const serviceCategories = [
    { label: "Home Services", href: "/services/home" },
    { label: "Government Services", href: "/services/government" },
    { label: "Emergency Services", href: "/services/emergency" },
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", hasDropdown: true },

    ...(user
      ? [{ label: "Become a Provider", href: "/service-provider-registration" }]
      : []),

    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];


  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("#")) return false;
    return location.pathname.startsWith(href);
  };

  // 👤 Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="bg-background">
      {/* Government Top Bar */}
      <div className="bg-secondary text-secondary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span>🇮🇳</span>
            <span className="hidden sm:inline">An official portal of the Bharat Abhiyan</span>
            <span className="sm:hidden">Bharat Abhiyan</span>
          </div>
          {/* <Link to="#" className="text-accent hover:underline flex items-center gap-1">
            Here's how you know <ArrowRight className="w-3 h-3" />
          </Link> */}
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logoImage} 
              alt="BharatAbhiyan Logo" 
              className="h-10 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col">
              <span className="text-xl font-bold">
                <span className="text-accent">Bharat</span>
                <span className="text-primary">Abhiyan</span>
              </span>
              <span className="text-base font-semibold text-secondary -mt-1">Roaring India</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger className={`font-medium transition-colors flex items-center gap-1 ${
                    location.pathname.startsWith('/services')
                      ? "text-secondary border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-secondary"
                  }`}>
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-card border border-border shadow-lg z-50">
                    {serviceCategories.map((category) => (
                      <DropdownMenuItem key={category.label} asChild>
                        <Link
                          to={category.href}
                          className="cursor-pointer hover:bg-muted"
                        >
                          {category.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-secondary border-b-2 border-primary pb-1"
                      : "text-muted-foreground hover:text-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Select defaultValue="en">
              <SelectTrigger className="w-24 h-9 hidden sm:flex">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>

            {/* 👤 Logged In User Avatar or Login/Register Buttons */}
            {user ? (
              <>
                {/* Desktop Avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="hidden sm:flex">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity font-semibold text-sm">
                      {getInitials(user.name)}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border border-border shadow-lg">
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground cursor-default">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="#" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="#" className="cursor-pointer">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Avatar */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="sm:hidden">
                    <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity font-semibold text-xs">
                      {getInitials(user.name)}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border border-border shadow-lg">
                    <DropdownMenuItem disabled className="text-xs text-muted-foreground cursor-default">
                      {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="#" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="#" className="cursor-pointer">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-destructive cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="hidden sm:block">
                  <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    Register
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pt-4 border-t border-border">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {!user && (
                <li className="flex gap-2 px-4 pt-2">
                  <Link to="/login" className="flex-1">
                    <Button variant="outline" className="w-full border-secondary text-secondary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1">
                    <Button className="w-full bg-secondary text-secondary-foreground">
                      Register
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
