import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import zero from "../assets/whyTrade/zero.png";
import fivex from "../assets/whyTrade/500x.png";
import zeroTax from "../assets/whyTrade/Tax.png";
import register from "../assets/whyTrade/register.png";
import withdrawal from "../assets/whyTrade/withdrawl.png";
import support from "../assets/whyTrade/support.png";
import security from "../assets/whyTrade/security.png";
import traders from "../assets/whyTrade/HappyTraders.png";

const features = [
  {
    icon: register,
    title: "Register in Under 5 Sec",
    desc: "Sign up instantly and start trading without any waiting time.",
  },
  {
    icon: support,
    title: "24×7 Customer Support",
    desc: "Get expert help any time of day, whenever the market moves, we're here.",
  },
  {
    icon: fivex,
    title: "500x Margin",
    desc: "Unlock massive trading power with up to 500x intraday leverage.",
  },
  {
    icon: zero,
    title: "0% Brokerage",
    desc: "Trade with zero brokerage and maximize every rupee of your investment without any hidden fees or commissions.",
  },
  {
    icon: zeroTax,
    title: "0% Brokerage",
    desc: "Trade with zero brokerage and keep every rupee you earn which equals more profits!",
  },
  {
    icon: withdrawal,
    title: "Quick Withdrawals",
    desc: "Withdraw your money instantly without delays or complicated steps.",
  },
  {
    icon: security,
    title: "No Hidden Charges",
    desc: "What you see is exactly what you pay. No surprise deductions.",
  },
  {
    icon: traders,
    title: "5M+ Happy Traders",
    desc: "Join a trusted community of over 5 million satisfied traders worldwide.",
  },
];

const WhyTrade: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setTimeout(() => AOS.refresh(), 100);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cardWidth = container.offsetWidth;
    const newIndex = direction === "left" ? index - 1 : index + 1;
    setIndex(newIndex);
    container.scrollTo({ left: newIndex * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-12 px-5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Why Traders Choose{" "}
          <span className="text-[var(--primary-color)] font-bold italic">
            Close Friends Traders?
          </span>
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative rounded-lg p-[1.5px] bg-gradient-to-b from-gray-200 to-[var(--primary-color)] dark:from-[#111] dark:to-[var(--primary-color)] hover:shadow-[0_0_10px_var(--primary-color)] transition"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-black rounded-lg p-6 min-h-[270px] flex flex-col justify-start items-center text-center transition-colors duration-300">
              <motion.img
                src={feature.icon}
                alt={feature.title}
                className="h-[70px] w-[70px] object-contain mb-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              />
              <motion.h3
                className="text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 + 0.6 }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: index * 0.2 + 0.9 }}
                viewport={{ once: true }}
              >
                {feature.desc}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Slider (unchanged) */}
      <div className="sm:hidden relative w-full px-0 mt-10">
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out no-scrollbar"
            style={{ scrollSnapType: "x mandatory", overflowX: "scroll" }}
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 scroll-snap-align-start px-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="bg-white dark:bg-gradient-to-br dark:from-[#111] dark:to-[#1a1a1a] border border-[var(--primary-color)] rounded-lg p-6 h-full transition-colors duration-300">
                  <div className="mb-4 flex justify-center">
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="h-[70px] w-[70px] object-contain"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {index > 0 && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 bg-black/10 dark:bg-black/70 hover:dark:bg-black/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {index < features.length - 1 && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 bg-black/10 dark:bg-black/70 hover:dark:bg-black/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyTrade;
