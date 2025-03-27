import { CartItem as CartItemComponent } from "./CartItem";
import { CartItem } from "@/utils/types";
import { useCart } from "@/context/CartContext";

interface CartItemWrapperProps {
  item: CartItem;
}

export function CartItemWrapper({ item }: CartItemWrapperProps) {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, item.selectedSize, item.selectedColor, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id, item.selectedSize, item.selectedColor);
  };

  return (
    <CartItemComponent
      item={item}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemoveItem}
    />
  );
}
