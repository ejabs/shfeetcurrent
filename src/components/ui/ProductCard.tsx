import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/utils/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hovering, setHovering] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block group card-hover overflow-hidden rounded-lg bg-white shadow-md"
    >
      <div className="relative h-full w-full flex flex-col">
        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "h-48 md:h-[300px]" : "h-[200px] md:h-[250px]"
          )}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Background Loading Placeholder */}
          <div
            className="absolute inset-0 bg-leather-100 animate-pulse"
            style={{ display: imageLoaded ? "none" : "block" }}
          />

          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0",
              hovering ? "scale-110" : "scale-100"
            )}
            onLoad={handleImageLoad}
          />

          {/* Hover Image (Smooth Fade) */}
          {product.images.length > 1 && (
            <img
              src={product.images[1]}
              alt={product.name}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                hovering ? "opacity-100 scale-110" : "opacity-0 scale-100"
              )}
            />
          )}

          {/* Dark Overlay on Hover */}
          <div
            className={cn(
              "absolute inset-0 bg-black transition-opacity duration-300",
              hovering ? "opacity-20" : "opacity-0"
            )}
          />

          {/* Featured Tag */}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-leather-700 text-white text-xs px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="text-leather-800 font-medium text-lg">
            {product.name}
          </h3>
          <p className="text-leather-500 text-sm mt-1">{product.category}</p>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="font-medium text-leather-900">
              ₦{product.price.toLocaleString()}
            </span>
            {product.ratings && (
              <div className="flex items-center">
                <div className="text-yellow-500 mr-1">★</div>
                <span className="text-sm text-leather-600">
                  {product.ratings}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
