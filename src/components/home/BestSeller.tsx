import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product } from "@/utils/types";
import { productsData } from "@/data/productsData"; // Your product data

export function BestSellers() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sort products by ratings or sales (assuming you have 'mostBought' field)
    const sortedProducts = [...productsData]
      .sort((a, b) => (b.mostBought || b.ratings) - (a.mostBought || a.ratings))
      .slice(0, 9); // Get top 7 best sellers

    setTimeout(() => {
      setBestSellers(sortedProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-medium text-leather-800">
            Best Sellers
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
          <div className="relative">
            <Swiper
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="w-full"
            >
              {bestSellers.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
