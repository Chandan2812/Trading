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
import { usePopup } from "../components/PopupContext";

const features = [
  {
    icon: register,
    title: "Register in Under 5 Sec",
    desc: "Beginner-friendly registration straight under 5 seconds.",
  },
  {
    icon: support,
    title: "24×7 Customer Support",
    desc: "Markets don’t sleep. Neither do we. Expert help, 24x7.",
  },
  {
    icon: fivex,
    title: "500x Margin",
    desc: "Entry-Level Capital. Pro-Level Power.",
  },
  {
    icon: zero,
    title: "0% Commission",
    desc: "Keep everything you earn. No cuts, we promise.",
  },

  {
    icon: withdrawal,
    title: "Quick Withdrawals",
    desc: "Seamless withdrawals. Because your time matters.",
  },
  {
    icon: security,
    title: "No Hidden Charges",
    desc: "What you see is what you get. Every rupee accounted for.",
  },
  {
    icon: zeroTax,
    title: "	0% Tax on Profits",
    desc: "0% Tax on Profits. 100% Returns to You.",
  },
  {
    icon: traders,
    title: "5M+ Happy Traders",
    desc: "Home to a global network of 5 million+ traders.",
  },
];

const WhyTrade: React.FC = () => {
  const { openPopup } = usePopup();

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
    <section className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white py-12 transition-colors duration-300">
      <div className="w-11/12 md:w-5/6 mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Why 50,000+ Traders Trust Us?
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 w-11/12 md:w-5/6 mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateX: 15, scale: 0.95 }}
            whileInView={{ opacity: 1, rotateX: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            className="relative group perspective-[1200px] transition-transform "
          >
            <motion.div
              className="relative bg-white dark:bg-[var(--bg-color1)] border border-[var(--primary-color)] rounded-2xl p-6 min-h-[270px] text-center flex flex-col items-center justify-start shadow-md  transition-transform duration-300 hover:shadow-[0_0_10px_var(--primary-color)]"
              whileHover={{ rotateX: 4, rotateY: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--primary-color)] rounded-2xl pointer-events-none transition-all duration-300"></div>

              <motion.img
                src={feature.icon}
                alt={feature.title}
                className="h-[65px] w-[65px] object-contain mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
              />
              <motion.h3
                className="text-lg font-semibold mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                viewport={{ once: true }}
              >
                {feature.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                {feature.desc}
              </motion.p>
            </motion.div>
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
                <div className="bg-white dark:bg-[var(--bg-color1)] border border-[var(--primary-color)] rounded-lg p-6 h-full transition-colors duration-300">
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
      {/* ✅ CTA Button Below All Market Cards */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={openPopup}
          data-aos="fade-up"
          className="inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
        >
          Start Trading Now
        </button>
      </div>
    </section>
  );
};

export default WhyTrade;
