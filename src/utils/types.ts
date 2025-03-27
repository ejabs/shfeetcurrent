export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: ProductCategory;
  forWhom: "men" | "women" | "children";
  sizes: string[];
  colors: ProductColor[];
  featured?: boolean;
  inStock: boolean;
  ratings?: number;
  reviews?: Review[];
}

export interface ProductColor {
  name: string;
  value: string;
}

export type ProductCategory =
  | "sandals"
  | "slides"
  | "shoes"
  | "half-shoes"
  | "boots"
  | "kids"
  | "birkenstock";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  orders: Order[];
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  shippingAddress: Address;
}

export interface Address {
  email: string;
  fullName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}
