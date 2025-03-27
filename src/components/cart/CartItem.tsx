import { useState } from "react";
import { Link } from "react-router-dom";
import { LineChart, Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/utils/types";

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.product.id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    onQuantityChange(item.product.id, item.quantity + 1);
  };

  const handleRemove = () => {
    onRemove(item.product.id);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-leather-100 animate-fadeIn">
      {/* Product Image */}
      <div className="w-full sm:w-28 h-28 relative rounded-md overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 bg-leather-100 animate-pulse"
          style={{ display: imageLoaded ? "none" : "block" }}
        />
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <Link
              to={`/product/${item.product.id}`}
              className="text-lg font-medium text-leather-800 hover:text-leather-700 line-clamp-1"
            >
              {item.product.name}
            </Link>
            <div className="text-sm text-leather-500 mt-1 space-y-1">
              <p>Size: {item.selectedSize}</p>
              <div className="flex items-center gap-2">
                <span>Color:</span>
                <span
                  className="inline-block w-4 h-4 rounded-full border border-leather-200"
                  style={{ backgroundColor: item.selectedColor.value }}
                  title={item.selectedColor.name}
                />
                <span>{item.selectedColor.name}</span>
              </div>
            </div>
          </div>
          <div className="text-right mt-2 sm:mt-0">
            <div className="text-leather-800 font-medium">
              ₦{(item.product.price * item.quantity).toLocaleString()}
            </div>
            <div className="text-sm text-leather-500">
              ₦{item.product.price.toLocaleString()} each
            </div>
          </div>
        </div>

        {/* Quantity & Actions */}
        <div className="flex flex-wrap justify-between items-center mt-4 gap-3">
          <div className="flex items-center border border-leather-200 rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-leather-700"
              onClick={decreaseQuantity}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center text-leather-800">
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none text-leather-700"
              onClick={increaseQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
