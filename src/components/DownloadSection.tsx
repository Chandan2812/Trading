import { FaWindows, FaApple, FaAndroid } from "react-icons/fa";
import gif from "../assets/trading-gif.gif"; // ✅ new gif
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function DownloadSection() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div
        className="max-w-7xl mx-auto px-5 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
        data-aos="fade-up"
      >
        {/* Left: GIF */}
        <div className="md:w-1/2 flex justify-center ">
          <img
            src={gif}
            alt="MetaTrader Devices"
            className="max-w-[90%] md:max-w-full "
            draggable="false"
          />
        </div>

        {/* Right: Text & Buttons */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Hey Traders! <br />
            Ready to Trade on{" "}
            <span className="text-[var(--primary-color)]">MetaTrader 5</span>?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Whether you're into Forex, Indices, Shares, or Commodities —
            MetaTrader 5 has got you covered. You’ll get access to over{" "}
            <span className="font-semibold">1,500+ instruments</span>, and you
            can trade smoothly on any device you like.
            <br />
            Start with as little as <span className="font-semibold">$100</span>,
            or just test the waters with a{" "}
            <span className="font-semibold">risk-free Demo Account</span>. No
            pressure, just pure trading freedom.
          </p>

          <div className="flex flex-wrap gap-4">
            {/* Windows */}
            <a
              href="#"
              className="flex items-center gap-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full px-5 py-2 hover:bg-[var(--primary-color)] hover:text-white dark:hover:text-black transition shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaWindows /> Download for Windows
            </a>

            {/* iOS */}
            <a
              href="#"
              className="flex items-center gap-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full px-5 py-2 hover:bg-[var(--primary-color)] hover:text-white dark:hover:text-black transition shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaApple /> Download for iOS
            </a>

            {/* Android */}
            <a
              href="#"
              className="flex items-center gap-2 border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full px-5 py-2 hover:bg-[var(--primary-color)] hover:text-white dark:hover:text-black transition shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaAndroid /> Download for Android
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
