import { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function WhyChooseUs() {
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
      title: "Upgraded Learning",
      desc: "Enhance your trading skills with strategies, guiding you toward financial success.",
      icon: "🧠",
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
    <div className="bg-black text-white py-16 px-4 relative">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          India&apos;s Most Trusted{" "}
          <span className="text-[var(--primary-color)] font-bold">
            Meta Trading Platform
          </span>
        </h2>
        <p className="text-gray-400 mb-12">
          Always enhancing our platform to be the top choice.
        </p>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative rounded-xl p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
              style={{
                background:
                  "linear-gradient(to bottom, #111, var(--primary-color))",
              }}
            >
              <div className="bg-black rounded-[10px] p-6 h-full flex flex-col items-center text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
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
                    <div className="mb-4 text-4xl">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

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
      </div>
    </div>
  );
}
