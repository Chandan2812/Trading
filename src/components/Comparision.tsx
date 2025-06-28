import React from "react";
import Slider from "react-slick";

const comparisonData = [
  {
    feature: "Sign-Up Time",
    cft: "5 seconds, no KYC hassle",
    others: "1 - 3 days, full KYC",
  },
  {
    feature: "Commission",
    cft: "0% commission",
    others: "High fees + Hidden costs",
  },
  { feature: "Leverage", cft: "500x margin", others: "5x–10x max" },
  { feature: "Withdrawals", cft: "Instant", others: "1–3 business days" },
  { feature: "Support", cft: "24×7 real human help", others: "Limited hours" },
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
    <section className="py-12 px-4 bg-white dark:bg-[#01001f] text-black dark:text-white transition-colors duration-300">
      <div className="w-11/12 md:w-5/6 mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
          The Proof that Sets{" "}
          <span className="text-[var(--primary-color)]">
            Close Friends Traders
          </span>{" "}
          Apart
        </h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:grid grid-cols-3 max-w-5xl mx-auto text-sm rounded-xl overflow-hidden shadow-xl border border-[var(--primary-color)]">
        {/* Header */}
        <div className="bg-gray-800 dark:bg-[#111132] text-white font-semibold text-center py-4 border-r border-gray-700">
          Features
        </div>
        <div className="bg-gray-700 dark:bg-[#1a1a42] text-white font-semibold text-center py-4 border-r border-gray-700">
          Close Friends Traders
        </div>
        <div className="bg-gray-900 dark:bg-[#0d0d26] text-white font-semibold text-center py-4">
          Others
        </div>

        {/* Rows */}
        {comparisonData.map((row, index) => {
          const isEven = index % 2 === 0;
          const baseBg = isEven ? "bg-[#0c0c2f]" : "bg-[#12123b]";
          return (
            <React.Fragment key={index}>
              <div
                className={`text-center py-4 px-2 border-t border-[var(--primary-color)] ${baseBg}  transition`}
              >
                {row.feature}
              </div>
              <div
                className={`text-center py-4 px-2 border-t border-[var(--primary-color)] ${baseBg} text-[var(--primary-color)] font-medium  transition`}
              >
                {row.cft}
              </div>
              <div
                className={`text-center py-4 px-2 border-t border-[var(--primary-color)] ${baseBg} text-gray-300 hover:bg-[#01001f] transition`}
              >
                {row.others}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden mt-10">
        <Slider {...sliderSettings}>
          {comparisonData.map((row, index) => (
            <div key={index} className="px-2">
              <div className="rounded-xl border border-[var(--primary-color)] shadow-lg bg-white dark:bg-[#0f0f2d] p-5 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {row.feature}
                  </h3>
                </div>

                <div className="rounded-lg overflow-hidden border border-[var(--primary-color)]">
                  <div className="flex items-center justify-between bg-gray-700 text-white px-4 py-3 dark:bg-[#1a1a42]">
                    <span className="font-medium">Close Friends Traders</span>
                    <span className="text-sm font-semibold">{row.cft}</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-[#01001f] text-gray-800 dark:text-gray-200 px-4 py-3">
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
