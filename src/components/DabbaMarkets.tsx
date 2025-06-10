import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const markets = [
  {
    title: "NSE(Futures and Options)",
    description:
      "India's leading derivatives exchange offering futures & options (F&O) trading across equities, indices, currencies, and commodities.",
    button: "Learn more",
    icon: "fa-solid fa-bag-shopping",
    image: "https://www.arrowtradefx.com/assets/images/svg/shares.svg",
  },
  {
    title: "MCX",
    description:
      "India's premier commodity derivatives exchange facilitating futures trading in bullion, metals, energy, and agricultural commodities",
    button: "Learn more",
    icon: "fa-solid fa-clipboard-list",
    image: "https://www.arrowtradefx.com/assets/images/svg/commodities.svg",
  },
  {
    title: "Cryptos",
    description:
      "Decentralized digital currencies powered by blockchain technology, enabling secure, peer-to-peer transactions without intermediaries.",
    button: "Learn more",
    icon: "fa-brands fa-bitcoin",
    image: "https://www.arrowtradefx.com/assets/images/svg/futures.svg",
  },
  {
    title: "Us Stocks & Indices",
    description:
      "Trade US stocks and major indices (like S&P 500, Nasdaq, and Dow Jones) for global exposure and diversified investment opportunities.",
    button: "Learn more",
    icon: "fa-solid fa-arrow-trend-up",
    image:
      "https://www.arrowtradefx.com/assets/images/svg/cryptocurrencies.svg",
  },
  {
    title: "Forex",
    description:
      "Trade global currency pairs (Forex) to capitalize on exchange rate fluctuations in the world's largest financial market.",
    button: "Read More",
    icon: "fa-solid fa-scale-balanced",
    image: "https://www.arrowtradefx.com/assets/images/svg/forex.svg",
  },
  {
    title: "Comex",
    description:
      "The world's leading marketplace for metals futures & options trading, including gold, silver, copper, and aluminum.",
    button: "Read More",
    icon: "fa-solid fa-chart-line",
    image: "https://www.arrowtradefx.com/assets/images/svg/indices.svg",
  },
];

const DabbaMarkets: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: true, // animate only once
    });
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.offsetWidth;

    const newIndex = direction === "left" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= markets.length) return;

    setIndex(newIndex);
    container.scrollTo({
      left: newIndex * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">
          Available Dabba Trading:{" "}
          <span className="text-[#71ced0] italic">Markets</span>
        </h2>
        <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradise
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="mt-12 hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {markets.map((market, index) => (
          <div
            key={index}
            className="relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
            style={{
              background:
                "linear-gradient(to bottom, #111, var(--primary-color))",
            }}
            data-aos="fade-up"
          >
            <div className="bg-black rounded-lg h-full p-6 flex flex-col items-center justify-center text-center min-h-[260px]">
              <img
                src={market.image}
                alt={market.title}
                className="w-14 h-14 mb-4 p-1 object-contain bg-[var(--primary-color)] rounded-full"
                draggable="false"
              />
              <h3 className="text-lg font-bold mb-2">{market.title}</h3>
              <p className="text-sm text-gray-400">{market.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden relative w-full mt-10">
        <div className="relative overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out no-scrollbar"
            style={{
              scrollSnapType: "x mandatory",
              overflowX: "scroll",
            }}
          >
            {markets.map((market, i) => (
              <div
                key={i}
                className="w-full flex-shrink-0 scroll-snap-align-start px-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[var(--primary-color)] rounded-lg p-6 h-full text-center">
                  <img
                    src={market.image}
                    alt={market.title}
                    className="w-12 h-12 mb-4 p-1 object-contain bg-[var(--primary-color)] rounded-full mx-auto"
                    draggable="false"
                  />
                  <h3 className="text-lg font-bold mb-2">{market.title}</h3>
                  <p className="text-sm text-gray-400">{market.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => handleScroll("left")}
            disabled={index === 0}
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 ${
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
            disabled={index === markets.length - 1}
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 ${
              index === markets.length - 1
                ? "bg-gray-800 cursor-not-allowed opacity-40"
                : "bg-black/70 hover:bg-black/90"
            }`}
          >
            <FaArrowRight size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DabbaMarkets;
