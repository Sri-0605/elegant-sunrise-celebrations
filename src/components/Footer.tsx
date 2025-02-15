
import { Link } from "react-router-dom";
import { Motion } from "@/components/ui/motion";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary mt-20"
    >
      <footer className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/9429bab3-59d1-4091-aa3d-98ae8360bad7.png" 
                alt="Sunrise Events Logo" 
                className="h-12 w-12 object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm">
              Creating unforgettable moments and lasting memories for your special events.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/60 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/60 hover:text-accent transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-white/60 hover:text-accent transition-colors">
                  Book Now
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-white/60">
              <li>123 Event Street</li>
              <li>Los Angeles, CA 90012</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@sunriseevents.com</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Business Hours</h3>
            <ul className="space-y-2 text-white/60">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>© 2024 Sunrise Events. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </Motion>
  );
};

export default Footer;
