import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/utils/types";
import { productsData } from "@/data/productsData"; // Import actual products data

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to get random products
    const getRandomProducts = (count: number) => {
      const shuffled = [...productsData].sort(() => 0.5 - Math.random()); // Shuffle array
      return shuffled.slice(0, count); // Pick `count` number of products
    };

    setTimeout(() => {
      setProducts(getRandomProducts(4)); // Select 4 random products
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-medium text-leather-800">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-leather-700 hover:text-leather-900 flex items-center hover-underline"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg bg-leather-100/50 h-[350px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
