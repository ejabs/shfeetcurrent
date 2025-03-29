import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CartProvider } from "./context/CartContext";
import ScrollToTopButton from "@/components/ScrollToTopButton"; // Add this import
import ScrollRestoration from "./components/ScrollRestoration";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { Faqs } from "./pages/Faqs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Helmet
          defaultTitle="SHFeet - Handcrafted Leather Footwear"
          titleTemplate="%s | SHFeet"
        />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Scroll restoration to handle page navigation scroll positions */}
          <ScrollRestoration />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<Faqs />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Add the ScrollToTopButton here - will appear on all pages */}
          <ScrollToTopButton />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
