
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Motion } from "@/components/ui/motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addDays } from "date-fns";

const BookingPage = () => {
  const [eventType, setEventType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventType) {
      toast.error("Please select an event type");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Quote request sent successfully!");
  };

  return (
    <main className="min-h-screen py-16 px-4 md:px-8">
      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-8">
          Get a Quote
        </h1>

        <div className="glass p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Event Type</h2>
          <RadioGroup
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            value={eventType}
            onValueChange={setEventType}
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/10 transition-colors">
              <RadioGroupItem value="full-event" id="full-event" />
              <Label htmlFor="full-event" className="flex-1 cursor-pointer">
                <div className="font-medium">Full Event Planning</div>
                <p className="text-sm text-muted-foreground">
                  Complete event planning and coordination services
                </p>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent/10 transition-colors">
              <RadioGroupItem value="furniture-rental" id="furniture-rental" />
              <Label htmlFor="furniture-rental" className="flex-1 cursor-pointer">
                <div className="font-medium">Furniture Rental Only</div>
                <p className="text-sm text-muted-foreground">
                  Rent our premium furniture collection
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {eventType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Select Dates</h2>
              <div className="space-y-4">
                <div>
                  <Label>Start Date</Label>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) =>
                      date < new Date() || (endDate ? date > endDate : false)
                    }
                    className="rounded-md border"
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) =>
                      date < (startDate || new Date()) ||
                      date > addDays(startDate || new Date(), 7)
                    }
                    className="rounded-md border"
                  />
                </div>
              </div>
            </div>

            <div className="glass p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <Button type="submit" className="w-full">
                  Get Quote
                </Button>
              </form>
            </div>
          </div>
        )}
      </Motion>
    </main>
  );
};

export default BookingPage;
