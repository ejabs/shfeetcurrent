import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/utils/types";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!loading && products.length > 0) {
      Promise.all(
        products.flatMap((product) =>
          product.images.map(
            (src) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve;
                img.onerror = resolve; // Still resolve on error to not block the UI
              })
          )
        )
      ).then(() => {
        setImagesLoaded(true);
      });
    }
  }, [products, loading]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg bg-leather-100/50 h-[350px] animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 mb-4 rounded-full bg-leather-100 flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-medium text-leather-800 mb-2">
          No products found
        </h3>
        <p className="text-leather-600 max-w-md">
          Try adjusting your filters or search criteria to find what you're
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="opacity-0 animate-fadeIn"
          style={{
            animationDelay: `${Math.random() * 300}ms`,
            animationFillMode: "forwards",
          }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
