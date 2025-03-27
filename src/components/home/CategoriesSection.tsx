import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Men",
    description: "Classic designs for everyday elegance",
    image:
      "https://res.cloudinary.com/daxeovezx/image/upload/v1742498685/634eaabf0384c86d1f58d79c-luxury-business-oxford-leather-shoes-men_zlkdv2.jpg",
    url: "/products?category=men",
  },
  {
    name: "Women",
    description: "Elegant styles for any occasion",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800",
    url: "/products?category=women",
  },
  {
    name: "Children",
    description: "Comfortable and durable for active kids",
    image:
      "https://res.cloudinary.com/daxeovezx/image/upload/v1742498685/IMG_8928_250x250_2x_xklaro.webp",
    url: "/products?category=children",
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 bg-leather-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-medium text-center text-leather-800 mb-12">
          Shop By Category
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: {
    name: string;
    description: string;
    image: string;
    url: string;
  };
  index: number;
}

function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <Link
      to={category.url}
      className={cn(
        "group relative h-[400px] overflow-hidden rounded-lg card-hover",
        "animate-slideUp",
        index === 1 ? "md:-mt-8" : ""
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10" />
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        <div className="bg-white/80 backdrop-blur-sm p-5 rounded-lg transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
          <h3 className="text-xl font-medium text-leather-800 mb-2">
            {category.name}
          </h3>
          <p className="text-leather-600 mb-3">{category.description}</p>
          <div className="inline-block text-leather-700 font-medium hover-underline">
            Shop Now
          </div>
        </div>
      </div>
    </Link>
  );
}
