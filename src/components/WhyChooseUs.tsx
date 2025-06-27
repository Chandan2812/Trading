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
    <section className="py-16 px-5 bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white transition-colors duration-500">
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
              className="absolute inset-0 flex items-center gap-4 text-2xl font-semibold border border-white/20  text-black dark:bg-[var(--bg-color1)] backdrop-blur-xl dark:text-white px-6 py-4 rounded-lg shadow-2xl bg-white/10 transition-colors duration-500"
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

      <section className="max-w-5xl rounded-xl mx-auto bg-white dark:bg-[#13183a]  text-black dark:text-white mt-10  py-5 px-6 text-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Enjoy Maximum Profits with{" "}
            <span className="text-[var(--primary-color)]">ZERO BROKERAGE</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 dark:text-gray-200 mt-5">
            Trade anytime, anywhere on any device with absolute ZERO BROKERAGE
            costs.
          </p>

          <a
            href="tel:+919876543210"
            className="mt-6 inline-block bg-[var(--primary-color)] text-white font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            📞 Call Now: +91 83682 84948
          </a>
        </div>
      </section>
    </section>
  );
};

export default WhyChoose;
