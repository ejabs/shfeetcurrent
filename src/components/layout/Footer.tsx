import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function Footer() {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (email) {
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        duration: 3000,
      });
      e.currentTarget.reset();
    }
  };

  return (
    <footer className="bg-leather-50 pt-16 pb-8 border-t border-leather-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-leather-800">SHFeet</h3>
            <p className="text-leather-600 max-w-xs">
              Handcrafted leather footwear for discerning customers. Quality
              materials, expert craftsmanship, timeless designs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-leather-500 hover:text-leather-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-leather-500 hover:text-leather-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-leather-500 hover:text-leather-800 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="https://wa.me/yourphonenumber" // Replace with your actual WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="text-leather-500 hover:text-leather-800 transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>

              <a
                href="mailto:your@email.com" // Replace with your actual email
                className="text-leather-500 hover:text-leather-800 transition-colors"
                aria-label="Email"
              >
                <MdEmail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-leather-800">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { text: "Home", url: "/" },
                { text: "About Us", url: "/about" },
                { text: "Products", url: "/products" },
                { text: "Contact", url: "/contact" },
                { text: "FAQs", url: "/about#faqs-section" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    to={link.url}
                    className="text-leather-600 hover:text-leather-800 hover-underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-leather-800">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                { text: "Men", url: "/products?category=men" },
                { text: "Women", url: "/products?category=women" },
                { text: "Children", url: "/products?category=children" },
                { text: "Sandals", url: "/products?type=sandals" },
                { text: "Slides", url: "/products?type=slides" },
                { text: "Shoes", url: "/products?type=shoes" },
              ].map((link) => (
                <li key={link.text}>
                  <Link
                    to={link.url}
                    className="text-leather-600 hover:text-leather-800 hover-underline"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-leather-800">
              Newsletter
            </h4>
            <p className="text-leather-600">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="bg-white border-leather-200"
                  required
                />
                <Button
                  type="submit"
                  className="bg-leather-700 hover:bg-leather-800"
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-leather-100 mt-12 pt-8 text-center text-leather-500 text-sm">
          <p>© {new Date().getFullYear()} SHFeet. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-leather-700">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-leather-700">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
