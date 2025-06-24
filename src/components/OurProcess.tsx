import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import step1 from "../assets/1.png";
import step2 from "../assets/2.png";
import step3 from "../assets/1.png";
import step4 from "../assets/2.png";
import Navbar from "./Nav";
import Footer from "./Footer";

const steps = [
  {
    img: step1,
    title: "Lorem ipsum",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, soluta!",
  },
  {
    img: step2,
    title: "Lorem ipsum",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, soluta!",
  },
  {
    img: step3,
    title: "Lorem ipsum",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, soluta!",
  },
  {
    img: step4,
    title: "Lorem ipsum",
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, soluta!",
  },
];

// Animation variants
const imageVariants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 360,
    scale: 1,
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};

const textVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, delay },
  },
});

const OurProcess: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const timelineProgress = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div>
      <Navbar />
      <section
        className="w-full px-4 py-16 bg-white dark:bg-black text-black dark:text-white"
        ref={containerRef}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--primary-color)] mb-16">
          Our Process
        </h2>

        <div className="relative w-full md:w-4/5 mx-auto">
          {/* Static gray line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-300 transform -translate-x-1/2 z-0" />

          {/* Animated progress line */}
          <motion.div
            style={{ height: timelineProgress }}
            className="absolute left-1/2 top-0 w-2 bg-[var(--primary-color)] transform -translate-x-1/2 z-10"
          />

          <div className="flex flex-col gap-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.4 }}
              >
                {/* Dot */}
                <div className="absolute left-1/2 top-1 w-5 h-5 bg-[var(--primary-color)] rounded-full shadow-md transform -translate-x-1/2 z-20 border-4 border-white dark:border-black" />

                {/* Content */}
                <div
                  className={`
                    w-[90%] sm:w-[70%] md:w-[48%]
                    ${
                      index % 2 === 0
                        ? "text-right mr-auto md:pr-0 pr-4 max-w-[calc(50%-1rem)]"
                        : "text-left ml-auto md:pl-0 pl-4 max-w-[calc(50%-1rem)]"
                    }
                  `}
                >
                  {/* Image */}
                  <motion.img
                    src={step.img}
                    alt={step.title}
                    className={`w-56 h-56 object-contain mb-3 ${
                      index % 2 === 0 ? "ml-auto" : "mr-auto"
                    }`}
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                  />

                  {/* Title */}
                  <motion.h3
                    className="text-xl font-bold text-[var(--primary-color)] mb-1"
                    variants={textVariants(1.5)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Content */}
                  <motion.p
                    className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    variants={textVariants(2.2)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.4 }}
                  >
                    {step.content}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OurProcess;
