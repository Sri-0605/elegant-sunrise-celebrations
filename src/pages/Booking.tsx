
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Motion } from "@/components/ui/motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type BookingType = "consultation" | "event";
type EventType = "wedding" | "birthday" | "party" | "furniture";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  eventType: EventType;
  budget: number;
  requirements: string;
  specialRequests: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  eventType: "wedding",
  budget: 100000,
  requirements: "",
  specialRequests: "",
};

const BookingPage = () => {
  const [eventDates, setEventDates] = useState<DateRange | undefined>();
  const [consultationDate, setConsultationDate] = useState<Date | undefined>();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData & { dates: string }>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData & { dates: string }> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!consultationDate) newErrors.dates = "Consultation date is required";
    if (!eventDates?.from || !eventDates?.to) newErrors.dates = "Event dates are required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Thank you! Our team will contact you soon to discuss your consultation.", {
      duration: 5000,
    });

    setFormData(initialFormData);
    setEventDates(undefined);
    setConsultationDate(undefined);
    setErrors({});
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-20 px-4 md:px-8 lg:py-32">
      <Motion
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-center mb-12 text-white">
          Schedule Your Consultation
        </h1>

        <div className="glass rounded-xl shadow-xl max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Input
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all h-12 rounded-lg"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all h-12 rounded-lg"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <Input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all h-12 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}

            <Input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all h-12 rounded-lg"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone}</p>
            )}

            <Input
              placeholder="Company/Organization (Optional)"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 transition-all h-12 rounded-lg"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm">Event Type *</label>
                <Select 
                  value={formData.eventType} 
                  onValueChange={(value: EventType) => setFormData({ ...formData, eventType: value })}
                >
                  <SelectTrigger className="border-white/20 bg-white/5 text-white h-12">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="birthday">Birthday/Anniversary</SelectItem>
                    <SelectItem value="party">Other Parties</SelectItem>
                    <SelectItem value="furniture">Furniture Rental</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm">Budget Range *</label>
                <div className="pt-2">
                  <Slider
                    value={[formData.budget]}
                    onValueChange={(value) => setFormData({ ...formData, budget: value[0] })}
                    min={10000}
                    max={1000000}
                    step={5000}
                    className="w-full"
                  />
                  <p className="text-white/60 text-sm mt-2">
                    Estimated Budget: ₹{formData.budget.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm">Event Dates *</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12",
                        !eventDates && "text-muted-foreground",
                        "border-white/20 bg-white/5 text-white hover:bg-white/10"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {eventDates?.from ? (
                        eventDates.to ? (
                          <>
                            {format(eventDates.from, "LLL dd, y")} -{" "}
                            {format(eventDates.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(eventDates.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select event dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={eventDates}
                      onSelect={setEventDates}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date() ||
                        date > addDays(new Date(), 365)
                      }
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>
                {errors.dates && (
                  <p className="text-red-400 text-sm">{errors.dates}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm">Consultation Date *</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-12",
                        !consultationDate && "text-muted-foreground",
                        "border-white/20 bg-white/5 text-white hover:bg-white/10"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {consultationDate ? (
                        format(consultationDate, "LLL dd, y")
                      ) : (
                        <span>Select consultation date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="single"
                      selected={consultationDate}
                      onSelect={setConsultationDate}
                      disabled={(date) =>
                        date < new Date() ||
                        date > addDays(new Date(), 30)
                      }
                      className="rounded-md border-0"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-white/80 text-sm">Event Requirements</label>
              <textarea
                placeholder="List your specific needs (catering, decoration, seating, etc.)"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full min-h-[100px] p-4 rounded-lg border border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 focus:outline-none transition-all resize-none"
              />
            </div>

            <div className="space-y-4">
              <label className="text-white/80 text-sm">Special Requests</label>
              <textarea
                placeholder="Any additional requests or requirements..."
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full min-h-[100px] p-4 rounded-lg border border-white/20 bg-white/5 text-white placeholder:text-white/60 focus:border-accent/50 focus:ring-accent/50 focus:outline-none transition-all resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-accent to-primary hover:opacity-90 text-white font-montserrat text-lg py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-accent/50 hover:scale-[1.02]"
            >
              Submit Consultation Request
            </Button>
          </form>
        </div>
      </Motion>
    </main>
  );
};

export default BookingPage;
