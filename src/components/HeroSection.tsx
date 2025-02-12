
import { ArrowDownCircle } from "lucide-react";

const HeroSection = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    servicesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />
      <div
        className="absolute inset-0 bg-cover bg-center z-0 blur-[2px]"
        style={{
          backgroundImage: 'url("/lovable-uploads/cb0ec52d-76c4-43be-9689-eeeff9d00fa2.png")',
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 text-center px-4">
        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-semibold text-white animate-fade-up mb-6">
          Sunrise Events
        </h1>
        <p className="font-playfair text-white/90 text-xl md:text-2xl max-w-2xl mx-auto mb-8 animate-fade-up italic">
          Creating magical moments that last a lifetime
        </p>
        <button className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full transition-all duration-300 animate-fade-up shadow-lg font-playfair text-lg">
          Book Now
        </button>
      </div>
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/90 hover:text-white transition-colors duration-300 animate-bounce"
      >
        <ArrowDownCircle size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
