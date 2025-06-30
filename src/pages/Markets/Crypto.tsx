import Navbar from "../../components/Nav";
import Footer from "../../components/Footer";
import { usePopup } from "../../components/PopupContext";

const section =
  "bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white w-11/12 md:w-5/6 mx-auto py-12 space-y-10";
const heading =
  "text-2xl md:text-3xl font-semibold border-b pb-2 border-[var(--primary-color)]";

const list = "list-disc list-inside space-y-2";
const table =
  "w-full table-auto border border-gray-300 dark:border-gray-700 text-sm";
const tableHeader = "bg-gray-100 dark:bg-gray-800 font-semibold";
const tableCell = "p-2 border-t border-gray-300 dark:border-gray-700";

const Crypto = () => {
  const { openPopup } = usePopup();

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-28">
        <Navbar />
      </div>

      <section className={section}>
        <div>
          <h1 className="text-3xl font-bold mb-2">
            💰 What is Cryptocurrency?
          </h1>
          <p>
            Cryptocurrency is a digital or virtual currency that uses
            cryptography for security. Unlike traditional currencies (like INR,
            USD), it’s decentralized and not issued by any government or central
            bank.
          </p>
          <ul className={list}>
            <li>Blockchain-based</li>
            <li>Peer-to-peer transactions</li>
            <li>Global and borderless</li>
          </ul>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={heading}>🔗 How Does It Work?</h2>
          <p className="py-5">
            Cryptocurrencies operate on blockchain technology, a distributed
            ledger that ensures secure and transparent transactions.
          </p>
          <table className={table}>
            <thead>
              <tr className={tableHeader}>
                <th className="p-2 text-left">Term</th>
                <th className="p-2 text-left">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "Blockchain",
                  "Digital ledger storing data across multiple computers",
                ],
                ["Wallet", "A digital tool to store and send crypto"],
                ["Mining", "Validating transactions (Proof of Work)"],
                [
                  "Staking",
                  "Earning rewards by locking tokens (Proof of Stake)",
                ],
                [
                  "Smart Contracts",
                  "Programs that run automatically when conditions are met",
                ],
              ].map(([term, desc], idx) => (
                <tr key={idx}>
                  <td className={tableCell}>{term}</td>
                  <td className={tableCell}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>🌍 Popular Cryptocurrencies</h2>
          <table className={table}>
            <thead>
              <tr className={tableHeader}>
                <th className="p-2 text-left">Coin</th>
                <th className="p-2 text-left">Symbol</th>
                <th className="p-2 text-left">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Bitcoin", "BTC", "Digital gold / store of value"],
                ["Ethereum", "ETH", "Smart contracts, DeFi, NFTs"],
                ["Tether", "USDT", "Stablecoin pegged to USD"],
                ["BNB", "BNB", "Utility token for Binance exchange"],
                ["Solana", "SOL", "Fast and scalable smart contracts"],
              ].map(([coin, symbol, use], idx) => (
                <tr key={idx}>
                  <td className={tableCell}>{coin}</td>
                  <td className={tableCell}>{symbol}</td>
                  <td className={tableCell}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className={heading}>💹 Why Do People Use Crypto?</h2>
          <ul className={list}>
            <li>No banks/intermediaries</li>
            <li>Global accessibility</li>
            <li>Fast, low-fee transfers</li>
            <li>Investment and speculation</li>
            <li>Privacy & transparency</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>🧭 Where to Buy Crypto in India?</h2>
          <ul className={list}>
            <li>CoinDCX</li>
            <li>WazirX</li>
            <li>ZebPay</li>
            <li>CoinSwitch Kuber</li>
            <li>Binance (global)</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>📊 Real-World Use Cases</h2>
          <ul className={list}>
            <li>Online payments (e.g., Bitcoin)</li>
            <li>NFTs (digital art & ownership)</li>
            <li>DeFi (decentralized finance)</li>
            <li>International remittances</li>
            <li>Gaming (Play-to-Earn)</li>
          </ul>
        </div>

        <div>
          <h2 className={heading}>⚠️ Risks & Regulations</h2>
          <table className={table}>
            <thead>
              <tr className={tableHeader}>
                <th className="p-2 text-left">Risk</th>
                <th className="p-2 text-left">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Volatility", "Prices fluctuate wildly"],
                ["Scams", "Ponzi schemes and fake tokens exist"],
                ["Security", "Exchanges can be hacked"],
                [
                  "Legal Uncertainty",
                  "Governments still developing crypto laws",
                ],
              ].map(([risk, desc], idx) => (
                <tr key={idx}>
                  <td className={tableCell}>{risk}</td>
                  <td className={tableCell}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-2">
            In India: Crypto is not banned, but not legal tender. Profits are
            taxed at 30% + surcharge. 1% TDS is deducted per transaction (above
            a threshold).
          </p>
        </div>

        <div>
          <h2 className={heading}>🧠 Who Should Use Crypto?</h2>
          <ul className={list}>
            <li>Investors: Looking for high-risk, high-reward options</li>
            <li>Developers: Building blockchain-based apps (Web3)</li>
            <li>Traders: Short-term profit through price movement</li>
            <li>
              Businesses: Accepting crypto as payment or fundraising via ICOs
            </li>
          </ul>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        <div>
          <h2 className={heading}>📌 Conclusion</h2>
          <p>
            Crypto is a revolutionary financial technology, but it comes with
            both massive potential and high risk. Educate yourself, start small,
            and always use secure platforms and wallets.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Crypto;
