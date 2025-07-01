import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePopup } from "../components/PopupContext";

const markets = [
  {
    title: "NSE(F&O)",
    description: "Equities, indices, currencies",
    image: "https://www.arrowtradefx.com/assets/images/svg/shares.svg",
  },
  {
    title: "MCX",
    description: "Commodities like gold, oil, agri products",
    image: "https://www.arrowtradefx.com/assets/images/svg/commodities.svg",
  },
  {
    title: "Crypto",
    description: "Secure access to digital currencies",
    image: "https://www.arrowtradefx.com/assets/images/svg/futures.svg",
  },
  {
    title: "US Stocks & Indices ",
    description: "Nasdaq, S&P 500, Dow Jones",
    image:
      "https://www.arrowtradefx.com/assets/images/svg/cryptocurrencies.svg",
  },
  {
    title: "Forex",
    description: "Major, minor, and exotic currency pairs",
    image: "https://www.arrowtradefx.com/assets/images/svg/forex.svg",
  },
  {
    title: "Comex",
    description: "Precious and industrial metal futures",
    image: "https://www.arrowtradefx.com/assets/images/svg/indices.svg",
  },
];

const DabbaMarkets: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800, // animation duration in ms
      once: false, // animate only once
    });
  }, []);
  const { openPopup } = usePopup();

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
    <div className=" bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white py-12">
      <div className="w-11/12 md:w-5/6 mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          <span className="text-[#71ced0] italic">Markets </span>We Offer
        </h2>
        <p className="mt-2  max-w-2xl mx-auto">
          Explore and trade across these markets confidently:
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="mt-12 hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 md:w-5/6 mx-auto ">
        {markets.map((market, index) => (
          <div
            key={index}
            className="relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
            style={{
              background:
                "linear-gradient(to bottom, #111, var(--primary-color))",
            }}
            data-aos="flip-left"
            data-aos-delay={index * 250} // 👉 staggered delay (150ms apart)
            data-aos-duration="1000"
          >
            <div className="bg-white dark:bg-[var(--bg-color1)] rounded-lg h-full p-6 flex flex-col items-center justify-center text-center min-h-[240px]">
              <img
                src={market.image}
                alt={market.title}
                className="w-14 h-14 mb-4 p-1 object-contain bg-[var(--primary-color)] rounded-full"
                draggable="false"
              />
              <h3 className="text-lg font-bold mb-2">{market.title}</h3>
              <p className="text-sm text-gray-400">{market.description}</p>
              <a
                href={`/markets/${market.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "")}`}
                className="text-sm mt-5 px-4 py-1 rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black transition"
              >
                Explore
              </a>
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
                <div className="bg-gray-100 dark:bg-[var(--bg-color1)] border border-[var(--primary-color)] rounded-lg p-6 h-full text-center">
                  <img
                    src={market.image}
                    alt={market.title}
                    className="w-12 h-12 mb-4 p-1 object-contain bg-[var(--primary-color)] rounded-full mx-auto"
                    draggable="false"
                  />
                  <h3 className="text-lg font-bold mb-2">{market.title}</h3>
                  <p className="text-sm text-gray-400">{market.description}</p>
                  <a
                    href={`/markets/${market.title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/^-+|-+$/g, "")}`}
                    className="text-sm px-4 py-1 rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-black transition"
                  >
                    Explore
                  </a>
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
    </div>
  );
};

export default DabbaMarkets;
