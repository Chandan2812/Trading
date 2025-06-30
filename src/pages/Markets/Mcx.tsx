import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";
import { usePopup } from "../../components/PopupContext";

const sectionStyle =
  " text-black dark:text-white py-10 w-11/12 md:w-5/6 mx-auto space-y-10";
const headingStyle =
  "text-2xl md:text-3xl font-semibold mb-4 border-b pb-2 border-[var(--primary-color)]";
const subheadingStyle =
  "text-xl font-semibold mt-6 mb-2 text-[var(--primary-color)]";
const bulletStyle = "list-disc list-inside space-y-2";

const Mcx = () => {
  const { openPopup } = usePopup();

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-32">
        <Navbar />
      </div>
      <section className={sectionStyle}>
        <div>
          <h1 className="text-3xl font-bold mb-2">📘 What is MCX?</h1>
          <p className="text-base">
            MCX stands for Multi Commodity Exchange of India Ltd. It is India’s
            largest commodity derivatives exchange, where you can trade in
            futures and options contracts on a wide range of commodities.
          </p>
          <ul className="mt-4 text-sm space-y-2">
            <li>• Founded: 2003</li>
            <li>• Headquarters: Mumbai</li>
            <li>
              • Regulated by: SEBI (Securities and Exchange Board of India)
            </li>
            <li>• Listed on NSE & BSE as a public company (Ticker: MCX)</li>
          </ul>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={headingStyle}>📈 What Can You Trade on MCX?</h2>
          <p>
            MCX offers commodity derivatives, which means you trade contracts
            based on the future price of physical commodities.
          </p>
          <h3 className={subheadingStyle}>🔹 Major Commodity Categories:</h3>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300 dark:border-gray-700 text-sm">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Examples</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Bullion", "Gold, Silver"],
                  ["Base Metals", "Copper, Aluminum, Zinc"],
                  ["Energy", "Crude Oil, Natural Gas"],
                  ["Agri", "Cotton, CPO (Crude Palm Oil), Mentha Oil"],
                ].map(([category, examples], idx) => (
                  <tr
                    key={idx}
                    className="border-t border-gray-300 dark:border-gray-700"
                  >
                    <td className="p-2 font-medium text-[var(--primary-color)]">
                      {category}
                    </td>
                    <td className="p-2">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className={headingStyle}>💼 Instruments Traded</h2>
          <ul className={bulletStyle}>
            <li>
              <strong>Futures Contracts</strong>
              <br />
              • Agreement to buy/sell a commodity at a fixed price on a future
              date.
              <br />• Standardized in terms of lot size, quality, and expiry.
            </li>
            <li>
              <strong>Options Contracts</strong>
              <br />
              • Right (not obligation) to buy/sell futures at a certain price.
              <br />• Available in commodities like Gold, Silver, and Crude Oil.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>🧠 Key Features of MCX</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              [
                "Online Trading",
                "Accessible through brokers like Zerodha, Angel One, Upstox",
              ],
              ["Leverage", "Margin trading available (lower capital required)"],
              ["Liquidity", "High for metals and energy contracts"],
              ["Live Price Data", "Real-time commodity prices and order book"],
            ].map(([feature, desc], idx) => (
              <div
                key={idx}
                className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg"
              >
                <h4 className="text-[var(--primary-color)] font-semibold mb-1">
                  {feature}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={headingStyle}>🎯 Who Uses MCX?</h2>
          <ul className={bulletStyle}>
            <li>Retail Traders – Speculate on price movements.</li>
            <li>
              Hedgers – Farmers, jewelers, and importers use MCX to manage price
              risk.
            </li>
            <li>
              Arbitrageurs – Profit from price differences across markets.
            </li>
            <li>
              Institutional Investors – Participate for diversification and
              risk-adjusted returns.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>📊 Trading Hours on MCX</h2>
          <ul className="text-sm list-disc list-inside space-y-2">
            <li>Monday–Friday</li>
            <li>Day session: 9:00 AM – 5:00 PM (Agri only)</li>
            <li>
              Evening session: 5:00 PM – 11:30/11:55 PM (non-Agri commodities)
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>⚖️ Is MCX Safe & Regulated?</h2>
          <ul className={bulletStyle}>
            <li>Regulated by SEBI, just like NSE/BSE</li>
            <li>
              Has strict rules for margin requirements, risk management, and
              investor protection
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>🔧 Brokers That Support MCX Trading</h2>
          <ul className={bulletStyle}>
            <li>Zerodha (via Kite)</li>
            <li>Upstox</li>
            <li>Angel One</li>
            <li>ICICI Direct</li>
            <li>Groww (limited MCX access)</li>
            <li>Motilal Oswal</li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>📌 Pros of Trading on MCX</h2>
          <ul className={bulletStyle}>
            <li>Access to global commodities</li>
            <li>High leverage</li>
            <li>Transparent pricing</li>
            <li>Hedging tool for businesses</li>
          </ul>
        </div>
        <div>
          <h3 className={headingStyle}>⚠️ Cons of Trading on MCX</h3>
          <ul className={bulletStyle}>
            <li>Risk of high volatility</li>
            <li>Requires understanding of global commodity trends</li>
            <li>Margin calls in leveraged positions</li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>🧾 Conclusion</h2>
          <p>
            MCX is ideal for traders and investors looking to:
            <br />• Diversify beyond stocks and bonds
            <br />• Trade on price movements in commodities
            <br />• Hedge against inflation or raw material price fluctuations
          </p>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Mcx;
