import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    content:
      "Close Friends Traders transformed my trading over the past year: consistent profits, always-on payouts, zero hiccups. ",
    date: "April 14, 2024",
    name: "Rohan Mehta",
  },
  {
    content:
      "I was new to trading, but the Close Friends Traders platform made it easy to learn and grow. The interface is smooth and support is always available.",
    date: "March 2, 2025",
    name: "Priya Sharma",
  },
  {
    content:
      "What I love most? The 500× leverage and fast withdrawals. Close Friends Traders keeps things professional and powerful.",
    date: "January 28, 2025",
    name: "Aditya Verma",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("left");

  const paginate = (dir: "left" | "right") => {
    setDirection(dir);
    setIndex((prev) =>
      dir === "left"
        ? (prev - 1 + testimonials.length) % testimonials.length
        : (prev + 1) % testimonials.length
    );
  };

  const slideVariants = {
    initial: (dir: "left" | "right") => ({
      x: dir === "right" ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  const testimonial = testimonials[index];

  return (
    <div className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white transition-colors duration-500">
      <div className="w-11/12 md:w-5/6 mx-auto py-12 text-center relative overflow-hidden">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
          Hear from Our Traders
        </h2>

        <div className="text-primary-light dark:text-primary-dark text-3xl flex justify-center mb-4 mx-auto">
          <FaQuoteLeft />
        </div>

        <div className="flex justify-center mb-4 text-yellow-400">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>

        {/* Animated Testimonial Block */}
        <div className="relative min-h-[140px]">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              className="absolute inset-0"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              custom={direction}
            >
              <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-4">
                {testimonial.content}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {testimonial.date}
              </p>
              <p className="font-semibold text-primary-light dark:text-primary-dark">
                {testimonial.name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop Arrows */}
        <div className="hidden md:flex">
          <button
            onClick={() => paginate("left")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-light dark:bg-primary-dark text-[var(--primary-color)] flex items-center justify-center hover:brightness-90 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={60} />
          </button>
          <button
            onClick={() => paginate("right")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-light dark:bg-primary-dark text-[var(--primary-color)] flex items-center justify-center hover:brightness-90 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={60} />
          </button>
        </div>

        {/* Mobile Arrows */}
        {/* Mobile Navigation Buttons */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <button
            onClick={() => paginate("left")}
            className="px-5 py-2 bg-[var(--primary-color)] text-white rounded-full text-sm font-medium shadow hover:brightness-110 transition"
          >
            ← Previous
          </button>
          <button
            onClick={() => paginate("right")}
            className="px-5 py-2 bg-[var(--primary-color)] text-white rounded-full text-sm font-medium shadow hover:brightness-110 transition"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
