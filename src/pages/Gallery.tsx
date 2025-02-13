
import { Motion } from "@/components/ui/motion";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/lovable-uploads/cb0ec52d-76c4-43be-9689-eeeff9d00fa2.png",
    alt: "Wedding Setup",
    caption: "Elegant Wedding Reception"
  },
  {
    src: "/lovable-uploads/2e6be3eb-4dff-4979-a8cb-12e8b5911755.png",
    alt: "Birthday Party",
    caption: "Magical Birthday Celebration"
  },
  {
    src: "/lovable-uploads/4f7f3e30-0652-45cd-bae1-e10b70664f20.png",
    alt: "Corporate Event",
    caption: "Sophisticated Corporate Gathering"
  },
  {
    src: "/lovable-uploads/9429bab3-59d1-4091-aa3d-98ae8360bad7.png",
    alt: "Special Event",
    caption: "Unforgettable Moments"
  }
];

const GalleryItem = ({ image, index }: { image: GalleryImage; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Motion
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 180, z: 50 }}
      className="group relative"
    >
      <div className="relative perspective-1000">
        <div className="transform-style-3d transition-transform duration-500 group-hover:rotate-y-180">
          {/* Front of Polaroid */}
          <div className="absolute w-full h-full backface-hidden">
            <div className="bg-white p-3 rounded-md shadow-xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
              <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="mt-3 text-center font-montserrat text-gray-700 text-sm">
                {image.caption}
              </p>
            </div>
          </div>
          
          {/* Back of Polaroid */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            <div className="bg-white p-3 rounded-md shadow-xl">
              <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-playfair text-gray-800 font-semibold">
                  {image.caption}
                </h3>
                <p className="text-sm text-gray-600 mt-1 font-montserrat">
                  Click to view details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* String Effect */}
      <div className="absolute top-[-20px] left-1/2 w-[2px] h-[20px] bg-gradient-to-b from-transparent to-white/30" />
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
            Our Gallery
          </h1>
          <p className="text-lg text-white/80 font-montserrat max-w-2xl mx-auto">
            A collection of our most memorable events and magical moments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {galleryImages.map((image, index) => (
            <GalleryItem key={image.src} image={image} index={index} />
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
