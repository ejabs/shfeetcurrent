import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Product, ProductColor } from "@/utils/types";
import { useCart } from "@/context/CartContext";
import { productsData } from "@/data/productsData"; // Import local data

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      const foundProduct = productsData.find(
        (p) => p.id.toString() === id.toString()
      ); // Convert both to string
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        setSelectedColor(null);

        const related = productsData.filter(
          (p) =>
            p.category === foundProduct.category &&
            p.id.toString() !== id.toString()
        );
        setRelatedProducts(related);
      }
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size", variant: "destructive" });
      return;
    }
    if (!selectedColor) {
      toast({ title: "Please select a color", variant: "destructive" });
      return;
    }
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const isButtonDisabled = !selectedSize || !selectedColor; // Disable buttons until both are selected

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product Not Found</div>;

  return (
    <>
      <Helmet>
        <title>{product.name} | SHFeet</title>
        <meta
          name="description"
          content={product.description.substring(0, 160)}
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="container mx-auto px-4 md:px-6 py-12 my-11 space-y-8">
          <div className="mb-6 flex">
            <Link
              to="/products"
              className="px-2 py-2 rounded-lg tracking-tighter bg-white backdrop-blur-md text-black text-sm font-medium shadow-md transition-all hover:bg-white/80 hover:shadow-lg hover:text-black border border-black/20"
            >
              ← Back
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
            {/* Product Images */}
            <div>
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto max-h-[600px] object-cover rounded-lg sm:max-h-[400px] md:max-h-[500px]"
              />

              <div className="flex gap-2 mt-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-16 h-16 cursor-pointer rounded-md ${
                      selectedImage === image ? "border-2 border-black" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="text-lg text-gray-700 mt-2">
                ₦{product.price.toLocaleString()}
              </p>

              {/* Size Selection */}
              <div className="mt-4">
                <label className="text-sm font-medium">Size:</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {" "}
                  {/* Added flex-wrap */}
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 border rounded flex-shrink-0 ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mt-4">
                <label className="text-sm font-medium">Color:</label>
                <div className="flex gap-2 mt-2">
                  {product.colors.map((color) => (
                    <div key={color.value} className="relative group">
                      {/* Color Button */}
                      <button
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor?.value === color.value
                            ? color.value === "#000000"
                              ? "border-white shadow-md shadow-gray-500"
                              : "border-black shadow-lg"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => setSelectedColor(color)}
                      />

                      {/* Hover Text Label */}
                      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-200 rounded-md mt-2 w-fit">
                  <button
                    type="button"
                    className="h-8 w-8 flex items-center justify-center rounded-l-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-gray-800 border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="h-8 w-8 flex items-center justify-center rounded-r-md text-gray-700 hover:bg-gray-100"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <Button
                  className={`bg-black text-white ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button
                  className={`bg-red-600 text-white ${
                    isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleBuyNow}
                  disabled={isButtonDisabled}
                >
                  Buy Now
                </Button>
              </div>

              {/* Size Note */}
              <p className="text-sm text-gray-600 mt-2">
                <strong>Note:</strong> If you're uncertain about your size or
                your fit tends to run snug, we recommend selecting the next size
                up for a more comfortable fit.
              </p>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-xl font-bold">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
              {relatedProducts.map((related) => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
