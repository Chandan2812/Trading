import PageBanner from "../../components/BannerImage";
import Footer from "../../components/Footer";
import Navbar from "../../components/Nav";

function TermsConditions() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-20">
        {" "}
        <Navbar />
      </div>
      <PageBanner title="Terms & Conditions" />

      <main className="flex-grow bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white px-4 md:px-8 lg:px-32 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-6">
          Terms and Conditions
        </h1>

        <p className="mb-6">
          Welcome to <strong>Closefriendstraders.com</strong>, the trusted
          partner for your online trading journey. By using our services, you
          agree to comply with the terms and conditions outlined below. We
          encourage you to review these terms carefully, as they are designed to
          maintain a secure, fair, and transparent trading environment for all
          users.
        </p>

        <p className="mb-6">
          Failure to adhere to these terms may result in significant
          consequences, including but not limited to the suspension or
          termination of your account, loss of funds, or, if necessary, legal
          action. Please note that we reserve the right to update these terms at
          any time, and as a user, it is your responsibility to stay informed of
          any changes.
        </p>

        <p className="mb-8">
          By accessing Closefriendstraders.com, you agree to abide by the
          following policies and guidelines:
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Prohibited Activities
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Restricted Trading Practices:</strong> Engaging in
                activities such as Chamka, line trading, or insider trading is
                strictly prohibited. Violations will result in immediate account
                suspension or closure.
              </li>
              <li>
                <strong>Improper Account Usage:</strong> Sharing login
                credentials or allowing unauthorized individuals to manage your
                account for trades is considered misuse. Such actions may lead
                to account suspension or the withholding of funds.
              </li>
              <li>
                <strong>Scalping:</strong> Trades designed to generate profits
                within five minutes are classified as scalping. Any profits from
                such activities may be removed without prior notice.
              </li>
              <li>
                <strong>VPN Prohibition:</strong> Trading using a VPN is not
                permitted. Trades initiated through VPNs may be invalidated and
                removed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Trading Guidelines
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Bonuses and Dividends:</strong> Distributed according to
                the respective exchange circulars. These rules are subject to
                change.
              </li>
              <li>
                <strong>Cross Orders:</strong> Executing trades from the same IP
                or across multiple accounts is not allowed. Resulting profitable
                trades may be canceled.
              </li>
              <li>
                <strong>Order Processing:</strong> Orders are executed based on
                bid/ask prices, not Last Traded Price (LTP). Execution may vary
                based on market conditions.
              </li>
              <li>
                <strong>Invalid Orders:</strong> Buy/sell stop orders without an
                open position or exceeding allowed quantities will be canceled.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              3. Compliance & Account Protection
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Negative Balance Protection:</strong> Protection is
                provided up to a 30% threshold. Beyond that, corrective action
                will be taken.
              </li>
              <li>
                <strong>Margin Requirements:</strong> You must maintain
                sufficient funds. Inadequate margins may lead to liquidation of
                your positions.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Special Conditions
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Technical Glitches:</strong> Any issues must be reported
                immediately along with your user ID. We may take corrective
                actions such as closing your positions at CMP.
              </li>
              <li>
                <strong>Group Trading Restrictions:</strong> Only pre-approved
                group trading activities are allowed. Unauthorized group trading
                may result in account restrictions.
              </li>
              <li>
                <strong>Hedging Prohibition:</strong> Hedging is not allowed on
                our platform. Any such attempt may lead to restrictions or
                account closure.
              </li>
              <li>
                <strong>Payout Delays:</strong> May occur due to external
                factors such as banking issues. Your patience is appreciated.
              </li>
            </ul>
          </section>
        </div>

        <p className="mt-10">
          By trading on <strong>Closefriendstraders.com</strong>, you
          acknowledge and accept these terms. For any queries or support, please
          contact our support team.
        </p>

        <p className="mt-6">
          <strong>Thank you for choosing Closefriendstraders.com.</strong> We
          are committed to delivering a secure and reliable trading experience.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default TermsConditions;
