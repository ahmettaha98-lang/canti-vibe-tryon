import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import cantiLogo from "@/assets/canti-logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Logo row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-3">
        <Link to="/">
          <img src={cantiLogo} alt="CANTI" className="h-24 w-auto brightness-0 invert" />
        </Link>
      </div>

      {/* Nav row with border */}
      <div className="border-t border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12">
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300">
              Vitrin
            </Link>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer">
              Koleksiyonlar
            </span>
            <span className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer">
              Hakkımızda
            </span>
          </div>

          {/* Mobile hamburger (left on mobile) */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-all duration-300">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-all duration-300">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border px-4 py-4 flex flex-col gap-3">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setMobileOpen(false)}>
            Vitrin
          </Link>
          <span className="text-sm text-muted-foreground">Koleksiyonlar</span>
          <span className="text-sm text-muted-foreground">Hakkımızda</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
