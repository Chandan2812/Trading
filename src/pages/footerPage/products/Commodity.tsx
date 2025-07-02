import {
  FaChartLine,
  FaPercentage,
  FaClock,
  FaDollarSign,
} from "react-icons/fa";

import cfdImage from "../../../assets/MCX.png";
import Navbar from "../../../components/Nav";
import PageBanner from "../../../components/BannerImage";
import Footer from "../../../components/Footer";

function Commodity() {
  const features = [
    {
      icon: <FaChartLine className="text-[var(--primary-color)] text-3xl" />,
      title: "Extensive Access to 30+ Commodity Markets",
      description:
        "Tap into global commodity markets all from one seamless platform.",
    },
    {
      icon: <FaDollarSign className="text-[var(--primary-color)] text-3xl" />,
      title: "Tight Spreads & Transparent Pricing",
      description:
        "Get the most out of every trade with competitive rates & zero hidden costs.",
    },
    {
      icon: <FaPercentage className="text-[var(--primary-color)] text-3xl" />,
      title: "Real-Time Data & Advanced Charting",
      description: "Trade confidently with real-time data and expert tools.",
    },
    {
      icon: <FaClock className="text-[var(--primary-color)] text-3xl" />,
      title: "Flexible, Around-the-Clock Trading",
      description:
        "Access key markets 24/7, giving you the freedom to trade anytime.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-20">
        <Navbar />
      </div>

      <PageBanner
        title="Commodity"
        subtitle="Tap into the world’s most valuable resources, trade commodities the smart way."
      />

      <section className="bg-white dark:bg-[--bg-color1] py-16 transition-colors duration-300 px-4 md:px-8 lg:px-32 flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          <img
            src={cfdImage}
            alt="CFD Illustration"
            className="w-full max-w-md mx-auto"
          />

          <div>
            <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
              Top Perks of Trading Commodity with <br />
              <span className="text-[var(--primary-color)]">
                Close Friends Traders
              </span>{" "}
            </h2>

            <ul className="space-y-6">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-black dark:text-gray-300"
                >
                  {feature.icon}
                  <div>
                    <p className="text-base font-semibold">{feature.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white dark:bg-[--bg-color1] transition-colors duration-300">
        <div className="relative max-w-5xl mx-auto">
          {/* Floating Label */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[--bg-color1] px-6 py-1 rounded-full border-2 border-[var(--primary-color)] text-[var(--primary-color)] font-semibold text-lg shadow-md z-10">
            Community
          </div>

          {/* Bordered Box */}
          <div className="border-2 border-[var(--primary-color)] rounded-2xl p-10 pt-14 text-center shadow-lg bg-white dark:bg-[--bg-color1]">
            <p className="text-xl md:text-2xl text-gray-800 dark:text-white font-medium mb-2">
              Join the{" "}
              <span className="text-[var(--primary-color)] font-semibold">
                Close Friends Traders
              </span>{" "}
              community to avail the benefits!
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
              Improving people’s financial lives through planning, trading, and
              earning!
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-[var(--primary-color)] text-white font-semibold rounded-full hover:bg-opacity-90 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Commodity;
