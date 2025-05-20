import React from "react";
import bg from "../assets/bg-earth-desktop.webp";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative min-h-[80vh] md:h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 w-full px-5 mx-auto flex flex-col justify-center text-left text-white space-y-8 max-w-7xl py-12 md:py-0">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          <span className="block mb-2">Together</span>
          <span className="text-[var(--primary-color)] block">We Grow!</span>
        </h1>

        {/* CTA Button */}
        <button className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:bg-white shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit">
          Start Trading
        </button>

        {/* Features Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 text-sm sm:text-base font-medium pt-4">
          {/* Feature 1 */}
          <div className="flex items-center gap-4">
            <span className="text-center sm:text-left leading-snug">
              Competitive Spreads <br className="hidden sm:block" />& Low
              Commissions
            </span>
            <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)]" />
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4">
            <span className="text-center sm:text-left leading-snug">
              Trade on MT5 <br className="hidden sm:block" />
              with Real-Time Execution
            </span>
            <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)] opacity-60" />
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4">
            <span className="text-center sm:text-left leading-snug">
              Fast Withdrawal <br className="hidden sm:block" />
              Processing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
