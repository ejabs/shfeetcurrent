import React from "react";
import { motion } from "framer-motion";
import "./WhyChooseSHFeet.css"; // Separate CSS file for styling

const WhyChooseSHFeet = () => {
  const reasons = [
    {
      title: "Exceptional Comfort",
      description:
        "Crafted with precision to provide all-day comfort without compromising style.",
      imgSrc:
        "https://res.cloudinary.com/daxeovezx/image/upload/v1732753793/convenient_yvivcj.png", // Replace with your image link
    },
    {
      title: "Durable Materials",
      description:
        "Our footwear is made with the finest leather and materials built to last.",
      imgSrc:
        "https://res.cloudinary.com/daxeovezx/image/upload/v1732753793/muscle_fm6znz.png", // Replace with your image link
    },
    {
      title: "Elegant Designs",
      description:
        "Modern, sleek, and stylish designs for you with every occasion in mind.",
      imgSrc:
        "https://res.cloudinary.com/daxeovezx/image/upload/v1732753793/glitter_i7gtua.png", // Replace with your image link
    },
    {
      title: "Affordable Luxury",
      description:
        "Luxury footwear at prices that don’t break the bank and look good at the same time .",
      imgSrc:
        "https://res.cloudinary.com/daxeovezx/image/upload/v1732753793/money_dadrjg.png", // Replace with your image link
    },
  ];

  return (
    <section className="why-choose-shfeet">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="section-title"
      >
        Why Choose SHFeet
      </motion.h2>
      <div className="reasons-container">
        {reasons.map((reason, index) => (
          <motion.div
            key={index}
            className="reason-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={reason.imgSrc}
              alt={reason.title}
              className="reason-image"
            />
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseSHFeet;
