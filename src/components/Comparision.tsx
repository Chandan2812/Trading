import React from "react";
import Slider from "react-slick";

const comparisonData = [
  {
    feature: "Sign-Up Time",
    cft: "5 seconds, no KYC hassle",
    others: "1 - 3 days, full KYC",
  },
  {
    feature: "Brokerage",
    cft: "0% brokerage",
    others: "High fees + hidden costs",
  },
  {
    feature: "Leverage",
    cft: "500x margin",
    others: "5x–10x max",
  },
  {
    feature: "Withdrawals",
    cft: "Instant",
    others: "1–3 business days",
  },
  {
    feature: "Support",
    cft: "24×7 real human help",
    others: "Limited hours",
  },
];

const ComparisonSection = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
  };

  return (
    <section className="py-10 px-5 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold">
          Your Money Deserves Better{" "}
          <span className="text-[var(--primary-color)]">|</span> See the{" "}
          <span className="text-[var(--primary-color)] italic font-bold">
            CFT Advantage
          </span>
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:grid grid-cols-3 max-w-5xl mx-auto border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm text-sm">
        <div className="bg-gray-100 dark:bg-[#111] font-bold text-center py-4 border-r border-gray-300 dark:border-gray-800">
          Features
        </div>
        <div className="bg-gray-100 dark:bg-[#111] text-white font-bold text-center py-4 border-r border-gray-300 dark:border-gray-800">
          Close Friends Traders
        </div>
        <div className="bg-gray-100 dark:bg-[#111] font-bold text-center py-4">
          Others
        </div>

        {comparisonData.map((row, index) => (
          <React.Fragment key={index}>
            <div className="text-center py-4 px-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-black">
              {row.feature}
            </div>
            <div className="text-center py-4 px-2 border-t border-gray-200 dark:border-gray-700 bg-[var(--primary-color)/10] dark:bg-[var(--primary-color)/20] font-medium">
              {row.cft}
            </div>
            <div className="text-center py-4 px-2 border-t border-gray-200 dark:border-gray-700">
              {row.others}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="md:hidden mt-10">
        <Slider {...sliderSettings}>
          {comparisonData.map((row, index) => (
            <div key={index} className="px-3">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-[#111] p-5">
                <div className="text-center mb-4">
                  <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
                    {row.feature}
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* CFT */}
                  <div className="flex items-center justify-between bg-[var(--primary-color)] text-white rounded-lg px-4 py-3">
                    <span className="font-medium">Close Friends Traders</span>
                    <span className="text-sm font-semibold">{row.cft}</span>
                  </div>

                  {/* Others */}
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium">Others</span>
                    <span className="text-sm font-semibold">{row.others}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ComparisonSection;
