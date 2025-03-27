import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const { items, subtotal, deliveryFee, totalAfterDiscount, discount } =
    useCart();

  return (
    <>
      <Helmet>
        <title>Checkout | SHFeet</title>
        <meta
          name="description"
          content="Complete your purchase with secure payment."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center mb-8">
              <Link
                to="/cart"
                className="text-leather-600 hover:text-leather-800 mr-2"
              >
                Cart
              </Link>
              <span className="text-leather-400 mx-2">/</span>
              <span className="font-medium text-leather-800">Checkout</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-leather-100 p-6">
                  <CheckoutForm items={items} />
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-leather-50 rounded-lg p-6 sticky top-24">
                  <h2 className="text-lg font-medium text-leather-800 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-4">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                        className="flex gap-3"
                      >
                        <div className="w-16 h-16 bg-white rounded-md border border-leather-100 overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-leather-800 line-clamp-1 font-medium">
                            {item.product.name}
                          </h3>
                          <div className="text-sm text-leather-500">
                            {item.quantity} × ₦
                            {item.product.price.toLocaleString()}
                          </div>
                          <div className="text-xs text-leather-400 mt-1">
                            Size: {item.selectedSize}, Color:{" "}
                            {item.selectedColor.name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-leather-200 pt-4 space-y-3 text-leather-700">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>₦{deliveryFee.toLocaleString()}</span>
                      )}
                    </div>

                    {/* Add Discount Section */}
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount ({discount}%)</span>
                        <span>
                          -₦{((subtotal * discount) / 100).toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="pt-3 border-t border-leather-200">
                      <div className="flex justify-between font-medium text-leather-900">
                        <span>Total</span>
                        <span>₦{totalAfterDiscount.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-leather-500 mt-1">
                        Including VAT
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
