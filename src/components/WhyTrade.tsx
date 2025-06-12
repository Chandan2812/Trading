import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import zero from "../assets/whyTrade/zero.png";
import fivex from "../assets/whyTrade/500x.png";
import zeroTax from "../assets/whyTrade/Tax.png"; // Add this image
import register from "../assets/whyTrade/register.png"; // Add this image
import withdrawal from "../assets/whyTrade/withdrawl.png"; // Add this image
import support from "../assets/whyTrade/support.png"; // Add this image
import security from "../assets/whyTrade/security.png"; // Add this image
import payments from "../assets/whyTrade/payment.png"; // Add this image
import traders from "../assets/whyTrade/HappyTraders.png"; // Add this image

const features = [
  {
    icon: (
      <img
        src={zero}
        alt="Zero Brokerage"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "0% Brokerage",
    desc: "Trade with zero brokerage and maximize every rupee of your investment without any hidden fees or commissions.",
  },
  {
    icon: (
      <img
        src={fivex}
        alt="500X Margin"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "500X Margin",
    desc: "Boost your trading potential with 500x leverage and unlock larger opportunities using minimal capital.",
  },
  {
    icon: (
      <img
        src={zeroTax}
        alt="0 Tax"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "0 Tax",
    desc: "Enjoy tax-free trading with no additional charges on your profits or withdrawals—full earnings in your pocket.",
  },
  {
    icon: (
      <img
        src={register}
        alt="Register in 10 Sec"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "Register in 10 Sec",
    desc: "Sign up instantly using just your name and phone number—quick, secure, and ready to trade in seconds.",
  },
  {
    icon: (
      <img
        src={withdrawal}
        alt="Instant Withdrawals"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "Instant Withdrawals",
    desc: "Deposit and withdraw your funds instantly without delays, ensuring a smooth and uninterrupted trading journey.",
  },
  {
    icon: (
      <img
        src={support}
        alt="24×7 Support"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "24×7 Support",
    desc: "Reach out to our dedicated support team any time, day or night, for real-time help with your trades.",
  },
  {
    icon: (
      <img
        src={security}
        alt="Data Security"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "Data Security",
    desc: "Your information is protected with cutting-edge encryption to keep your data safe, private, and fully secure.",
  },
  {
    icon: (
      <img
        src={payments}
        alt="Multiple Payments"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "Multiple Payment Methods",
    desc: "Choose from a variety of trusted payment methods to fund your trades quickly and with complete flexibility.",
  },
  {
    icon: (
      <img
        src={traders}
        alt="Happy Traders"
        className="h-[70px] w-[70px] object-contain"
      />
    ),
    title: "Happy Traders",
    desc: "Join thousands of satisfied traders on a trusted platform with 15 years of seamless experiences, quick payouts, and profitable trading.",
  },
];

const WhyTrade: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    setTimeout(() => AOS.refresh(), 100);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cardWidth = container.offsetWidth;
    const newIndex = direction === "left" ? index - 1 : index + 1;
    setIndex(newIndex);
    container.scrollTo({ left: newIndex * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-white dark:bg-black text-black dark:text-white py-12 px-5 transition-colors duration-300">
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
            className="relative rounded-lg p-[1.5px] bg-gradient-to-b from-gray-200 to-[var(--primary-color)] dark:from-[#111] dark:to-[var(--primary-color)] hover:shadow-[0_0_10px_var(--primary-color)] transition"
            data-aos="zoom-in"
          >
            <div className="bg-white dark:bg-black rounded-lg p-6 transition-colors duration-300">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="sm:hidden relative w-full px-0 mt-10">
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
                <div className="bg-white dark:bg-gradient-to-br dark:from-[#111] dark:to-[#1a1a1a] border border-[var(--primary-color)] rounded-lg p-6 h-full transition-colors duration-300">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {index > 0 && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 bg-black/10 dark:bg-black/70 hover:dark:bg-black/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}

          {index < features.length - 1 && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-10 bg-black/10 dark:bg-black/70 hover:dark:bg-black/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black dark:text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyTrade;
