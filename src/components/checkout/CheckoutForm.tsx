import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Truck, MapPin, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { CartItem, Address } from "@/utils/types";
import { useCart } from "@/context/CartContext";
import PayStackButton from "./PaystackButton";
import { NIGERIAN_STATES } from "./states";

interface CheckoutFormProps {
  items: CartItem[];
}

export function CheckoutForm({ items }: CheckoutFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [shippingAddress, setShippingAddress] = useState<Partial<Address>>({});
  const { toast } = useToast();
  const navigate = useNavigate();
  const { subtotal, deliveryFee, total, totalAfterDiscount, discount } =
    useCart();

  const handleAddressChange = (field: keyof Address, value: string) => {
    setShippingAddress((prev) => ({ ...prev, [field]: value }));
  };

  const proceedToPayment = () => {
    const requiredFields = [
      "email",
      "fullName",
      "city",
      "state",
      "phone",
    ] as const;

    // Add address to required fields only if state is abuja
    if (shippingAddress.state === "abuja") {
      requiredFields.push("address");
    }

    const missingFields = requiredFields.filter(
      (field) => !shippingAddress[field]
    );

    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paystackConfig = {
    reference: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
    email: shippingAddress.email || "",
    amount: (totalAfterDiscount || total) * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
    onSuccess: () => {
      toast({
        title: "Payment Successful!",
        description: "Thank you for your purchase",
      });

      navigate("/order-confirmation", {
        state: {
          orderId: paystackConfig.reference,
          items,
          subtotal,
          deliveryFee,
          total: totalAfterDiscount || total,
          ...(discount && { discount }),
          totalAfterDiscount: totalAfterDiscount || total,
          shippingAddress: { ...shippingAddress, country: "Nigeria" },
        },
      });
    },
    onClose: () => {
      toast({
        title: "Payment Cancelled",
        description: "You canceled the payment process.",
        variant: "destructive",
      });
    },
  };

  return (
    <div className="space-y-8">
      {/* Checkout Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 sm:gap-4">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${
              step >= 1
                ? "bg-leather-700 text-white"
                : "bg-leather-200 text-leather-500"
            }`}
          >
            {step > 1 ? (
              <Check className="h-4 w-4" />
            ) : (
              <MapPin className="h-4 w-4" />
            )}
          </div>
          <span
            className={`text-sm font-medium ${
              step >= 1 ? "text-leather-800" : "text-leather-400"
            }`}
          >
            Shipping
          </span>

          <div
            className={`h-px w-6 sm:w-12 ${
              step > 1 ? "bg-leather-700" : "bg-leather-200"
            }`}
          />

          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${
              step >= 2
                ? "bg-leather-700 text-white"
                : "bg-leather-200 text-leather-500"
            }`}
          >
            <Check className="h-4 w-4" />
          </div>
          <span
            className={`text-sm font-medium ${
              step >= 2 ? "text-leather-800" : "text-leather-400"
            }`}
          >
            Payment
          </span>
        </div>
      </div>

      {/* Step 1: Shipping Address */}
      {step === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center gap-2 text-leather-800">
            <Truck className="h-5 w-5" />
            <h2 className="text-xl font-medium">Shipping Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="space-y-3">
                <Label htmlFor="email">Email </Label>
                <Input
                  id="email"
                  placeholder="Email Address"
                  value={shippingAddress.email || ""}
                  onChange={(e) => handleAddressChange("email", e.target.value)}
                />
              </div>

              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={shippingAddress.fullName || ""}
                onChange={(e) =>
                  handleAddressChange("fullName", e.target.value)
                }
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="+234 800 000 0000"
                value={shippingAddress.phone || ""}
                onChange={(e) => handleAddressChange("phone", e.target.value)}
              />
            </div>

            {/* Address field - only shown when state is abuja */}
            {shippingAddress.state === "abuja" && (
              <div className="space-y-3 md:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  placeholder="123 Main Street"
                  value={shippingAddress.address || ""}
                  onChange={(e) =>
                    handleAddressChange("address", e.target.value)
                  }
                />
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Lagos"
                value={shippingAddress.city || ""}
                onChange={(e) => handleAddressChange("city", e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="state">State *</Label>
              <Select
                value={shippingAddress.state || ""}
                onValueChange={(value) => handleAddressChange("state", value)}
              >
                <SelectTrigger id="state">
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {NIGERIAN_STATES.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="country">Country</Label>
              <Input id="country" value="Nigeria" disabled />
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={proceedToPayment}
              className="w-full md:w-auto bg-leather-700 hover:bg-leather-800 button-transition"
            >
              Continue to Payment
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Paystack Button */}
      {step === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <h2 className="text-xl font-medium">Payment Information</h2>

          <div className="bg-leather-50 rounded-md p-6 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-leather-700">Subtotal:</span>
              <span className="text-leather-900">
                ₦{subtotal.toLocaleString()}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-leather-700">Discount:</span>
                <span className="text-green-600">
                  -₦{((subtotal * discount) / 100).toLocaleString()}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center mb-2">
              <span className="text-leather-700">Delivery Fee:</span>
              <span className="text-leather-900">
                {deliveryFee === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `₦${deliveryFee.toLocaleString()}`
                )}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-leather-200">
              <span className="text-leather-700 font-medium">Total:</span>
              <span className="text-xl font-medium text-leather-900">
                ₦{(totalAfterDiscount || total).toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setStep(1)}
            className="border-leather-200 mr-6"
          >
            Back to Shipping
          </Button>

          <PayStackButton
            {...paystackConfig}
            className="w-full md:w-auto bg-leather-700 hover:bg-leather-800 button-transition text-white p-3 rounded-md"
          >
            Pay with Paystack
          </PayStackButton>
        </div>
      )}
    </div>
  );
}
