import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faq_img from "../assets/faq-img.png";

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "How do I start using the Close Friends Traders app?",
    answer:
      "To start using the Close Friends Traders app, download it from our website, create an account, and deposit funds. Once your account is set up, you can begin Dabba Trading through our app.",
  },
  {
    question: "What types of assets can I trade on the app?",
    answer:
      "The Close Friends Traders app allows you to trade a variety of assets, including stocks, commodities, and currencies, NSE, MCX, Forex, Comex, Global Trading, Live Trading, Online Dabba Trading. Check the app for a full list of available trading options.",
  },
  {
    question: "How can I withdraw my earnings from the app?",
    answer:
      "To withdraw your earnings, go to the withdrawal section of the app, choose your preferred method, and follow the instructions. Withdrawals typically take a few minutes to process.",
  },
  {
    question: "Can I trade on the Close Friends Traders app from anywhere?",
    answer:
      "Yes, you can trade on the Dabba Trading (Close Friends Traders) app from anywhere and anytime you want.",
  },
  {
    question: "What kind of customer support is available?",
    answer:
      "The Close Friends Traders app offers customer support through our customer support. Contact our support team for any issues or questions related to your account or trades.",
  },
  {
    question: "What are the trading hours on the app?",
    answer:
      "Trading hours on the Close Friends Traders app typically align with market hours, but may vary depending on the asset and region. Check the app for specific trading times.",
  },
];

const ToggleFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-black dark:bg-black dark:text-white py-12 px-5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly py-3 items-start">
          <div className="md:flex items-start hidden">
            <img
              src={faq_img}
              alt="FAQ Illustration"
              className="w-64 max-w-sm"
              draggable="false"
            />
          </div>
          <div className="space-y-5 pt-10 max-w-xl w-full">
            {faqs.map((faq, index) => (
              <div key={index} className="relative">
                {/* FAQ Box */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg pl-12 pr-6 py-3 relative w-full transition-colors duration-300">
                  {/* Number Badge */}
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-black text-primary-light dark:text-primary-dark rounded-full flex items-center justify-center text-xl font-bold border-2 border-primary-light dark:border-primary-dark">
                    {index + 1}
                  </div>

                  <button
                    className="w-full text-left flex items-center justify-between focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <div
                      id={`faq-answer-${index}`}
                      className="pt-2 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToggleFAQ;
