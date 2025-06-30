import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";
import {
  FaBalanceScale,
  FaClock,
  FaLock,
  FaMapMarkerAlt,
  FaCogs,
} from "react-icons/fa";
import { usePopup } from "../../components/PopupContext";

const ComexInfo = () => {
  const { openPopup } = usePopup();

  const sectionStyle =
    " text-black dark:text-white  py-10 w-11/12 md:w-5/6 mx-auto space-y-12";
  const headingStyle =
    "text-2xl md:text-3xl font-semibold border-b pb-2 border-[var(--primary-color)] flex items-center gap-2";
  const bulletStyle = "list-disc list-inside space-y-2";

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-28">
        <Navbar />
      </div>
      <section className={sectionStyle}>
        {/* Intro */}
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FaBalanceScale className="text-[var(--primary-color)]" /> What is
            COMEX?
          </h1>
          <p>
            COMEX stands for Commodity Exchange Inc., one of the world’s largest
            commodity futures and options exchanges, known for global metals
            pricing.
          </p>
          <ul className="list-disc list-inside mt-3 text-sm text-gray-500">
            <li>
              <FaMapMarkerAlt className="inline mr-2 text-[var(--primary-color)]" />{" "}
              Based in New York, USA
            </li>
            <li>
              <FaCogs className="inline mr-2 text-[var(--primary-color)]" />{" "}
              Operated by CME Group
            </li>
          </ul>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        {/* Traded Commodities */}
        <div>
          <h2 className={headingStyle}>🛠 What Does COMEX Trade?</h2>
          <p>COMEX sets global benchmark prices for major metals:</p>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 text-left">Commodity</th>
                  <th className="p-2 text-left">Symbol</th>
                  <th className="p-2 text-left">Type</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Gold", "GC", "Bullion"],
                  ["Silver", "SI", "Bullion"],
                  ["Copper", "HG", "Base Metal"],
                  ["Platinum", "PL", "Precious Metal"],
                  ["Palladium", "PA", "Precious Metal"],
                ].map(([commodity, symbol, type], i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-2">{commodity}</td>
                    <td className="p-2">{symbol}</td>
                    <td className="p-2">{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it Works */}
        <div>
          <h2 className={headingStyle}>📈 How Does COMEX Work?</h2>
          <ul className={bulletStyle}>
            <li>Electronic market for futures contracts on metals.</li>
            <li>Most contracts are cash-settled without physical delivery.</li>
            <li>Used by speculators, hedgers, and arbitrageurs globally.</li>
          </ul>
        </div>

        {/* Importance */}
        <div>
          <h2 className={headingStyle}>🌍 Why is COMEX Important?</h2>
          <ul className={bulletStyle}>
            <li>Establishes global benchmark prices for gold and silver.</li>
            <li>
              Offers hedging opportunities for miners, investors, jewelers.
            </li>
            <li>Highly liquid and transparent pricing.</li>
          </ul>
        </div>

        {/* Trading Hours */}
        <div>
          <h2 className={headingStyle}>
            <FaClock className="text-[var(--primary-color)]" /> COMEX Trading
            Hours (IST)
          </h2>
          <ul className="text-sm list-disc list-inside mt-2">
            <li>Globex Electronic: 6:00 AM – 5:00 AM (next day)</li>
            <li>
              Floor Trading: Mostly phased out in favor of electronic trading
            </li>
          </ul>
        </div>

        {/* COMEX vs MCX */}
        <div>
          <h2 className={headingStyle}>💹 COMEX vs MCX (India)</h2>
          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-300 dark:border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="p-2 text-left">Feature</th>
                  <th className="p-2 text-left">COMEX</th>
                  <th className="p-2 text-left">MCX</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Location", "USA", "India"],
                  ["Currency", "USD", "INR"],
                  ["Trading", "Global metals", "Indian + Global (in INR)"],
                  ["Liquidity", "Higher", "Moderate"],
                  ["Access", "Global brokers", "SEBI-registered brokers"],
                ].map(([feature, comex, mcx], i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="p-2 font-medium text-[var(--primary-color)]">
                      {feature}
                    </td>
                    <td className="p-2">{comex}</td>
                    <td className="p-2">{mcx}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Access */}
        <div>
          <h2 className={headingStyle}>🧾 How Can You Access COMEX?</h2>
          <ul className={bulletStyle}>
            <li>Indians can track COMEX prices to trade informed on MCX.</li>
            <li>Direct COMEX access requires international brokers via LRS.</li>
            <li>Useful for arbitrage and hedging strategies.</li>
          </ul>
        </div>

        {/* Who Uses It */}
        <div>
          <h2 className={headingStyle}>🧠 Who Uses COMEX?</h2>
          <ul className={bulletStyle}>
            <li>Speculators, hedgers, and arbitrageurs</li>
            <li>Institutions: hedge funds, banks</li>
            <li>Producers: miners, jewelers</li>
            <li>Retail investors via ETFs or brokers</li>
          </ul>
        </div>

        {/* Regulation */}
        <div>
          <h2 className={headingStyle}>
            <FaLock className="text-[var(--primary-color)]" /> Is COMEX
            Regulated?
          </h2>
          <p>
            Yes. COMEX is owned by the CME Group and regulated by the U.S. CFTC
            (Commodity Futures Trading Commission), ensuring robust oversight
            and transparency.
          </p>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        {/* Summary */}
        <div>
          <h2 className={headingStyle}>📌 Summary</h2>
          <p>
            COMEX sets global trends in metals trading. Even if you trade
            through MCX in India, monitoring COMEX helps in pricing, arbitrage,
            and hedging.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ComexInfo;
