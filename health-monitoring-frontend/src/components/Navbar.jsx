import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Activity, LogOut, User, Menu, X } from "lucide-react";
import { Button } from "./ui/Button";

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 shadow-sm shadow-primary/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Lumina<span className="text-primary">Health</span>
          </span>
        </Link>
        {/* Desktop Menu */}
        <div className="ml-auto hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
              <User className="h-4 w-4" />
            </div>
            <span>My Profile</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="ml-auto sm:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border/50 bg-background px-4 py-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground border border-border">
              <User className="h-5 w-5" />
            </div>
            <span className="font-medium text-foreground">My Profile</span>
          </div>
          <Button variant="destructive" className="w-full gap-2 justify-center" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
}
