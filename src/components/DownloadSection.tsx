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
    <div className="bg-white px-5 dark:bg-[var(--bg-color1)] text-black dark:text-white transition-colors duration-300">
      <div
        className="max-w-7xl mx-auto py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10"
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
            <span className="text-[var(--primary-color)] italic font-bold">
              Trade Big. Trade Smart.
            </span>
            <br />
            Trade Close Friends Traders
          </h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Take control of your trades with{" "}
            <strong>numerous global instruments</strong> including Forex,
            Indices, Commodities and Shares: all on one seamless platform.
            <br className="my-2" />
            With <span className="font-semibold">₹0 brokerage</span> and
            reliable <span className="font-semibold">payouts</span>, Close
            Friends Traders gives you the edge to trade smart and stay ahead.
            <br className="my-2" />
            Made for Indian traders who think sharp and trade sharper.
            <br className="my-2" />
          </p>
          <i className="font-semibold block text-gray-800 dark:text-gray-200">
            Close Friends Traders — Where serious trading begins.
          </i>
        </div>
      </div>
    </div>
  );
}
