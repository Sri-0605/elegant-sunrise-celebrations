
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Motion } from "@/components/ui/motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { addDays } from "date-fns";

type BookingType = "consultation" | "event";

const BookingPage = () => {
  const [bookingType, setBookingType] = useState<BookingType>("consultation");
  const [date, setDate] = useState<DateRange | undefined>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date?.from || !date?.to) {
      toast.error("Please select both start and end dates");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success(`${bookingType === "consultation" ? "Consultation" : "Event"} booking request sent successfully!`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2A1F3D] to-[#1A1F2C] py-32 px-4 md:px-8">
      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-8 text-white">
          Book Your Special Day
        </h1>

        <Tabs defaultValue="consultation" className="w-full" onValueChange={(value) => setBookingType(value as BookingType)}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 bg-white/10">
            <TabsTrigger 
              value="consultation" 
              className="data-[state=active]:bg-accent data-[state=active]:text-white px-8 py-3 transition-all duration-300"
            >
              Consultation
            </TabsTrigger>
            <TabsTrigger 
              value="event" 
              className="data-[state=active]:bg-accent data-[state=active]:text-white px-8 py-3 transition-all duration-300"
            >
              Event Booking
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Motion
              key={bookingType}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl shadow-xl"
            >
              <h2 className="text-2xl font-montserrat font-semibold p-6 text-white border-b border-white/10">
                Select {bookingType === "consultation" ? "Consultation" : "Event"} Dates
              </h2>
              <div className="p-6">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date() ||
                    (date > addDays(new Date(), bookingType === "consultation" ? 30 : 365))
                  }
                  numberOfMonths={1}
                  className="rounded-lg bg-white/5 p-4"
                  classNames={{
                    day_selected: "bg-accent text-white hover:bg-accent hover:text-white",
                    day_today: "bg-accent/20 text-accent-foreground",
                    day: "hover:bg-accent/50 hover:text-white transition-colors",
                  }}
                />
              </div>
            </Motion>

            <Motion
              key={`form-${bookingType}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-xl shadow-xl"
            >
              <h2 className="text-2xl font-montserrat font-semibold p-6 text-white border-b border-white/10">
                Your Details
              </h2>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all"
                />
                <Input
                  type="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all"
                />
                <textarea
                  placeholder={`Additional Details (optional)\n${
                    bookingType === "consultation" ? "Tell us what you'd like to discuss" : "Tell us about your event"
                  }`}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full min-h-[100px] p-3 rounded-md border border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 focus:outline-none transition-all resize-none"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-montserrat text-lg py-6 transition-all duration-300"
                >
                  {bookingType === "consultation" ? "Book Consultation" : "Request Event Quote"}
                </Button>
              </form>
            </Motion>
          </div>
        </Tabs>
      </Motion>
    </main>
  );
};

export default BookingPage;
