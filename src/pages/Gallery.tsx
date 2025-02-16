import { Motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "./App";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const GalleryImage = ({ image }: { image: GalleryImage }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Motion
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <Dialog>
        <DialogTrigger asChild>
          <div className="cursor-pointer overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="relative aspect-square">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-end p-4">
                <p className="text-white font-montserrat text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.caption}
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-md border-white/10">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-auto rounded-lg"
          />
          <p className="text-center text-white/80 font-montserrat mt-2">
            {image.caption}
          </p>
        </DialogContent>
      </Dialog>
    </Motion>
  );
};

const EventGalleryPage = () => {
  const { eventType } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      if (!eventType) return;
      
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('category', eventType);
      
      if (error) {
        console.error('Error fetching images:', error);
        return;
      }

      setImages(data);
    };

    fetchImages();
  }, [eventType]);

  const title = eventType ? eventType.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : "";

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-secondary to-background py-20 px-4 md:px-8 lg:py-32">
      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <Button
          variant="ghost"
          className="mb-8 text-white/80 hover:text-white"
          onClick={() => navigate("/gallery")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Galleries
        </Button>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
            {title} Gallery
          </h1>
          <p className="text-lg text-white/80 font-montserrat max-w-2xl mx-auto">
            Browse through our collection of {title.toLowerCase()} celebrations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <GalleryImage key={image.id} image={image} />
          ))}
        </div>
      </Motion>
    </main>
  );
};

export default EventGalleryPage;