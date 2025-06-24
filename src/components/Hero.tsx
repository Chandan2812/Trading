import React from "react";
import videoBg from "../assets/WhatsApp Video 2025-06-11 at 20.07.38_9ca513e6.mp4"; // Replace with your actual video path
import { Typewriter } from "react-simple-typewriter";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] md:h-screen flex items-center mt-24 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 mx-auto flex flex-col justify-center text-left text-white space-y-8 max-w-7xl py-12 md:py-0">
        <h1 className="text-4xl font-semibold leading-tight text-start">
          <span className="block mb-2 text-white">
            500× Leverage. Zero Tax. No Brokerage.
            <br /> Just Pure Trading.
          </span>
          <span className="block text-[var(--primary-color)]">
            <Typewriter
              words={["NSE (F&O)", "MCX (F&O)", "Comex Future"]}
              loop={0}
              cursor
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h1>

        <button className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:bg-white shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit">
          Start Trading Now
        </button>

        {/* Features Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 text-sm sm:text-base font-medium pt-4">
          <div className="flex items-center gap-4">
            <span className="text-center sm:text-left leading-snug">
              Competitive Spreads <br className="hidden sm:block" />& Low
              Commissions
            </span>
            <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)]" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-center sm:text-left leading-snug">
              Trade on MT5 <br className="hidden sm:block" />
              with Real-Time Execution
            </span>
            <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)] opacity-60" />
          </div>
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
