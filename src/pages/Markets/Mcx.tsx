import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";
import { usePopup } from "../../components/PopupContext";
import { Helmet } from "react-helmet-async";

const sectionStyle =
  " text-black dark:text-white py-10 w-11/12 md:w-5/6 mx-auto space-y-10";
const headingStyle =
  "text-2xl md:text-3xl font-semibold mb-4 border-b pb-2 border-[var(--primary-color)]";
// const subheadingStyle =
//   "text-xl font-semibold mt-6 mb-2 text-[var(--primary-color)]";
const bulletStyle = " list-inside space-y-3";
const bulletStyle2 = "list-disc list-inside space-y-3";

const Mcx = () => {
  const { openPopup } = usePopup();

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <Helmet>
        <title>MCX Commodity Trading | Close Friends Traders</title>
        <meta
          name="description"
          content="Learn what MCX is in stock market, full form of MCX, trading account types, key features & how to trade commodities like gold, crude oil & more in India."
        />

        <link
          rel="canonical"
          href="https://www.closefriendstraders.com/markets/mcx"
        />
      </Helmet>
      <div className="mb-14">
        <Navbar />
      </div>

      <section className={sectionStyle}>
        <div>
          <h1 className="text-3xl font-bold mb-2">What is MCX Trading?</h1>
          <p className="text-base">
            <b>MCX</b> , or <b>Multi Commodity Exchange of India Ltd</b>., is
            India’s leading platform for trading commodity derivatives.
            Established in 2003 and regulated by <b>SEBI</b>, MCX allows traders
            to buy and sell <b>futures and options contracts</b> for commodities
            like gold, silver, crude oil, natural gas, and various agricultural
            products.
          </p>
          <h1 className="text-xl font-bold mt-7">Full Form of MCX</h1>
          <p className="text-base mt-3">
            The <b>full form of MCX</b> is <b>Multi Commodity Exchange</b>.
            Similar to NSE and BSE, it enables trading in derivative contracts,
            but solely focuses on commodities rather than equities.
          </p>

          <h1 className="text-xl font-bold mt-7">
            What is MCX in the Stock Market?
          </h1>
          <p className="text-base mt-3">
            In the context of India’s financial markets,{" "}
            <b>what is MCX in the stock market</b> means a dedicated platform
            for commodity derivatives. Traders don’t deal with the physical
            asset; instead, they trade contracts whose value fluctuates with the
            commodity’s price. This is similar to foundational concepts in{" "}
            <a
              href="https://www.closefriendstraders.com/blogs/stock-trading-strategies-tips-insights-for-beginners"
              className="text-blue-700"
            >
              Stock Trading: Strategies, Tips & Insights for Beginners
            </a>
            , where understanding contract structure and timing is key.
          </p>

          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={headingStyle}>Commodities Traded on MCX</h2>
          <h3>
            MCX offers a diverse range of commodities across key categories:
          </h3>
          <table className="table-auto border-collapse border border-gray-300 w-full text-left mt-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 font-semibold">
                  <b>Category</b>
                </th>
                <th className="border border-gray-300 px-4 py-2 font-semibold">
                  Examples
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <b>Bullion</b>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Gold, Silver
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <b>Base Metals</b>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Copper, Zinc, Aluminum
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <b>Energy</b>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Crude Oil, Natural Gas
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  <b>Agri Commodities</b>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Cotton, Crude Palm Oil, Mentha Oil
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={headingStyle}>Instruments Traded on MCX</h2>
          <ul className={bulletStyle}>
            <li>
              <strong>Futures Contracts</strong>
              <br />
              Standardized contracts for buying or selling commodities at a
              predetermined price on a future date{" "}
            </li>
            <li>
              <strong>Options Contracts</strong>
              <br />
              Grants the right (but not obligation) to buy or sell a futures
              contract at a set price before expiry. Available for commodities
              like Gold, Silver, and Crude Oil.
            </li>
          </ul>
        </div>
        <div>
          <h2 className={headingStyle}>MCX Trading Account</h2>
          <p className="text-base mt-3">
            To start <b>MCX Trading</b>, you need a{" "}
            <b> commodity trading account</b>
            activated for futures and options. A{" "}
            <a
              href="https://www.closefriendstraders.com/blogs/demat-account-types-features-benefits-why-you-need-one"
              className="text-blue-700"
            >
              Demat account
            </a>{" "}
            may be required for delivery or options trading. There are two main
            account types:
          </p>
          <ul className={bulletStyle2}>
            <li>
              <strong>Non-Agri Commodity Account</strong> – for metals and
              energy.
            </li>
            <li>
              <strong>Agri Commodity Account</strong> – necessary for
              agricultural contracts under SEBI rules.
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>
            Factors Affecting the Price of Commodities
          </h2>
          <p className="text-base mb-3">Commodity prices vary based on:</p>
          <ul className={bulletStyle2}>
            <li>
              <strong>Global demand and supply</strong>
            </li>
            <li>
              <strong>Currency fluctuations</strong>, especially USD-INR
            </li>
            <li>
              <strong>Geo-political events</strong>
            </li>
            <li>
              <strong>Weather</strong>, impacting agriculture
            </li>
            <li>
              <strong>Inventory data and global reports</strong>
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>Advantages of Commodity Trading</h2>
          <ul className={bulletStyle2}>
            <li>
              <strong>Portfolio diversification</strong> beyond equities and
              bonds
            </li>
            <li>
              <strong>Hedging </strong>against input cost or inflation risks
            </li>
            <li>
              <strong>Transparent & real-time pricing</strong>
            </li>
            <li>
              <strong>Margin leverage</strong> to amplify returns (and risks)
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>📊 How to Trade on MCX?</h2>
          <p className="text-base mb-3">Steps to trade on MCX:</p>
          <ul className="text-sm list-disc list-inside space-y-2">
            <li>
              Open a <b>commodity trading account</b> after KYC
            </li>
            <li>Link bank account and add funds</li>
            <li>Analyze commodity price trends</li>
            <li>Place futures or options orders</li>
            <li>Monitor positions during trading sessions</li>
            <li>Square off or roll over positions as needed</li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>⚖️Investing in Commodities in India</h2>
          <p className="text-base mb-3">Trading on MCX offers:</p>
          <ul className={bulletStyle2}>
            <li>
              Regulation by <b>SEBI</b>
            </li>
            <li>Investment opportunities in key commodities</li>
            <li>
              Strategic use for speculation, hedging, or inflation protection
            </li>
          </ul>
        </div>

        <div>
          <h2 className={headingStyle}>Is MCX Safe & Regulated?</h2>
          <p className="text-base mb-3">
            Yes, MCX operates under SEBI guidelines and has mechanisms for:
          </p>
          <ul className={bulletStyle2}>
            <li>Margin enforcement</li>
            <li>Real-time surveillance</li>
            <li>Clearinghouse-backed settlement</li>
            <li>Investor grievance systems</li>
          </ul>
          <p className="text-base mt-7">
            This gives it a robust structure comparable to other regulated
            exchanges.
          </p>
        </div>

        <div className="mt-6">
          <h2 className={headingStyle}>MCX Trading Hours</h2>
          <table className="table-auto border-collapse border border-black w-full text-left">
            <thead>
              <tr className="bg-white">
                <th className="border border-black px-4 py-2 font-semibold">
                  Session Type
                </th>
                <th className="border border-black px-4 py-2 font-semibold">
                  Time (IST)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-4 py-2">
                  Day Session (Agri)
                </td>
                <td className="border border-black px-4 py-2">
                  9:00 AM – 5:00 PM (Mon–Fri)
                </td>
              </tr>
              <tr>
                <td className="border border-black px-4 py-2">
                  Evening Session
                </td>
                <td className="border border-black px-4 py-2">
                  5:00 PM – 11:30 PM / 11:55 PM (Mon–Fri)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={headingStyle}>Conclusion</h2>
          <p>
            Understanding <b>MCX Trading</b> equips you to diversify your
            portfolio, hedge risks, or engage in speculation on commodity price
            trends. With proper market knowledge, time management, and strategy,
            MCX can become an effective addition to your investment toolkit,
            especially for those comfortable with intraday and short-term
            trading volatility.
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
