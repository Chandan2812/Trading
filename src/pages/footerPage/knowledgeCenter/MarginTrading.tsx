import {
  Scale, // For High Leverage Ratios
  SlidersHorizontal, // For Flexible Margin Requirements
  LifeBuoy, // For Risk Management Tools
  Gauge, // For Real-time Margin Monitoring
  BookOpenCheck, // For Educational Resources
  ShieldX, // For Negative Balance Protection
} from "lucide-react";
import PageBanner from "../../../components/BannerImage";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Nav";
import cfdImage from "../../../assets/Margin Trading.png";

function MarginTrading() {
  const features = [
    {
      icon: <Scale className="text-[var(--primary-color)] w-8 h-8" />,
      text: "Margin trading volumes in India crossed ₹80,000 crore by October 2024.",
    },
    {
      icon: (
        <SlidersHorizontal className="text-[var(--primary-color)] w-8 h-8" />
      ),
      text: "Margin trading grew at 70% CAGR since FY 2022.",
    },
    {
      icon: <LifeBuoy className="text-[var(--primary-color)] w-8 h-8" />,
      text: "Retail margin funding surged 90% to ₹54,537 crore by January 2024.",
    },
    {
      icon: <Gauge className="text-[var(--primary-color)] w-8 h-8" />,
      text: "Traders can access up to 500x leverage on select instruments.",
    },
    {
      icon: <BookOpenCheck className="text-[var(--primary-color)] w-8 h-8" />,
      text: "Negative balance protection limits losses to deposited capital.",
    },
    {
      icon: <ShieldX className="text-[var(--primary-color)] w-8 h-8" />,
      text: "Real-time margin tracking helps avoid forced liquidation.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-20">
        <Navbar />
      </div>

      <PageBanner
        title="Margin Trading"
        subtitle="Amplify your reach with up to 500x leverage. Bigger trades, smarter execution."
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
              Margin Trading Insights
            </h2>

            <ul className="space-y-6">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 text-black dark:text-gray-300"
                >
                  {feature.icon}
                  <p className="text-base">{feature.text}</p>
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

export default MarginTrading;
