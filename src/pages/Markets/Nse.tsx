import Footer from "../../components/Footer";
import Navbar from "../../components/Nav";
import {
  FaChartLine,
  FaCogs,
  FaUserShield,
  FaExclamationTriangle,
  FaUniversity,
  FaListAlt,
  FaUsers,
  FaTools,
} from "react-icons/fa";
import { usePopup } from "../../components/PopupContext";

const NSEFOInfo = () => {
  const { openPopup } = usePopup();

  const sectionStyle =
    "bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white py-10 w-11/12 md:w-5/6 mx-auto space-y-12";
  const headingStyle =
    "text-2xl md:text-3xl font-semibold mb-4 flex items-center gap-2 border-b pb-2 border-[var(--primary-color)]";
  const bulletStyle = "list-disc list-inside space-y-2 text-sm md:text-base";
  const subheadingStyle =
    "text-lg font-semibold mt-6 mb-2 text-[var(--primary-color)]";

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-28">
        <Navbar />
      </div>
      <section className={sectionStyle}>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            What is NSE F&O?
          </h1>
          <p className="text-center max-w-3xl mx-auto">
            NSE F&O refers to the Futures and Options segment of the National
            Stock Exchange (NSE) in India. It’s a part of the derivatives
            market, where contracts derive their value from underlying assets
            like stocks, indices, or commodities.
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={openPopup}
              className="bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              Start Trading Now
            </button>
          </div>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaChartLine /> Key Components
          </h2>
          <h3 className={subheadingStyle}>1. Futures Contracts</h3>
          <ul className={bulletStyle}>
            <li>
              A futures contract is an agreement to buy or sell an asset at a
              predetermined price on a future date.
            </li>
            <li>
              <strong>Example:</strong> You buy a futures contract of Reliance
              at ₹2,800 expiring in July. Regardless of the actual market price
              in July, the contract binds you to buy at ₹2,800.
            </li>
            <li>Used for speculation or hedging.</li>
          </ul>
          <h3 className={subheadingStyle}>2. Options Contracts</h3>
          <ul className={bulletStyle}>
            <li>
              An options contract gives the right, but not the obligation, to
              buy or sell an asset at a certain price on or before expiry.
            </li>
            <li>
              <strong>Call Option:</strong> Right to buy
            </li>
            <li>
              <strong>Put Option:</strong> Right to sell
            </li>
            <li>Buyers pay a premium to sellers for this right.</li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaCogs /> How NSE F&O Works
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 dark:bg-gray-800 text-left">
                <tr>
                  <th className="p-2">Feature</th>
                  <th className="p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Underlying Assets: Stocks, indices (like NIFTY, BANKNIFTY), commodities",
                  "Lot Size: Fixed quantity per contract (e.g., 75 shares of Infosys)",
                  "Expiry: Contracts expire on the last Thursday of the month",
                  "Margins: Traders must deposit a margin to trade (not full amount)",
                  "Settlement: Cash-settled (no actual delivery of shares)",
                ].map((item, idx) => {
                  const [feature, ...desc] = item.split(": ");
                  return (
                    <tr
                      key={idx}
                      className="border-t border-gray-300 dark:border-gray-700"
                    >
                      <td className="p-2 font-medium text-[var(--primary-color)]">
                        {feature}
                      </td>
                      <td className="p-2">{desc.join(": ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaUserShield /> Why Do Traders Use F&O?
          </h2>
          <ul className={bulletStyle}>
            <li>
              <strong> Hedging:</strong> To protect against price fluctuations
              (e.g., hedge long positions using puts).
            </li>
            <li>
              <strong> Speculation:</strong> Control larger positions with
              smaller capital.
            </li>
            <li>
              <strong> Arbitrage:</strong> Profit from price differences between
              spot and futures markets.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaExclamationTriangle /> Risks Involved
          </h2>
          <ul className={bulletStyle}>
            <li>High Volatility: Prices can swing rapidly.</li>
            <li>Leverage Risk: While profits can be large, so can losses.</li>
            <li>
              Expiry Risk: If the trade doesn’t move in your favor before
              expiry, you lose.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaListAlt /> Popular NSE F&O Instruments
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Index Derivatives:</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>NIFTY 50</li>
                <li>BANKNIFTY</li>
                <li>FINNIFTY</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">
                Stock Derivatives (Top Traded):
              </h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Reliance Industries</li>
                <li>HDFC Bank</li>
                <li>Infosys</li>
                <li>TCS</li>
                <li>ICICI Bank</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaUsers /> Who Can Trade in F&O?
          </h2>
          <ul className={bulletStyle}>
            <li>Retail traders</li>
            <li>Institutions (FIIs, DIIs)</li>
            <li>HNIs (High Net-worth Individuals)</li>
            <li>Corporates (for hedging)</li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaTools /> Platforms for Trading NSE F&O
          </h2>
          <ul className={bulletStyle}>
            <li>Zerodha (Kite)</li>
            <li>Upstox</li>
            <li>ICICI Direct</li>
            <li>Groww</li>
            <li>Angel One</li>
          </ul>
          <p className="text-sm mt-2 text-gray-400">
            These brokers also offer margin calculators, option chains, and
            strategy builders.
          </p>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={headingStyle}>
            <FaUniversity /> Regulatory Oversight
          </h2>
          <ul className={bulletStyle}>
            <li>Regulated by SEBI (Securities and Exchange Board of India)</li>
            <li>
              NSE ensures proper risk management, margin policies, and
              surveillance
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NSEFOInfo;
