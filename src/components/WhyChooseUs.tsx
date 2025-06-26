import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ShieldCheck,
  Timer,
  BadgeCheck,
  Headset,
  Lock,
  CreditCard,
  Banknote,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const features = [
  { text: "No KYC Required", icon: ShieldCheck },
  { text: "Sign Up In 05 Sec", icon: Timer },
  { text: "100% Trusted & Verified", icon: BadgeCheck },
  { text: "Support Available 24/7", icon: Headset },
  { text: "Data Privacy", icon: Lock },
  { text: "Easy Payment Methods", icon: CreditCard },
  { text: "Instant Deposit & Withdrawal", icon: Banknote },
];

const slideVariants = {
  initial: { y: 30, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  exit: { y: -30, opacity: 0, transition: { duration: 0.6 } },
};

const WhyChoose: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = features[index].icon;

  return (
    <section className="py-16 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12">
        {/* Left Side Title */}
        <div className="w-full md:w-1/2">
          <h2
            className="text-4xl font-bold text-[var(--primary-color)] mb-4"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="100"
          >
            Why Trade With CFT
          </h2>
          <p
            className="text-lg text-gray-600 dark:text-gray-300"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            Simple and Fast Trading with Real-Time Market Insights for a Smooth
            Experience
          </p>
        </div>

        {/* Right Side Ticker Animation */}
        <div className="w-full md:w-1/2 h-20 overflow-hidden relative mb-4 md:mb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0 flex items-center gap-4 text-2xl font-semibold bg-[#f3f3f3] text-black dark:bg-black dark:text-white border border-[var(--primary-color)] px-6 py-4 rounded-lg shadow-lg transition-colors duration-500"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <CurrentIcon
                size={28}
                className="text-[var(--primary-color)] shrink-0"
              />
              <span>{features[index].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
