import gif from "../assets/trading-gif.gif"; // ✅ new gif
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { usePopup } from "../components/PopupContext";

export default function DownloadSection() {
  const { openPopup } = usePopup();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white transition-colors duration-300">
      <div
        className="w-11/12 md:w-5/6 mx-auto py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
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
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
            Grow Your Money with{" "}
            <span className="text-[var(--primary-color)] italic font-bold">
              Close Friends Traders
            </span>
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Access global markets like Forex, Indices, Commodities, and Shares,
            all from one powerful platform. Enjoy ₹0 commission, up to 500x
            leverage, and instant, reliable payouts that put you in full
            control. No hidden fees. No unnecessary delays.
          </p>
          <i className="font-semibold block text-gray-800 dark:text-gray-200">
            Close Friends Traders — Designed for Traders Who Mean Business.
          </i>

          <button
            onClick={openPopup}
            className="mt-5 bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit"
          >
            Start Trading Now
          </button>
        </div>
      </div>
    </div>
  );
}
