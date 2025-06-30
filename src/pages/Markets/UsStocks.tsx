import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";
import {
  FaFlagUsa,
  FaLandmark,
  FaChartLine,
  FaGlobeAmericas,
  FaMoneyBillWave,
  FaClock,
  FaExclamationCircle,
  FaBullseye,
} from "react-icons/fa";
import { usePopup } from "../../components/PopupContext";

const USStocks = () => {
  const { openPopup } = usePopup();

  const section =
    " text-black dark:text-white w-11/12 md:w-5/6 mx-auto py-10 space-y-12";
  const heading =
    "flex items-center gap-2 text-2xl md:text-3xl font-semibold mb-4 border-b border-[var(--primary-color)] pb-2";
  const subHeading = "text-xl font-semibold text-[var(--primary-color)] mb-3";
  const table =
    "w-full table-auto border border-gray-300 dark:border-gray-700 text-sm";
  const th = "bg-gray-100 dark:bg-gray-800 text-left p-2";
  const td = "p-2 border-t border-gray-300 dark:border-gray-700";

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-32">
        <Navbar />
      </div>
      <section className={section}>
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold mb-4">
            <FaFlagUsa /> What Are U.S. Stocks?
          </h1>
          <p>
            U.S. stocks represent ownership in publicly traded companies based
            in the U.S. — listed on major exchanges and traded in U.S. dollars.
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
            <FaLandmark /> Major U.S. Stock Exchanges
          </h2>
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Exchange</th>
                <th className={th}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={td}>NYSE (New York Stock Exchange)</td>
                <td className={td}>World's largest exchange by market cap</td>
              </tr>
              <tr>
                <td className={td}>NASDAQ</td>
                <td className={td}>
                  Tech-heavy exchange, home to many growth stocks
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>
            <FaChartLine /> What Are U.S. Stock Market Indices?
          </h2>
          <p>Indices track benchmark stock performance:</p>
          <h3 className={subHeading}>Top U.S. Indices</h3>
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Index</th>
                <th className={th}>What It Tracks</th>
                <th className={th}>Notable Stocks</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "S&P 500",
                  "500 largest U.S. companies",
                  "Apple, Microsoft, Amazon",
                ],
                [
                  "NASDAQ 100",
                  "Top 100 non-financial tech & growth companies",
                  "Tesla, Meta, Nvidia",
                ],
                [
                  "Dow Jones (DJIA)",
                  "30 large blue‑chip firms",
                  "Boeing, Coca‑Cola, Goldman Sachs",
                ],
                [
                  "Russell 2000",
                  "2000 small‑cap companies",
                  "Mid‑small US firms",
                ],
                [
                  "VIX (Volatility Index)",
                  "Market volatility gauge",
                  "Sentiment indicator, not stocks",
                ],
              ].map(([idxName, idxDesc, idxStocks], i) => (
                <tr key={i}>
                  <td className={td}>{idxName}</td>
                  <td className={td}>{idxDesc}</td>
                  <td className={td}>{idxStocks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>
            <FaGlobeAmericas /> Popular U.S. Stocks (2024–25)
          </h2>
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Company</th>
                <th className={th}>Ticker</th>
                <th className={th}>Sector</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Apple", "AAPL", "Tech"],
                ["Microsoft", "MSFT", "Tech"],
                ["Nvidia", "NVDA", "AI/Chips"],
                ["Amazon", "AMZN", "E‑commerce / Cloud"],
                ["Tesla", "TSLA", "EV / Auto"],
                ["Meta (Facebook)", "META", "Social Media"],
                ["Alphabet (Google)", "GOOG / GOOGL", "Search / Ads"],
                ["Berkshire Hathaway", "BRK.A / BRK.B", "Conglomerate"],
              ].map(([c, t, s], i) => (
                <tr key={i}>
                  <td className={td}>{c}</td>
                  <td className={td}>{t}</td>
                  <td className={td}>{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>
            <FaBullseye /> Why Invest in U.S. Stocks?
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access global brands & tech leaders</li>
            <li>Gain exposure to USD-denominated assets</li>
            <li>Benefit from historically strong returns</li>
            <li>Diversify beyond Indian markets</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>
            <FaMoneyBillWave /> How Can Indians Invest?
          </h2>
          <h3 className={subHeading}>International Platforms</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>INDmoney</li>
            <li>Vested</li>
            <li>Groww Global</li>
            <li>Stockal</li>
            <li>Webull (via LRS)</li>
          </ul>
          <h3 className={subHeading}>Indian Brokers (Global Tie-ups)</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Zerodha (via Vested)</li>
            <li>ICICI Direct Global</li>
            <li>HDFC Securities International Investing</li>
          </ul>
          <p className="text-sm text-gray-400 mt-2">
            Under RBI LRS, Indian residents can invest up to $250,000/year
            overseas.
          </p>
        </div>

        <div>
          <h2 className={heading}>
            <FaClock /> U.S. Market Timings (IST)
          </h2>
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>Session</th>
                <th className={th}>IST Timing</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Pre-market", "1:00 PM – 7:00 PM"],
                ["Market Hours", "7:00 PM – 1:30 AM"],
                ["Post-market", "1:30 AM – 5:30 AM"],
              ].map(([sess, time], i) => (
                <tr key={i}>
                  <td className={td}>{sess}</td>
                  <td className={td}>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-400 mt-2">
            Timings shift slightly during daylight savings.
          </p>
        </div>

        <div>
          <h2 className={heading}>
            <FaExclamationCircle /> Risks to Consider
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Currency risk (INR ↔ USD)</li>
            <li>Regulatory risk (India/U.S. policies)</li>
            <li>Geopolitical volatility</li>
            <li>Higher foreign transaction/remittance costs</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>
            <FaBullseye /> Bonus: Trending Investment Themes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>AI Boom: Nvidia, AMD, Palantir</li>
            <li>EV Growth: Tesla, Rivian, Lucid</li>
            <li>Cloud & SaaS: Microsoft, Snowflake, Salesforce</li>
            <li>Green Energy: Enphase, NextEra Energy</li>
            <li>Biotech: Moderna, Pfizer, CRISPR Therapeutics</li>
          </ul>
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

export default USStocks;
