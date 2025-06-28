import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../index.css";
import { BarChart2, Clock3, CreditCard } from "lucide-react";

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
      desc: "Safeguard your investments with our trusted and secure payment options.",
      icon: <CreditCard className="w-6 h-6 text-primary" />,
    },
    {
      title: "Effortless Trading",
      desc: "New to trading or a seasoned pro?\n You’ll feel at home.",
      icon: <BarChart2 className="w-6 h-6 text-primary" />,
    },
    {
      title: "Real-Time Market Data",
      desc: "The insight you need. The second you need it.",
      icon: <Clock3 className="w-6 h-6 text-primary" />,
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
    <div className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white py-16 relative transition-colors duration-500">
      <div className="w-11/12 md:w-5/6 mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Redefining Trading for Everyone
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Built on trust. Powered by innovation. Chosen by serious traders.
        </p>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const boxAnimations = ["fade-down", "zoom-in", "fade-up"];
            const boxAnimation = boxAnimations[index % boxAnimations.length];
            const delay = index * 300;

            return (
              <div
                key={index}
                data-aos={boxAnimation}
                data-aos-delay={delay}
                className="relative rounded-xl p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition border border-[var(--primary-color)]"
              >
                <div
                  className="bg-white dark:bg-[var(--bg-color1)] rounded-[10px] p-6 h-full flex flex-col items-center text-center transition-colors duration-500"
                  data-aos="zoom-in"
                  data-aos-delay={delay + 400} // Inner content delay
                >
                  <div
                    className="text-5xl mb-4"
                    data-aos="zoom-in"
                    data-aos-delay={delay + 500}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className="text-lg font-semibold mb-2"
                    data-aos="zoom-in"
                    data-aos-delay={delay + 600}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap"
                    data-aos="zoom-in"
                    data-aos-delay={delay + 700}
                  >
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
                  <div className="bg-gray-100 dark:bg-[var(--bg-color1)] border border-[var(--primary-color)] rounded-lg p-6 h-full transition-colors duration-500">
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
