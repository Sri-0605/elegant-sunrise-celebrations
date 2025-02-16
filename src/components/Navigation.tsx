import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/ui/motion";
import Footer from "./Footer";
import { Menu, X } from "lucide-react"; // Icons for mobile menu toggle

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Motion
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/9429bab3-59d1-4091-aa3d-98ae8360bad7.png" 
              alt="Sunrise Events Logo" 
              className="h-16 w-16 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`hover:text-accent transition-colors ${location.pathname === "/" ? "text-accent" : ""}`}>Home</Link>
            <Link to="/gallery" className={`hover:text-accent transition-colors ${location.pathname.includes("/gallery") ? "text-accent" : ""}`}>Gallery</Link>
            <Link to="/booking" className={`hover:text-accent transition-colors ${location.pathname === "/booking" ? "text-accent" : ""}`}>Book Now</Link>
            <Link to="/contact" className={`hover:text-accent transition-colors ${location.pathname === "/contact" ? "text-accent" : ""}`}>Contact</Link>
            <Motion whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild className="bg-accent text-white hover:bg-accent-hover transition-colors">
                <Link to="/booking">Book Now</Link>
              </Button>
            </Motion>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 right-0 bg-black shadow-lg z-40 p-4 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-accent transition-colors ${location.pathname === "/" ? "text-accent" : ""}`}>Home</Link>
            <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-accent transition-colors ${location.pathname.includes("/gallery") ? "text-accent" : ""}`}>Gallery</Link>
            <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-accent transition-colors ${location.pathname === "/booking" ? "text-accent" : ""}`}>Book Now</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={`hover:text-accent transition-colors ${location.pathname === "/contact" ? "text-accent" : ""}`}>Contact</Link>
          </div>
        )}
      </Motion>

      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Navigation;
