import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const placeholderImages = [
    "https://res.cloudinary.com/daxeovezx/image/upload/v1735557211/hero_replacement-min_ldivnm.jpg",
    isMobile
      ? "https://res.cloudinary.com/daxeovezx/video/upload/v1743930234/hero2_y0onti.mp4"
      : "https://res.cloudinary.com/daxeovezx/video/upload/v1743850545/herrooo_ffhvre.mp4",
  ];

  // Preload images and set up autoplay
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = placeholderImages.map((src) => {
          return new Promise((resolve, reject) => {
            if (src.endsWith(".mp4")) {
              resolve();
            } else {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            }
          });
        });

        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to preload images", error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, [isMobile]);

  // Autoplay slides
  useEffect(() => {
    if (!imagesLoaded) return;

    let interval;
    const switchSlide = () => {
      if (
        placeholderImages[currentSlide].endsWith(".mp4") &&
        videoRef.current &&
        !videoError
      ) {
        videoRef.current.play().catch((e) => {
          console.error("Video play failed:", e);
          setVideoError(true);
        });
        videoRef.current.onended = () => {
          setCurrentSlide((prev) => (prev + 1) % placeholderImages.length);
        };
      } else {
        interval = setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % placeholderImages.length);
        }, 5000);
      }
    };

    switchSlide();

    return () => clearTimeout(interval);
  }, [currentSlide, imagesLoaded, videoError]);

  return (
    <section className="relative h-[70vh] md:h-screen md:max-h-[850px] overflow-hidden bg-leather-100">
      {/* Slide Images */}
      <div className="absolute inset-0">
        {placeholderImages.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />

            {src.endsWith(".mp4") && !videoError ? (
              <video
                ref={videoRef}
                src={src}
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                preload="metadata"
                onError={() => setVideoError(true)}
                className="h-full w-full object-cover md:object-center"
              />
            ) : (
              <img
                src={src.endsWith(".mp4") ? placeholderImages[0] : src}
                alt={`Slide ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl animate-slideUp">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-medium text-white mb-4">
              HANDMADE LEATHER FOOTWEAR
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8">
              Exceptional quality and timeless design for discerning customers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-leather-700 hover:bg-leather-800 text-white button-transition"
              >
                <Link to="/products">
                  Shop Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white button-transition"
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
        <div className="flex space-x-2">
          {placeholderImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
