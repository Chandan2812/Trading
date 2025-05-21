import React from "react";

const markets = [
  {
    title: "Forex",
    description:
      "Trade metals, energy, and agriculture & Maximize returns with enhanced exposure.",
    button: "Read More",
    icon: "fa-solid fa-scale-balanced",
    image: "https://www.arrowtradefx.com/assets/images/svg/forex.svg", // ✅ add this
  },
  {
    title: "FOREX Trading Partner",
    description:
      "Global Currencies: Trade international currency pairs & Save on hidden fees and charges.",
    button: "Read More",
    icon: "fa-solid fa-chart-line",
    image: "https://www.arrowtradefx.com/assets/images/svg/indices.svg", // ✅ add this
  },
  {
    title: "Futures and Options",
    description:
      "Maximize exposure with minimal capital & Trade indices, stocks, and commodities.",
    button: "Learn more",
    icon: "fa-solid fa-bag-shopping",
    image: "https://www.arrowtradefx.com/assets/images/svg/shares.svg", // ✅ add this
  },
  {
    title: "Margin Trading Market",
    description:
      "Trade bigger with minimal capital.Save time and costs & Enter and exit positions with ease.",
    button: "Learn more",
    icon: "fa-solid fa-clipboard-list",
    image: "https://www.arrowtradefx.com/assets/images/svg/commodities.svg", // ✅ add this
  },
  {
    title: "CRYPTO Online Dabba Trading",
    description:
      "Popular Cryptos: Trade Bitcoin, Ethereum and more, Save on hidden fees and charges",
    button: "Learn more",
    icon: "fa-brands fa-bitcoin",
    image: "https://www.arrowtradefx.com/assets/images/svg/futures.svg", // ✅ add this
  },
  {
    title: "Intraday Trading Market",
    description:
      "Fast Execution: Trade instantly for quick profits Low Cost: Save with minimum transaction fees.",
    button: "Learn more",
    icon: "fa-solid fa-arrow-trend-up",
    image:
      "https://www.arrowtradefx.com/assets/images/svg/cryptocurrencies.svg", // ✅ add this
  },
];

const DabbaMarkets: React.FC = () => {
  return (
    <div className="bg-gradient-to-br bg-black  text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Available Dabba Trading :{" "}
          <span className="text-[#71ced0] italic">Markets</span>
        </h2>
        <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
          A small river named Duden flows by their place and supplies it with
          the necessary regelialia. It is a paradise
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {markets.map((market, index) => (
          <div
            key={index}
            className="relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
            style={{
              background:
                "linear-gradient(to bottom, #111, var(--primary-color))",
              // Optional: define --primary-color if not set globally
              // '--primary-color': '#71ced0'
            }}
          >
            <div className="bg-black rounded-lg h-full p-6 flex flex-col items-center justify-center text-center min-h-[260px]">
              <div className="text-[#71ced0] text-3xl mb-4">
                <img
                  src={market.image}
                  alt={market.title}
                  className="w-10 h-10 mb-2 p-1 object-contain bg-[var(--primary-color)] rounded-full"
                />{" "}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                {market.title}
              </h3>
              <p className="text-sm text-gray-400">{market.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DabbaMarkets;
