
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
          backgroundImage: 'url("/lovable-uploads/cb0ec52d-76c4-43be-9689-eeeff9d00fa2.png")',
        }}
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 text-center px-4">
        <div className="flex items-center justify-center gap-4 mb-6">
          <img 
            src="/lovable-uploads/4f7f3e30-0652-45cd-bae1-e10b70664f20.png"
            alt="Sunrise Events Logo"
            className="w-20 h-20 animate-fade-up"
          />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white animate-fade-up">
            Sunrise Events
          </h1>
        </div>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-fade-up">
          Creating magical moments that last a lifetime
        </p>
        <button className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full transition-all duration-300 animate-fade-up shadow-lg">
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
