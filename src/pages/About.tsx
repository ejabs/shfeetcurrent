import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Faqs } from "./Faqs";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | SHFeet</title>
        <meta
          name="description"
          content="Learn about our heritage, craftsmanship, and commitment to quality leather footwear."
        />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Hero Section */}
            <div className="mb-16">
              <h1 className="text-3xl md:text-4xl font-medium text-leather-800 mb-4">
                Our Story
              </h1>
              <p className="text-leather-600 text-lg max-w-3xl">
                Founded in 2018, SHFeet has been dedicated to creating premium
                handcrafted leather footwear that combines traditional
                craftsmanship with contemporary design.
              </p>
            </div>

            {/* Mission and Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-leather-50 p-8 rounded-lg">
                <h2 className="text-2xl font-medium text-leather-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-leather-700 mb-4">
                  To create exceptional leather footwear that stands the test of
                  time, while maintaining ethical production practices and
                  supporting local artisans.
                </p>
                <p className="text-leather-700">
                  We believe that quality footwear is an investment, not just a
                  purchase. Each pair is designed to provide comfort,
                  durability, and timeless style.
                </p>
              </div>

              <div className="bg-leather-50 p-8 rounded-lg">
                <h2 className="text-2xl font-medium text-leather-800 mb-4">
                  Our Values
                </h2>
                <ul className="space-y-3 text-leather-700">
                  <li>
                    <strong>Quality:</strong> We use only the finest full-grain
                    leather and materials.
                  </li>
                  <li>
                    <strong>Craftsmanship:</strong> Each pair is handcrafted by
                    skilled artisans.
                  </li>
                  <li>
                    <strong>Sustainability:</strong> We're committed to ethical
                    and environmentally responsible practices.
                  </li>
                  <li>
                    <strong>Community:</strong> We support and train local
                    craftspeople.
                  </li>
                  <li>
                    <strong>Customer Satisfaction:</strong> Your comfort and
                    satisfaction are our priority.
                  </li>
                </ul>
              </div>
            </div>

            {/* Craftsmanship */}
            <div className="mb-16">
              <h2 className="text-2xl font-medium text-leather-800 mb-6">
                Our Craftsmanship
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Material Selection */}
                <div className="text-center">
                  <div className="relative w-full aspect-square bg-leather-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/daxeovezx/image/upload/v1742568024/Leather_Upholstery___Transforming_waste_into_value_h6yuku.jpg"
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-leather-800 mb-2">
                    Material Selection
                  </h3>
                  <p className="text-leather-600">
                    We carefully select premium full-grain leather from
                    sustainable sources.
                  </p>
                </div>

                {/* Handcrafting Process */}
                <div className="text-center">
                  <div className="relative w-full aspect-square bg-leather-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/daxeovezx/image/upload/v1742568023/Leather_Sandals_For_Cooler_Days_-_Dyed_With_Batik_Wax_Resist_Technique_gxluy4.jpg"
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-leather-800 mb-2">
                    Handcrafting Process
                  </h3>
                  <p className="text-leather-600">
                    Our artisans use traditional techniques passed down through
                    generations.
                  </p>
                </div>

                {/* Quality Control */}
                <div className="text-center">
                  <div className="relative w-full aspect-square bg-leather-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="https://res.cloudinary.com/daxeovezx/image/upload/v1742568023/Quality_Control_for_Footwear_Industry___Shoes_Quality_Control___GIM_hbvugd.jpg"
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-leather-800 mb-2">
                    Quality Control
                  </h3>
                  <p className="text-leather-600">
                    Each pair undergoes rigorous inspection to ensure it meets
                    our high standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Team */}
            {/* <div>
              <h2 className="text-2xl font-medium text-leather-800 mb-6">
                Our Team
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 bg-leather-100 rounded-full mx-auto mb-4"></div>
                    <h3 className="font-medium text-leather-800 mb-1">
                      Team Member {index + 1}
                    </h3>
                    <p className="text-leather-500 text-sm mb-2">Position</p>
                    <p className="text-leather-600 text-sm">
                      With over 10 years of experience in traditional
                      leatherworking.
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="" id="faqs-section">
              <Faqs />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
