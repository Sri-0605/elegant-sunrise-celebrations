
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8">
      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input placeholder="Your Name" required />
              <Input type="email" placeholder="Email Address" required />
              <Input type="tel" placeholder="Phone Number" required />
              <textarea
                className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Your Message"
                required
              />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
          <div className="space-y-8">
            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-accent" />
                  <p>123 Event Street, Wedding City, 12345</p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-accent" />
                  <a href="tel:+1234567890" className="hover:text-accent">
                    (123) 456-7890
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-accent" />
                  <a href="mailto:info@sunrise-events.com" className="hover:text-accent">
                    info@sunrise-events.com
                  </a>
                </div>
              </div>
            </div>
            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              <div className="flex items-center gap-3">
                <Clock className="text-accent" />
                <div>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Motion>
    </main>
  );
};

export default ContactPage;
