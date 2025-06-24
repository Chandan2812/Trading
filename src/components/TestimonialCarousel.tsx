import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    // title: "My Trading Journey With Close Friends Traders",
    content:
      "Close Friends Traders transformed my trading over the past year: consistent profits, always-on payouts, zero hiccups.” ",
    date: "April 14, 2024",
    name: "Rohan Mehta",
  },
  {
    // title: "Feels Like Home",
    content:
      "I was new to trading, but the Close Friends Traders platform made it easy to learn and grow. The interface is smooth and support is always available.",
    date: "March 2, 2025",
    name: "Priya Sharma",
  },
  {
    // title: "Private, Profitable, Perfect",
    content:
      "What I love most? The 500× leverage and fast withdrawals. Close Friends Traders keeps things professional and powerful.",
    date: "January 28, 2025",
    name: "Aditya Verma",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
      <div className="max-w-5xl mx-auto py-12 px-4 text-center relative overflow-hidden">
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

        {/* <h3 className="text-xl font-bold mb-2">{testimonial.title}</h3> */}
        <p className="max-w-2xl mx-auto text-gray-700 dark:text-gray-300 mb-4">
          {testimonial.content}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
          {testimonial.date}
        </p>
        <p className="font-semibold text-primary-light dark:text-primary-dark">
          {testimonial.name}
        </p>

        {/* Desktop arrows (absolute) */}
        <div className="hidden md:flex">
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-light dark:bg-primary-dark text-[var(--primary-color)] flex items-center justify-center  hover:brightness-90 transition"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={60} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-light dark:bg-primary-dark text-[var(--primary-color)] flex items-center justify-center hover:brightness-90 transition"
            aria-label="Next testimonial"
          >
            <ChevronRight size={60} />
          </button>
        </div>

        {/* Mobile arrows (inline) */}
        <div className="flex md:hidden justify-between px-5 gap-4 mt-8">
          <button
            onClick={prev}
            className="bg-primary-light dark:bg-primary-dark text-black dark:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:brightness-90 transition"
            aria-label="Previous testimonial"
          >
            <span>
              <ChevronLeft />
            </span>
            Previous
          </button>
          <button
            onClick={next}
            className="bg-primary-light dark:bg-primary-dark text-black dark:text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:brightness-90 transition"
            aria-label="Next testimonial"
          >
            Next
            <span>
              <ChevronRight />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
