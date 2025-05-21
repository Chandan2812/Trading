import { FaRupeeSign, FaRegFileAlt } from "react-icons/fa";
import { GiCutDiamond } from "react-icons/gi";
import girlImage from "../assets/girl.png"; // Replace with your actual path

export default function HowItWorks() {
  return (
    <div className="bg-black text-white px-5 py-16 ">
      {/* Left: Image */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="md:w-1/2 flex justify-center">
          <img
            src={girlImage}
            alt="Girl with phone"
            className="max-w-xs md:max-w-sm"
          />
        </div>

        {/* Right: Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            How It{" "}
            <span className="text-[var(--primary-color)] italic font-bold">
              Work?
            </span>
          </h2>
          <p className="text-gray-300 mb-8">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradise
          </p>

          {/* Steps */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white text-[var(--primary-color)] flex items-center justify-center text-xl">
                <FaRegFileAlt />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Quick Registration
                </h3>
                <p className="text-gray-300">
                  Sign up on the Close Friends Traders platform with minimal
                  documents — fast and easy setup.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white text-[var(--primary-color)] flex items-center justify-center text-xl">
                <FaRupeeSign />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Step 2: Fund Your Account
                </h3>
                <p className="text-gray-300">
                  Deposit money securely and get ready to start trading with
                  your close circle.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-white text-[var(--primary-color)] flex items-center justify-center text-xl">
                <GiCutDiamond />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--primary-color)]">
                  Step 3: Start Trading Instantly
                </h3>
                <p className="text-gray-300">
                  Execute trades with confidence and enjoy seamless trading
                  tailored for you and your trusted friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
