import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/CartContext";

const categories = [
  { name: "Men", path: "/products?category=men" },
  { name: "Women", path: "/products?category=women" },
  { name: "Children", path: "/products?category=children" },
  { name: "All Products", path: "/products" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { items } = useCart();

  // Calculate total items in cart
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "py-3 bg-black/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-black/80 backdrop-blur-md shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className={cn(
            "text-2xl font-medium tracking-tight transition-all duration-300",
            scrolled ? "text-white" : "text-leather-500"
          )}
        >
          SHFeet
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className={cn(
                "hover-underline text-sm font-medium transition-colors",
                location.pathname === category.path.split("?")[0] &&
                  location.search.includes(category.path.split("?")[1] || "")
                  ? "text-leather-800"
                  : "text-leather-600 hover:text-leather-800"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="text-leather-700 hover:text-leather-900 hover:bg-leather-100"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button> */}

          {/* User Account */}
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-leather-700 hover:text-leather-900 hover:bg-leather-100"
                aria-label="User account"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/account" className="w-full">
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/orders" className="w-full">
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/account/logout" className="w-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}

          {/* Cart */}
          <Link to="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="text-leather-700 hover:text-leather-900 hover:bg-leather-100 relative"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-leather-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Button>
          </Link>

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="text-leather-700 hover:text-leather-900 hover:bg-leather-100 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fadeIn">
          <div className="container mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-3 px-4 border border-leather-200 rounded-md focus:outline-none focus:ring-2 focus:ring-leather-400"
                autoFocus
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                size="sm"
                variant="ghost"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md animate-fadeIn">
          <nav className="container mx-auto py-4 px-6">
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="block py-2 text-leather-700 hover:text-leather-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
