
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Motion } from "@/components/ui/motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Motion
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          Sunrise Events
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`hover:text-accent transition-colors ${
              location.pathname === "/" ? "text-accent" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/booking"
            className={`hover:text-accent transition-colors ${
              location.pathname === "/booking" ? "text-accent" : ""
            }`}
          >
            Book Now
          </Link>
          <Link
            to="/contact"
            className={`hover:text-accent transition-colors ${
              location.pathname === "/contact" ? "text-accent" : ""
            }`}
          >
            Contact
          </Link>
          <Motion
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="bg-accent text-white hover:bg-accent-hover transition-colors"
            >
              <Link to="/booking">Book Now</Link>
            </Button>
          </Motion>
        </div>
      </nav>
    </Motion>
  );
};

export default Navigation;
