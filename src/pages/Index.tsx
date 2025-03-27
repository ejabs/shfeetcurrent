import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BestSellers } from "@/components/home/BestSeller";
import WhyChooseSHFeet from "@/components/home/WhyChooseShfeet";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>SHFeet - Handcrafted Leather Footwear</title>
        <meta
          name="description"
          content="Explore our collection of handcrafted leather footwear for men, women, and children. Quality materials, expert craftsmanship, timeless designs."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <WhyChooseSHFeet />
          <FeaturedProducts />
          <CategoriesSection />
          <BestSellers />
        </main>

        <Footer />
      </div>
    </>
  );
}
