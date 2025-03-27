import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartItem as CartItemComponent } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (
    id: string,
    size: string,
    color: any,
    quantity: number
  ) => {
    updateQuantity(id, size, color, quantity);
  };

  const handleRemoveItem = (id: string, size: string, color: any) => {
    removeItem(id, size, color);
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart | SHFeet</title>
        <meta
          name="description"
          content="Review and checkout your selected items."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-2xl md:text-3xl font-medium text-leather-800 mb-8">
              Shopping Cart
            </h1>

            {/* Conditionally render "Continue Shopping" when cart is NOT empty */}
            {items.length > 0 && (
              <div className="mb-6 flex">
                <Link
                  to="/products"
                  className="px-2 py-2 rounded-lg tracking-tighter bg-white/10 backdrop-blur-md text-black text-sm font-medium shadow-md transition-all hover:bg-white/20 hover:shadow-lg border border-black/20"
                >
                  ← Continue Shopping
                </Link>
              </div>
            )}

            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-leather-100 flex items-center justify-center">
                    <ShoppingBag className="h-10 w-10 text-leather-400" />
                  </div>
                </div>
                <h2 className="text-xl font-medium text-leather-800 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-leather-600 mb-6 max-w-md mx-auto">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Button asChild className="bg-leather-700 hover:bg-leather-800">
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-sm border border-leather-100 p-6">
                    <h2 className="text-lg font-medium text-leather-800 mb-4">
                      Cart Items ({items.length})
                    </h2>

                    <div className="divide-y divide-leather-100">
                      {items.map((item) => (
                        <CartItemComponent
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                          item={item}
                          onQuantityChange={(id, quantity) =>
                            handleQuantityChange(
                              id,
                              item.selectedSize,
                              item.selectedColor,
                              quantity
                            )
                          }
                          onRemove={(id) =>
                            handleRemoveItem(
                              id,
                              item.selectedSize,
                              item.selectedColor
                            )
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <CartSummary items={items} className="sticky top-24" />
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
