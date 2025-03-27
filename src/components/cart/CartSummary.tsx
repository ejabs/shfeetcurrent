import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { CartItem } from "@/utils/types";
import { useCart } from "@/context/CartContext";

interface CartSummaryProps {
  items: CartItem[];
  className?: string;
}

export function CartSummary({ items, className }: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    subtotal,
    deliveryFee,
    totalAfterDiscount,
    discount,
    applyPromo,
    appliedPromoCode,
  } = useCart();

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);

    setTimeout(() => {
      setIsApplyingPromo(false);
      const success = applyPromo(promoCode);

      if (!success) {
        toast({
          title: "Invalid Promo Code",
          description: "Please enter a valid promo code.",
          duration: 3000,
          variant: "destructive",
        });
      }
    }, 1000);
  };

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        discountInfo:
          discount > 0
            ? {
                code: appliedPromoCode || promoCode,
                percentage: discount,
                amount: (subtotal * discount) / 100,
              }
            : undefined,
        subtotal,
        total: totalAfterDiscount,
      },
    });
  };

  const getDeliveryMessage = () => {
    if (subtotal >= 100000) return "Free Shipping";

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems < 4
      ? `₦${deliveryFee.toLocaleString()} (Less than 4 items)`
      : `₦${deliveryFee.toLocaleString()} (4+ items)`;
  };

  return (
    <div className={`bg-leather-50 rounded-lg p-6 ${className}`}>
      <h2 className="text-lg font-medium text-leather-800 mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 text-leather-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({discount}%)</span>
            <span>-₦{((subtotal * discount) / 100).toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>{getDeliveryMessage()}</span>
        </div>

        <div className="pt-3 border-t border-leather-200">
          <div className="flex justify-between font-medium text-leather-900">
            <span>Total</span>
            <span>₦{totalAfterDiscount.toLocaleString()}</span>
          </div>
          <p className="text-xs text-leather-500 mt-1">Including VAT</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="bg-white"
          />
          <Button
            onClick={handleApplyPromo}
            disabled={isApplyingPromo || !promoCode.trim()}
            className="bg-leather-700 hover:bg-leather-800"
          >
            Apply
          </Button>
        </div>

        <Button
          className="w-full bg-leather-700 hover:bg-leather-800 button-transition"
          disabled={items.length === 0}
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>

      <div className="mt-6 pt-4 border-t border-leather-200">
        <h3 className="text-sm font-medium text-leather-800 mb-2">We Accept</h3>
        <div className="flex gap-2">
          <div className="bg-white p-1 rounded border border-leather-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="Mastercard"
              className="w-10 h-6 object-contain"
            />
          </div>
          <div className="bg-white p-1 rounded border border-leather-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
              className="w-10 h-6 object-contain"
            />
          </div>
          <div className="bg-white p-1 rounded border border-leather-200">
            <img
              src="https://www.svgrepo.com/show/362029/verve.svg"
              alt="Verve"
              className="w-10 h-7 object-contain"
            />
          </div>
        </div>
        <p className="text-xs text-leather-500 mt-3">
          Secure checkout powered by Paystack
        </p>
      </div>
    </div>
  );
}
