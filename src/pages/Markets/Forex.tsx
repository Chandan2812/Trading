import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";
import {
  FaGlobe,
  FaExchangeAlt,
  FaKey,
  FaChartLine,
  FaExclamationTriangle,
  FaUniversity,
  FaStore,
  FaUsers,
  FaTools,
  FaCheckCircle,
} from "react-icons/fa";
import { usePopup } from "../../components/PopupContext";

const Forex = () => {
  const { openPopup } = usePopup();

  const section =
    "text-black dark:text-white w-11/12 md:w-5/6 mx-auto py-10 space-y-12";
  const heading =
    "flex items-center gap-2 text-2xl md:text-3xl font-semibold mb-4 border-b border-[var(--primary-color)] pb-2";
  const subHeading = "text-xl font-semibold text-[var(--primary-color)] mb-3";
  const table =
    "w-full table-auto border border-gray-300 dark:border-gray-700 text-sm";
  const th = "bg-gray-100 dark:bg-gray-800 text-left p-2";
  const td = "p-2 border-t border-gray-300 dark:border-gray-700";

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-28">
        <Navbar />
      </div>
      <section className={section}>
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold mb-4">
            <FaGlobe /> What is Forex?
          </h1>
          <p>
            Forex (Foreign Exchange) is the world's largest financial market
            where currencies are traded 24/5 globally. With daily volume over $7
            trillion (2024), it operates via major financial hubs like London,
            New York, Tokyo, and Sydney.
          </p>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={heading}>
            <FaExchangeAlt /> How Does Forex Work?
          </h2>
          <p>
            You trade currency pairs by buying one currency while selling
            another. For example, buying EUR/USD means buying Euros and selling
            Dollars.
          </p>
        </div>

        <div>
          <h2 className={heading}>
            <FaKey /> Key Forex Terms
          </h2>
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Term</th>
                <th className={th}>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pip", "Smallest price move (0.0001 usually)"],
                ["Lot", "Standard trade size (100,000 units)"],
                ["Spread", "Difference between ask and bid"],
                ["Leverage", "Use of borrowed money"],
                ["Margin", "Collateral to open trade"],
                ["Broker", "Platform giving market access"],
              ].map(([term, desc], i) => (
                <tr key={i}>
                  <td className={td}>{term}</td>
                  <td className={td}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>
            <FaChartLine /> Major Currency Pairs
          </h2>
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Pair</th>
                <th className={th}>Nickname</th>
                <th className={th}>Currencies</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["EUR/USD", "Fiber", "Euro / U.S. Dollar"],
                ["USD/JPY", "Ninja", "U.S. Dollar / Japanese Yen"],
                ["GBP/USD", "Cable", "British Pound / U.S. Dollar"],
                ["USD/CHF", "Swissy", "U.S. Dollar / Swiss Franc"],
                ["AUD/USD", "Aussie", "Australian Dollar / U.S. Dollar"],
                ["USD/INR", "—", "U.S. Dollar / Indian Rupee"],
              ].map(([pair, nick, curr], i) => (
                <tr key={i}>
                  <td className={td}>{pair}</td>
                  <td className={td}>{nick}</td>
                  <td className={td}>{curr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>📈 Why Trade Forex?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Highly liquid and accessible market</li>
            <li>24-hour trading across global time zones</li>
            <li>Leverage for bigger positions</li>
            <li>Low starting capital required</li>
            <li>Suited for technical analysis</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>
            <FaExclamationTriangle /> Forex Risks
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>High volatility</li>
            <li>Leverage magnifies losses</li>
            <li>Unregulated brokers may manipulate</li>
            <li>Emotion-driven trading issues</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>
            <FaUniversity /> Forex in India
          </h2>
          <p>
            SEBI & RBI regulate Forex trading. Only INR pairs are legal:
            USD/INR, EUR/INR, GBP/INR, JPY/INR via SEBI brokers.
          </p>
          <ul className="list-disc pl-6 text-sm mt-3">
            <li>Zerodha</li>
            <li>Angel One</li>
            <li>ICICI Direct</li>
            <li>HDFC Securities</li>
          </ul>
          <p className="text-sm text-red-500 mt-2">
            ❌ Non-INR pairs via foreign brokers are not legal for Indians.
          </p>
        </div>

        <div>
          <h2 className={heading}>
            <FaStore /> Where to Trade
          </h2>
          <h3 className={subHeading}>Indian Brokers (Legal INR Pairs)</h3>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>Zerodha</li>
            <li>Upstox</li>
            <li>Sharekhan</li>
          </ul>
          <h3 className={subHeading}>Global Brokers (⚠️ not legal in India)</h3>
          <ul className="list-disc pl-6 text-sm space-y-1">
            <li>IC Markets</li>
            <li>OANDA</li>
            <li>Pepperstone</li>
            <li>XM</li>
            <li>Exness</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>
            <FaUsers /> Who Trades in Forex?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Retail Traders</li>
            <li>Banks and Financial Institutions</li>
            <li>Exporters and Importers</li>
            <li>Central Banks</li>
            <li>Hedge Funds</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>
            <FaTools /> Tools for Forex Traders
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>MetaTrader 4/5 (MT4/MT5)</li>
            <li>TradingView</li>
            <li>Economic Calendars</li>
          </ul>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={heading}>
            <FaCheckCircle /> Final Thoughts
          </h2>
          <p>
            Forex is powerful but risky. Start small, use demo accounts, study
            the markets and always manage risk.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Forex;
