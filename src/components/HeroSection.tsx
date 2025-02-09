
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
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1500673922987-e212871fec22")',
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center px-4">
        <p className="text-white/90 text-sm md:text-base animate-fade-down">
          WELCOME TO
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mt-4 mb-6 animate-fade-up">
          Sunrise Events
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up">
          Creating unforgettable moments for your special celebrations
        </p>
        <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-full transition-all duration-300 animate-fade-up">
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
