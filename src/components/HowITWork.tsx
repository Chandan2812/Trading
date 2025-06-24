import { FaRupeeSign, FaRegFileAlt } from "react-icons/fa";
import { GiCutDiamond } from "react-icons/gi";
import girlImage from "../assets/1.png"; // Update path if needed
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HowItWorks() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white px-5 py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Image */}
        <div className="md:w-1/2 justify-center hidden md:flex">
          <img
            src={girlImage}
            alt="Girl with phone"
            className="max-w-xs md:max-w-sm"
            draggable="false"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            How It{" "}
            <span className="text-[var(--primary-color)] italic font-bold">
              Works?
            </span>
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradise.
          </p>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4" data-aos="fade-right">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-xl">
                <FaRegFileAlt />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Step 1: Join in Seconds
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Sign up with just the essentials, no paperwork hassle. Get
                  started in less than a minute.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4" data-aos="fade-right">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-xl">
                <FaRupeeSign />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Step 2: Fund Your Wallet
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Add funds securely through trusted payment methods and fuel
                  your trading journey.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4" data-aos="fade-right">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-xl">
                <GiCutDiamond />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Step 3: Trade with Your Inner Circle
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Start trading instantly with real-time tools, smart analytics,
                  and a platform designed for trusted circles. Because trading
                  is better with close friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
