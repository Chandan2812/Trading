import { useState } from "react";
import { FaQuoteLeft, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    title: "My Trading Journey With Close Friends Traders",
    content:
      "I’ve been using Close Friends Traders for almost a year, and it completely changed my trading game. The platform is super easy, and profits are consistent. Trust is key — and here, it’s everything.",
    date: "April 14, 2024",
    name: "Rohan Mehta",
  },
  {
    title: "Feels Like Home",
    content:
      "Trading with Close Friends Traders feels personal. I get help when I need it, and the experience is smooth. Way better than public platforms. No noise, just profits.",
    date: "February 27, 2024",
    name: "Sana Shaikh",
  },
  {
    title: "Private, Profitable, Perfect",
    content:
      "Being part of this tight-knit group means fewer distractions and more returns. Withdrawals are quick and the support feels like family. Game changer!",
    date: "January 10, 2024",
    name: "Zaid Khan",
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const testimonial = testimonials[index];

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-black text-white">
      <div className="max-w-5xl mx-auto py-12 px-4 text-center relative overflow-hidden">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-8">
          What Our Traders Are{" "}
          <span className="text-[var(--primary-color)]">Saying</span>
        </h2>

        <div className="text-[var(--primary-color)] text-3xl flex justify-center mb-4 mx-auto">
          <FaQuoteLeft />
        </div>

        <div className="flex justify-center mb-4 text-yellow-400">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <FaStar key={i} />
            ))}
        </div>

        <h3 className="text-xl font-bold mb-2">{testimonial.title}</h3>
        <p className="max-w-2xl mx-auto text-gray-300 mb-4">
          {testimonial.content}
        </p>
        <p className="text-sm text-gray-400 mb-1">{testimonial.date}</p>
        <p className="text-[var(--primary-color)] font-semibold">
          {testimonial.name}
        </p>

        {/* Desktop arrows (absolute) */}
        <div className="hidden md:flex">
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)] text-black w-12 h-12 rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--primary-color)] text-black w-12 h-12 rounded-full flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Mobile arrows (inline) */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="bg-[var(--primary-color)] text-black w-12 h-12 rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={next}
            className="bg-[var(--primary-color)] text-black w-12 h-12 rounded-full flex items-center justify-center"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
