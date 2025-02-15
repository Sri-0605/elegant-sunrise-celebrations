
import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface EventCategory {
  id: string;
  title: string;
  description: string;
  image: string;
}

const eventCategories: EventCategory[] = [
  {
    id: "weddings",
    title: "Weddings",
    description: "Elegant ceremonies and receptions that create timeless memories",
    image: "/lovable-uploads/fc527540-dea1-4377-ae5a-35475b71ec96.png"
  },
  {
    id: "haldi",
    title: "Haldi",
    description: "Traditional pre-wedding ceremonies filled with color and joy",
    image: "/lovable-uploads/71516578-c066-4c0b-9dc9-8ae5788e098c.png"
  },
  {
    id: "sangeet",
    title: "Sangeet",
    description: "Musical celebrations that bring families together",
    image: "/lovable-uploads/3d0814c1-e4a3-4a65-a476-ca9393045e3b.png"
  },
  {
    id: "receptions",
    title: "Receptions",
    description: "Grand celebrations of love and unity",
    image: "/lovable-uploads/2e6be3eb-4dff-4979-a8cb-12e8b5911755.png"
  },
  {
    id: "birthdays",
    title: "Birthdays",
    description: "Memorable celebrations for all ages",
    image: "/lovable-uploads/9429bab3-59d1-4091-aa3d-98ae8360bad7.png"
  }
];

const EventCard = ({ event }: { event: EventCategory }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Motion
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-playfair font-semibold text-white mb-2">
          {event.title}
        </h3>
        <p className="text-white/80 font-montserrat text-sm mb-4">
          {event.description}
        </p>
        <Button
          onClick={() => navigate(`/gallery/${event.id}`)}
          className="bg-accent/90 hover:bg-accent text-white w-full transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100"
        >
          View Portal
        </Button>
      </div>
    </Motion>
  );
};

const GalleryPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-20 px-4 md:px-8 lg:py-32">
      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            Event Galleries
          </h1>
          <p className="text-lg text-white/80 font-montserrat max-w-2xl mx-auto">
            Explore our collection of beautifully crafted events and celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventCategories.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
        </div>
      </Motion>
    </main>
  );
};

export default GalleryPage;
