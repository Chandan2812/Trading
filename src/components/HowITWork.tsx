import { FaRupeeSign, FaRegFileAlt } from "react-icons/fa";
import { GiCutDiamond } from "react-icons/gi";
import girlImage from "../assets/1.png"; // Update path if needed
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePopup } from "../components/PopupContext";

export default function HowItWorks() {
  const { openPopup } = usePopup();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white px-5 py-10 transition-colors duration-300">
      <div className="w-11/12 md:w-5/6 mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left: Image */}
        <div className="md:w-1/3 justify-center hidden md:flex">
          <img
            src={girlImage}
            alt="Close Friends Traders"
            className="max-w-xs md:max-w-sm"
            draggable="false"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-2/3">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
            How{" "}
            <span className="text-[var(--primary-color)] italic font-bold">
              Close Friends Traders{" "}
            </span>
            Works in 3 Simple Steps?
          </h2>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4" data-aos="fade-right">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center text-xl">
                <FaRegFileAlt />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Step 1: Join in under 5 Sec
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Sign up with just the essentials, no paperwork hassle. Get
                  started instantly.
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
                  Add funds securely through trusted payment methods and start
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
                  Start trading instantly with real-time tools and more. Because
                  trading is better with close friends.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4" data-aos="fade-right">
              <button
                onClick={openPopup}
                className=" mt-5 bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit"
              >
                Start Trading Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
