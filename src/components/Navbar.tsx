import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Users, User, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: "/health", label: "HerHealth+", icon: Heart, color: "text-health" },
    { path: "/finance", label: "HerFinance", icon: TrendingUp, color: "text-finance" },
    { path: "/connect", label: "HerConnect", icon: Users, color: "text-connect" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">H</span>
            </div>
            <span className="font-bold text-xl text-foreground">HerSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ path, label, icon: Icon, color }) => (
              <Link key={path} to={path}>
                <Button
                  variant={isActive(path) ? "default" : "ghost"}
                  size="sm"
                  className={`gap-2 ${!isActive(path) ? color : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Profile & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link to="/profile" className="hidden md:block">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Profile
              </Button>
            </Link>
            
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ path, label, icon: Icon, color }) => (
                <Link key={path} to={path} onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant={isActive(path) ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${!isActive(path) ? color : ""}`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Button>
                </Link>
              ))}
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <User className="w-5 h-5" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;