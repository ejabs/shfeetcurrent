import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Product, ProductCategory } from "@/utils/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { productsData as allProducts } from "@/data/productsData"; // Import products from products.ts

export default function Products() {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Get initial filter values from URL
  const initialCategory = searchParams.get("category");
  const initialType = searchParams.get("type");

  // Load products from imported data
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setProducts(allProducts); // Use imported products
      setFilteredProducts(allProducts);
      setLoading(false);
    }, 500); // Simulated delay
  }, []);

  // Apply initial filters from URL
  useEffect(() => {
    if (loading || products.length === 0) return;

    let filtered = [...products];

    if (initialCategory) {
      filtered = filtered.filter(
        (product) => product.forWhom === initialCategory
      );
    }

    if (initialType) {
      filtered = filtered.filter(
        (product) => product.category === (initialType as ProductCategory)
      );
    }

    setFilteredProducts(filtered);
  }, [loading, products, initialCategory, initialType]);

  // Handle filter changes
  const handleFilterChange = (filters: {
    categories: ProductCategory[];
    forWhom: ("men" | "women" | "children")[];
    priceRange: [number, number];
    inStock: boolean;
  }) => {
    let filtered = [...products];

    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.forWhom.length > 0) {
      filtered = filtered.filter((product) =>
        filters.forWhom.includes(product.forWhom)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    setFilteredProducts(filtered);
  };

  return (
    <>
      <Helmet>
        <title>Products | SHFeet</title>
        <meta
          name="description"
          content="Browse our collection of handcrafted leather footwear."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
              {!isMobile && (
                <aside className="hidden lg:block sticky top-24 self-start">
                  <ProductFilters
                    onFilterChange={handleFilterChange}
                    initialFilters={{
                      forWhom: initialCategory
                        ? [initialCategory as "men" | "women" | "children"]
                        : [],
                      categories: initialType
                        ? [initialType as ProductCategory]
                        : [],
                    }}
                  />
                </aside>
              )}

              <div className="space-y-8">
                {isMobile && (
                  <ProductFilters
                    onFilterChange={handleFilterChange}
                    initialFilters={{
                      forWhom: initialCategory
                        ? [initialCategory as "men" | "women" | "children"]
                        : [],
                      categories: initialType
                        ? [initialType as ProductCategory]
                        : [],
                    }}
                  />
                )}

                <ProductGrid products={filteredProducts} loading={loading} />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
