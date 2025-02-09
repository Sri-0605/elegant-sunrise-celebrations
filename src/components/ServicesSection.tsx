
import { Motion, Presence } from '@/components/ui/motion';
import { Card } from '@/components/ui/card';

const services = [
  {
    title: "Wedding Decoration",
    description: "Transform your venue into a magical setting with our bespoke wedding decoration services.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  {
    title: "Reception Setup",
    description: "Create lasting memories with our elegant and sophisticated reception arrangements.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
  },
  {
    title: "Cultural Celebrations",
    description: "Embrace your heritage with our culturally authentic decoration and setup services.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our range of premium event services designed to make your special day truly memorable
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Motion
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden card-hover">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                  <button className="mt-4 text-accent hover:text-accent-hover transition-colors">
                    Learn More →
                  </button>
                </div>
              </Card>
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
