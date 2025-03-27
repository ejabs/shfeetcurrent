import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Shfeet?",
    answer:
      "Shfeet is a premium footwear brand offering high-quality, stylish shoes designed for comfort and durability.",
  },
  {
    question: "How do I determine my shoe size?",
    answer:
      "We provide a size selector on each product page. If you're unsure, check google 'Size Guide' or contact support for help.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, PayStack, Transfers and Interswitch payments. All transactions are secure and encrypted.",
  },
  {
    question: "Do you offer Nationwide shipping?",
    answer:
      "Yes! We ship nationwide. Shipping fees and delivery times vary based on your location.",
  },

  {
    question: "How long does delivery take?",
    answer:
      "Delivery times depend on your location. Orders within Nigeria take 5-7 business days.",
  },
  {
    question: "How do I track my order?",
    answer:
      "After placing your order, you'll receive updates via email to monitor your shipment.",
  },
  {
    question: "Are your shoes true to size?",
    answer:
      "Yes, our shoes fit true to size. However, if you have wider feet, consider sizing up for extra comfort.",
  },
];

export function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h2 className="text-4xl font-medium text-leather-800 text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 cursor-pointer transition-all duration-300"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-leather-900">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "mt-3 text-gray-700" : "max-h-0"
                }`}
              >
                {openIndex === index && <p>{faq.answer}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
