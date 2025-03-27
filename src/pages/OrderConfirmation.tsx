import { useEffect, useState } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Check,
  Package,
  Truck,
  Receipt,
  MapPin,
  Mail,
  Timer,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { CartItem, Address } from "@/utils/types";

// Define the order data type
interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  totalAfterDiscount?: number;
  shippingAddress: Address;
}

export default function OrderConfirmation() {
  const location = useLocation();
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  // Function to send order to backend
  const sendOrderToBackend = async (order: OrderData) => {
    try {
      const response = await fetch(
        "https://shfeetbackend.vercel.app/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...order,
            discount: order.discount || 0,
            totalAfterDiscount: order.totalAfterDiscount || order.total,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send order details");
      }

      console.log("Order sent successfully");
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  useEffect(() => {
    // Only send the order if we haven't already
    if (location.state?.orderId && !orderData) {
      const order = location.state as OrderData;
      setOrderData(order);
      clearCart();

      // Send order to backend
      sendOrderToBackend(order);
    }
  }, [location.state, clearCart, orderData]);

  // If no order data is available, redirect to home
  if (!orderData && !location.state?.orderId) {
    return <Navigate to="/" />;
  }

  // Format date for expected delivery (5-7 business days)
  const formatDeliveryDate = () => {
    const today = new Date();

    // Add 5 business days for earliest delivery
    const earliestDelivery = new Date(today);
    earliestDelivery.setDate(today.getDate() + 7); // Adding extra days to account for weekends

    // Add 7 business days for latest delivery
    const latestDelivery = new Date(today);
    latestDelivery.setDate(today.getDate() + 10); // Adding extra days to account for weekends

    // Format dates
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const earliestStr = earliestDelivery.toLocaleDateString("en-NG", options);
    const latestStr = latestDelivery.toLocaleDateString("en-NG", options);

    return `${earliestStr} - ${latestStr}`;
  };

  if (!orderData) return null;

  // Calculate subtotal from items (use provided subtotal or calculate if not available)
  const subtotal =
    orderData.subtotal ||
    orderData.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

  // Calculate delivery fee (use provided deliveryFee or calculate if not available)
  const calculateDeliveryFee = () => {
    if (orderData.deliveryFee !== undefined) return orderData.deliveryFee;

    const totalItems = orderData.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    // Free delivery for orders over 100,000 naira
    if (subtotal >= 100000) {
      return 0;
    }

    // 4000 for less than 4 items, 6000 for 4 or more
    return totalItems < 4 ? 4000 : 6000;
  };

  const deliveryFee = calculateDeliveryFee();
  const hasDiscount = orderData.discount && orderData.discount > 0;
  const finalTotal = orderData.totalAfterDiscount || orderData.total;

  return (
    <>
      <Helmet>
        <title>Order Confirmation | SHFeet</title>
        <meta
          name="description"
          content="Your order has been confirmed. Thank you for shopping with us!"
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              {/* Success Banner */}
              <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-medium text-green-800 mb-2">
                  Order Confirmed!
                </h1>
                <p className="text-green-700">
                  Thank you for your purchase. Your order has been successfully
                  placed.
                </p>
              </div>

              {/* Order Information */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    Order #{orderData.orderId}
                  </CardTitle>
                  <CardDescription>
                    Placed on{" "}
                    {new Date().toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Delivery Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 text-leather-800">
                        <Truck className="h-4 w-4" />
                        Delivery Information
                      </h3>
                      <div className="bg-leather-50 p-4 rounded-md space-y-3 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-leather-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-leather-800">
                              {orderData.shippingAddress.email}
                            </p>
                            <p className="font-medium text-leather-800">
                              {orderData.shippingAddress.fullName}
                            </p>
                            <p className="text-leather-600">
                              {orderData.shippingAddress.address}
                            </p>
                            <p className="text-leather-600">
                              {orderData.shippingAddress.city},{" "}
                              {orderData.shippingAddress.state},{" "}
                            </p>
                            <p className="text-leather-600">
                              {orderData.shippingAddress.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 pt-2 border-t border-leather-200">
                          <Timer className="h-4 w-4 text-leather-700 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-leather-800">
                              Estimated Delivery
                            </p>
                            <p className="text-leather-600">
                              {formatDeliveryDate()}
                            </p>
                            <p className="text-leather-500 text-xs mt-1">
                              5-7 working days from order confirmation
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium flex items-center gap-2 text-leather-800">
                        <Package className="h-4 w-4" />
                        Order Summary
                      </h3>
                      <div className="bg-leather-50 p-4 rounded-md space-y-3 text-sm">
                        <div className="flex justify-between text-leather-700">
                          <span>Subtotal</span>
                          <span>₦{subtotal.toLocaleString()}</span>
                        </div>

                        {/* Show discount if applicable */}
                        {hasDiscount && orderData.discount && (
                          <div className="flex justify-between text-leather-700">
                            <span>Discount</span>
                            <span className="text-green-600">
                              -₦
                              {Math.round(
                                (subtotal * orderData.discount) / 100
                              ).toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between text-leather-700">
                          <span>Delivery Fee</span>
                          {deliveryFee === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            <span>₦{deliveryFee.toLocaleString()}</span>
                          )}
                        </div>

                        <div className="pt-2 border-t border-leather-200 flex justify-between font-medium text-leather-900">
                          <span>Total</span>
                          <span>₦{finalTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-leather-500">
                          Including VAT
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderData.items.map((item) => (
                        <TableRow
                          key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-16 h-16 bg-white rounded-md border border-leather-100 overflow-hidden">
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-leather-800">
                                  {item.product.name}
                                </p>
                                <p className="text-xs text-leather-500">
                                  Qty: {item.quantity}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-leather-700">
                              Size: {item.selectedSize}
                            </p>
                            <p className="text-sm text-leather-700">
                              Color: {item.selectedColor.name}
                            </p>
                          </TableCell>
                          <TableCell className="text-right">
                            <p className="font-medium">
                              ₦
                              {(
                                item.product.price * item.quantity
                              ).toLocaleString()}
                            </p>
                            <p className="text-xs text-leather-500">
                              ₦{item.product.price.toLocaleString()} each
                            </p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-leather-700 mb-4">
                    A confirmation email has been sent to your registered email
                    address with all order details.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-md flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">
                          Track Your Order
                        </h4>
                        <p className="text-sm text-blue-700">
                          You'll receive email updates about your order status
                          and tracking information.
                        </p>
                      </div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-md flex items-start gap-3">
                      <Truck className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-800">
                          Prepare for Delivery
                        </h4>
                        <p className="text-sm text-purple-700">
                          Your order will be delivered within 5-7 working days
                          to your provided address.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Link to="/products">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>
                  <p className="text-sm text-leather-500">
                    Need help? Contact our{" "}
                    <Link to="/contact" className="text-leather-800 underline">
                      customer support
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
