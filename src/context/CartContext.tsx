import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product, ProductColor } from "@/utils/types";
import { useToast } from "@/components/ui/use-toast";
import { getPromoDiscount } from "@/components/cart/promo";

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    quantity: number,
    selectedSize: string,
    selectedColor: ProductColor
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: ProductColor,
    quantity: number
  ) => void;
  removeItem: (productId: string, size: string, color: ProductColor) => void;
  clearCart: () => void;
  calculateDeliveryFee: () => number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  promoCode: string;
  discount: number;
  applyPromo: (code: string) => boolean; // Add this
  removePromo: () => void; // Add this
  totalAfterDiscount: number; // Add this
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>(0); // Add this
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
    updateTotals();
  }, [items]);

  // Update totals whenever items, deliveryFee, or discount changes
  useEffect(() => {
    updateTotals();
  }, [items, deliveryFee, discount]);

  // Function to update subtotal, deliveryFee, and total
  const updateTotals = () => {
    const newSubtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);

    const newDeliveryFee = calculateDeliveryFee();
    setDeliveryFee(newDeliveryFee);

    // Calculate total after applying discount
    const discountedAmount = (newSubtotal * discount) / 100;
    const newTotalAfterDiscount =
      newSubtotal - discountedAmount + newDeliveryFee;
    setTotalAfterDiscount(newTotalAfterDiscount); // Update totalAfterDiscount
    setTotal(newTotalAfterDiscount); // Update total
  };

  // Function to calculate delivery fee
  const calculateDeliveryFee = (): number => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const orderSubtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Free delivery for orders over 100,000 naira
    if (orderSubtotal >= 100000) {
      return 0;
    }

    // 4000 for less than 4 items, 6000 for 4 or more
    return totalItems < 4 ? 1000 : 6000;
  };

  // Function to apply promo code
  const applyPromo = (code: string): boolean => {
    const promoDiscount = getPromoDiscount(code);
    if (promoDiscount) {
      setPromoCode(code);
      setDiscount(promoDiscount);
      toast({
        title: "Promo code applied!",
        description: `${promoDiscount}% off your total order!`,
      });
      return true;
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is not valid.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Function to remove promo code
  const removePromo = () => {
    setPromoCode("");
    setDiscount(0);
    toast({
      title: "Promo code removed",
      description: "Your promo code has been removed.",
    });
  };

  // Function to add an item to the cart
  const addToCart = (
    product: Product,
    quantity: number,
    selectedSize: string,
    selectedColor: ProductColor
  ) => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor.name === selectedColor.name
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;

        toast({
          title: "Cart updated",
          description: `Updated quantity of ${product.name}`,
        });

        return updatedItems;
      } else {
        // Add new item if it doesn't exist
        toast({
          title: "Added to cart",
          description: `${quantity} × ${product.name} added to your cart`,
        });

        return [
          ...prevItems,
          { product, quantity, selectedSize, selectedColor },
        ];
      }
    });
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (
    productId: string,
    size: string,
    color: ProductColor,
    quantity: number
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor.name === color.name
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeItem = (productId: string, size: string, color: ProductColor) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === color.name
          )
      )
    );

    toast({
      title: "Item removed",
      description: "Item removed from cart",
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setItems([]);
    setPromoCode("");
    setDiscount(0);

    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        calculateDeliveryFee,
        subtotal,
        deliveryFee,
        total,
        promoCode,
        discount,
        applyPromo,
        removePromo,
        totalAfterDiscount, // Add this
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
