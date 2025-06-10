import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../index.css";

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const features = [
    {
      title: "Secure Transactions",
      desc: "Protect your investments with our trusted and secure payment options.",
      icon: "💳",
    },
    {
      title: "User-Friendly Trading",
      desc: "Trade assets with ease on our platform, suitable for all skill levels.",
      icon: "📈",
    },

    {
      title: "Immediate Support",
      desc: "Our dedicated trading team is on standby to guide you smoothly through your trades.",
      icon: "🎧",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.offsetWidth;
    const newIndex = direction === "left" ? index - 1 : index + 1;
    setIndex(newIndex);

    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white py-16 px-4 relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          India&apos;s Most Trusted{" "}
          <span className="text-[var(--primary-color)] font-bold">
            Meta Trading Platform
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Always enhancing our platform to be the top choice.
        </p>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-xl p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition bg-gradient-to-b from-gray-200 to-[var(--primary-color)] dark:from-[#111] dark:to-[var(--primary-color)]"
              data-aos="zoom-in"
            >
              <div className="bg-white dark:bg-black rounded-[10px] p-6 h-full flex flex-col items-center text-center transition-colors duration-500">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="sm:hidden relative w-full px-0">
          <div className="relative overflow-hidden">
            <div
              ref={containerRef}
              className="flex overflow-x-scroll overflow-y-hidden scroll-smooth no-scrollbar transition-transform duration-500 ease-in-out"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="w-full flex-shrink-0 scroll-snap-align-start px-4"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#111] dark:to-[#1a1a1a] border border-[var(--primary-color)] rounded-lg p-6 h-full transition-colors duration-500">
                    <div className="mb-4 text-4xl">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <button
              onClick={() => handleScroll("left")}
              disabled={index === 0}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 transition
              ${
                index === 0
                  ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed opacity-40"
                  : "bg-gray-200 dark:bg-black/70 hover:dark:bg-black/90 hover:bg-gray-300"
              }`}
            >
              <FaArrowLeft size={20} className="text-black dark:text-white" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => handleScroll("right")}
              disabled={index === features.length - 1}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 transition
              ${
                index === features.length - 1
                  ? "bg-gray-300 dark:bg-gray-800 cursor-not-allowed opacity-40"
                  : "bg-gray-200 dark:bg-black/70 hover:dark:bg-black/90 hover:bg-gray-300"
              }`}
            >
              <FaArrowRight size={20} className="text-black dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
