import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, SlidersHorizontal } from "lucide-react";
import { ProductCategory } from "@/utils/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductFiltersProps {
  onFilterChange: (filters: {
    categories: ProductCategory[];
    forWhom: ("men" | "women" | "children")[];
    priceRange: [number, number];
    inStock: boolean;
  }) => void;
  initialFilters?: {
    categories?: ProductCategory[];
    forWhom?: ("men" | "women" | "children")[];
    priceRange?: [number, number];
    inStock?: boolean;
  };
}

export function ProductFilters({
  onFilterChange,
  initialFilters = {},
}: ProductFiltersProps) {
  const isMobile = useIsMobile();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [categories, setCategories] = useState<ProductCategory[]>(
    initialFilters.categories || []
  );
  const [forWhom, setForWhom] = useState<("men" | "women" | "children")[]>(
    initialFilters.forWhom || []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters.priceRange || [0, 50000]
  );
  const [inStockOnly, setInStockOnly] = useState<boolean>(
    initialFilters.inStock || false
  );

  const resetFilters = () => {
    setCategories([]);
    setForWhom([]);
    setPriceRange([0, 50000]);
    setInStockOnly(false);
    onFilterChange({
      categories: [],
      forWhom: [],
      priceRange: [0, 50000],
      inStock: false,
    });
  };

  const applyFilters = () => {
    onFilterChange({
      categories,
      forWhom,
      priceRange,
      inStock: inStockOnly,
    });
    if (isMobile) {
      setMobileFiltersOpen(false);
    }
  };

  const toggleCategory = (category: ProductCategory) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleForWhom = (type: "men" | "women" | "children") => {
    setForWhom((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const formatPrice = (value: number) => {
    return `₦${value.toLocaleString()}`;
  };

  const filtersContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-leather-800 mb-3">Filters</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="w-full justify-start text-leather-600"
        >
          <X className="mr-2 h-4 w-4" />
          Reset All Filters
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["categories", "for-whom", "price"]}
      >
        {/* Categories */}
        <AccordionItem value="categories">
          <AccordionTrigger className="text-leather-800">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {(
                [
                  "sandals",
                  "slides",
                  "shoes",
                  "boots",
                  "kids",

                  "half-shoes",
                  "birkenstock",
                ] as ProductCategory[]
              ).map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={categories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-leather-700 capitalize cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* For Whom */}
        <AccordionItem value="for-whom">
          <AccordionTrigger className="text-leather-800">
            For Whom
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-1">
              {(["men", "women", "children"] as const).map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`for-${type}`}
                    checked={forWhom.includes(type)}
                    onCheckedChange={() => toggleForWhom(type)}
                  />
                  <Label
                    htmlFor={`for-${type}`}
                    className="text-leather-700 capitalize cursor-pointer"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="text-leather-800">
            Price Range
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2 px-1">
              <Slider
                min={0}
                max={50000}
                step={1000}
                value={priceRange}
                onValueChange={(value) =>
                  setPriceRange(value as [number, number])
                }
                className="relative w-full h-2 bg-leather-200 rounded-full outline-none transition-all duration-300 hover:bg-leather-300"
              >
                {/* Custom Thumb (Handle) */}
                <div className="absolute -top-2.5 h-5 w-5 bg-leather-600 rounded-full shadow-md transition-all duration-300 hover:scale-110 focus:outline-none" />
              </Slider>

              {/* Display Min & Max Price */}
              <div className="flex items-center justify-between text-sm text-leather-600">
                <span className="font-medium">
                  {formatPrice(priceRange[0])}
                </span>
                <span className="font-medium">
                  {formatPrice(priceRange[1])}
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability */}
        <AccordionItem value="availability">
          <AccordionTrigger className="text-leather-800">
            Availability
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={inStockOnly}
                  onCheckedChange={(checked) => setInStockOnly(!!checked)}
                />
                <Label
                  htmlFor="in-stock"
                  className="text-leather-700 cursor-pointer"
                >
                  In Stock Only
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        className="w-full bg-leather-700 hover:bg-leather-800"
        onClick={applyFilters}
      >
        Apply Filters
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium text-leather-800">Products</h2>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-leather-200"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-x-0 bottom-0 h-[85vh] rounded-t-xl border border-border bg-background p-6 shadow-lg animate-slideUp">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-leather-700"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(100%-60px)]">
                {filtersContent}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return <div className="w-full h-full">{filtersContent}</div>;
}
