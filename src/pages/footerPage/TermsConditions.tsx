import PageBanner from "../../components/BannerImage";
import Footer from "../../components/Footer";
import Navbar from "../../components/Nav";

function TermsConditions() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-20">
        <Navbar />
      </div>

      <PageBanner title="Terms & Conditions" />

      <main className="flex-grow bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white px-4 md:px-8 lg:px-32 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-6">
          TERMS AND CONDITIONS
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">
          Effective Date: 1st July, 2025
        </p>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Trading Hours</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Trading on our platform is available from 09:16 AM to 03:30 PM
                (IST).
              </li>
              <li>
                All pending orders will be automatically cancelled after market
                close.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Order Rules</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Limit Orders cannot be placed above 4% of the Last Traded Price
                (LTP).
              </li>
              <li>
                All limit orders must align with:
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Bid Rate for sell orders.</li>
                  <li>Ask Rate for buy orders.</li>
                </ul>
              </li>
              <li>
                Line trades and operator-based calls are not valid and will not
                be accepted.
              </li>
              <li>
                Scripts under a ban status cannot be traded, only existing
                positions may be squared off.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Auto Square-Off Policy
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Positions will be automatically squared off if a loss reaches
                90% of your capital.
              </li>
              <li>
                Failure to roll over a position to the new expiry will result in
                automatic exit at the bid/ask rate of the old expiry.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. BTST/STBT Policy</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                BTST (Buy Today Sell Tomorrow) and STBT (Sell Today Buy
                Tomorrow) are strictly not allowed, especially trades like
                buying at 03:15 PM and selling the next morning at 09:30 AM
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Dividend Rule</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Any script with a dividend will be automatically squared off
                before the dividend is executed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              6. Option Selling Rules
            </h2>
            <h3 className="text-xl font-semibold mb-3">
              To activate and participate in Option Selling, the following must
              be met:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Minimum Account Balance: ₹25,000 must be maintained daily before
                the market opens.{" "}
              </li>
              <li>
                Option Selling is allowed only for pre-approved clients actively
                trading in futures.
              </li>
              <li>
                If you make a profit without maintaining the minimum balance of
                ₹25,000
                <ul className="list-disc ml-6 mt-1 space-y-1">
                  <li>Profit will be invalid.</li>
                </ul>
              </li>
              <li>
                Losses will still be considered valid even if incurred below the
                ₹25,000 threshold.
              </li>
              <li>
                Profits on expiry day will only be valid if the user has traded
                in futures within the same script.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Platform Usage</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                If the application is minimized and reopened, users are required
                to refresh the application to view the updated portfolio data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Compliance with NSE Rules
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                The trading should be in accordance with the guidelines and
                regulations developed by the National Stock exchange (NSE).
                Failure to comply with these policies can even lead to
                termination of any trades or block access to our services.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Additional Trading Rules
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Profits from trades involving fake volumes (cheating trades)
                will be forfeited, and any losses will be charged to the user.
                There will be no discussion with clients; management’s decision
                is final.
              </li>
              <li>
                All orders, including market, limit, stop-loss, target, and stop
                orders, will execute only at the exchange’s bid, and ask prices.
                Exchange highs, lows, and last traded prices will not be used
              </li>
              <li>
                Trading with multiple accounts on the same client IP is strictly
                prohibited. If detected, all profit trades on those accounts
                will be removed.
              </li>
              <li>
                Stop-loss orders will trigger at market price, and any remaining
                stop orders will be cancelled after market close.
              </li>
              <li>
                Dividend and bonus adjustments follow exchange circulars and
                rules.
              </li>
              <li>
                Trades placed at incorrect prices due to technical issues may be
                removed at any time at our discretion
              </li>
              <li>
                Arbitrage trading between MCX and NSE is not allowed. Profits
                from such trades will be deleted.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Disclaimer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Close Friends Traders retains a right to change or revise these
                Terms and Conditions any time. The further use of the platform
                constitutes acceptance of the changed conditions.
              </li>
              <li>
                Trading involves market risk. Users are advised to trade
                responsibly and acknowledge that capital may be at risk.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Support</h2>
            <h3 className="text-xl font-semibold mb-3">
              In case of any questions or inquiry towards the terms, please
              write to our support service:
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Pay-in: +1 (236) 305-9090</li>
              <li>Withdrawal: +1 (236) 305-9092</li>
              <li>Tech / Support: +91 72309 41008</li>
            </ul>
          </section>

          <p className="mt-6">
            Your continued use of <strong>Close Friends Traders</strong>{" "}
            indicates that you have read, understood, and agreed to these Terms
            and Conditions.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default TermsConditions;
