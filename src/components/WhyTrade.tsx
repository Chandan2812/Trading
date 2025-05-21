import React, { useRef, useState } from "react";
import {
  FaGlobe,
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaBolt,
  FaChartLine,
  FaExchangeAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const features = [
  {
    icon: <FaBolt size={30} className="text-[var(--primary-color)]" />,
    title: "Instant Trade Execution",
    desc: "Experience lightning-fast trade execution with minimal slippage.",
  },
  {
    icon: <FaExchangeAlt size={30} className="text-[var(--primary-color)]" />,
    title: "Low Spreads & Commissions",
    desc: "Trade with the most competitive spreads in the market.",
  },
  {
    icon: <FaShieldAlt size={30} className="text-[var(--primary-color)]" />,
    title: "Regulated and Secure",
    desc: "Trade with confidence on a platform that prioritizes security and compliance.",
  },
  {
    icon: <FaGlobe size={30} className="text-[var(--primary-color)]" />,
    title: "Access to Global Markets",
    desc: "Trade forex, indices, commodities, and more from one account.",
  },
  {
    icon: <FaMoneyCheckAlt size={30} className="text-[var(--primary-color)]" />,
    title: "Fast Withdrawal Processing",
    desc: "Enjoy quick and hassle-free withdrawals to get your funds when you need them.",
  },
  {
    icon: <FaChartLine size={30} className="text-[var(--primary-color)]" />,
    title: "MT5 Trading Platform",
    desc: "Trade on the world's leading trading platform with advanced tools.",
  },
];

const WhyTrade: React.FC = () => {
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
    <section className="bg-black text-white py-12 px-5">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Why{" "}
          <span className="text-[var(--primary-color)] font-bold">Trade</span>{" "}
          With Close Friends Traders?
        </h2>
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
            style={{
              background:
                "linear-gradient(to bottom, #111, var(--primary-color))",
            }}
          >
            <div className="bg-black rounded-lg p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden relative w-full px-0">
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out no-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              overflowX: "scroll",
            }}
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 scroll-snap-align-start px-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[var(--primary-color)] rounded-lg p-6 h-full">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            disabled={index === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10
    ${
      index === 0
        ? "bg-gray-800 cursor-not-allowed opacity-40"
        : "bg-black/70 hover:bg-black/90"
    }`}
          >
            <FaArrowLeft size={20} className="text-white" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll("right")}
            disabled={index === features.length - 1}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10
    ${
      index === features.length - 1
        ? "bg-gray-800 cursor-not-allowed opacity-40"
        : "bg-black/70 hover:bg-black/90"
    }`}
          >
            <FaArrowRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyTrade;
