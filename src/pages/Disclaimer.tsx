import Navbar from "../components/Nav";
import Footer from "../components/Footer";

function Disclaimer() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-20">
        <Navbar />
      </div>

      <section className="flex-grow px-4 md:px-8 lg:px-32 py-12 bg-white dark:bg-[--bg-color1] text-black dark:text-white">
        <div className="space-y-6 text-justify">
          <p>
            Any and all liability for risks resulting from investment
            transactions or asset dispositions carried out by users based on
            information or market analysis is expressly excluded by{" "}
            <strong>Close Friends Traders (Close Friends Traders)</strong>. All
            information provided is for illustrative purposes only and should
            not be interpreted as financial advice or a recommendation for
            action. Please consult a licensed financial advisor before making
            any investment decisions.
          </p>

          <p>
            Due to the high risk involved, trading is only advisable for those
            who understand the nature and consequences of financial contracts.
            Trading in futures, options, forex, CFDs, stocks, and
            cryptocurrencies is not suitable for everyone. You should consider
            your investment objectives, experience, financial situation, and
            risk tolerance before engaging in trading.
          </p>

          <p>
            <strong>
              Past performance is not indicative of future results.
            </strong>
          </p>

          <h2 className="text-xl font-semibold mt-10">
            Electronic Trading Risks
          </h2>
          <p>
            Online trading carries risks due to delays in system response times,
            connectivity issues, and other unpredictable technical factors.
            Before trading, familiarize yourself with the platform, its rules,
            and your broker’s policies.
          </p>

          <h2 className="text-xl font-semibold mt-8">Stock Market Risks</h2>
          <p>
            All opinions, analysis, or data shared by Close Friends Traders are
            general in nature and should not be taken as investment advice. We
            are not liable for any financial losses resulting from reliance on
            this information. You are fully responsible for your trading
            decisions.
          </p>

          <h2 className="text-xl font-semibold mt-8">Futures Trading Risks</h2>
          <p>
            Futures trading is highly leveraged and involves substantial risk.
            Market movement may lead to significant losses, including amounts
            exceeding your initial margin or investment. Margin calls may
            require immediate additional deposits to maintain open positions.
          </p>

          <h2 className="text-xl font-semibold mt-8">Forex Trading Risks</h2>
          <p>
            Forex trading on margin carries high risk. Leverage can magnify both
            profits and losses. You may lose more than your initial investment.
            Do not trade forex unless you fully understand the risks and can
            bear potential losses. Consult with a financial advisor if needed.
          </p>

          <h2 className="text-xl font-semibold mt-8">Options Trading Risks</h2>
          <p>
            Options trading involves high risk and is not suitable for all
            investors. You may lose the entire investment quickly. Before
            investing in options, carefully review your broker’s terms and
            assess your financial situation and risk appetite.
          </p>

          <p>
            Close Friends Traders makes no guarantees of profitability. Trading
            with leverage increases both the potential for gain and the risk of
            significant loss.
          </p>

          <h2 className="text-xl font-semibold mt-8">Simulated Performance</h2>
          <p>
            Any illustrations or simulations shown on this website are based on
            hypothetical trades and are not real. Actual trading results may
            differ significantly due to market factors such as liquidity,
            slippage, or volatility. Simulations are for educational purposes
            only.
          </p>

          <h2 className="text-xl font-semibold mt-8">No Investment Advice</h2>
          <p>
            All content on the Close Friends Traders website is for
            informational and educational purposes only. It does not constitute
            personalized investment advice. We are not liable for trading
            decisions made based on our content.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            Trading Addiction & Financial Health
          </h2>
          <p>
            Trading may be addictive. If you feel at risk or experience
            compulsive trading behaviors, seek professional help. Ensure that
            your trading activities align with your personal financial health
            and goals.
          </p>

          <h2 className="text-xl font-semibold mt-8">
            Testimonials Disclaimer
          </h2>
          <p>
            Testimonials represent individual user experiences and are not
            indicative of typical results. They do not guarantee success or
            exempt you from consulting qualified financial advisors before
            making investment decisions.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Disclaimer;
