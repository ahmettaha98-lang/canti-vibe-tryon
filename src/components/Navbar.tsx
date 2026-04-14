import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import cantiLogo from "@/assets/canti-logo.png";

const LOGO_MAX = 160; // px – big hero size
const LOGO_MIN = 96;  // px – current navbar size (h-24)
const SHRINK_DISTANCE = 120; // scroll px over which shrink happens

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/products";
  const [logoSize, setLogoSize] = useState(isHome ? LOGO_MAX : LOGO_MIN);

  useEffect(() => {
    if (!isHome) {
      setLogoSize(LOGO_MIN);
      return;
    }
    const onScroll = () => {
      const t = Math.min(window.scrollY / SHRINK_DISTANCE, 1);
      setLogoSize(LOGO_MAX - t * (LOGO_MAX - LOGO_MIN));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
      {/* Logo row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-3 transition-all duration-100">
        <Link to="/">
          <img
            src={cantiLogo}
            alt="CANTI"
            className="w-auto brightness-0 invert transition-all duration-100"
            style={{ height: `${logoSize}px` }}
          />
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
