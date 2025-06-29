import PageBanner from "../../components/BannerImage";
import Footer from "../../components/Footer";
import Navbar from "../../components/Nav";

function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="mb-20">
        {" "}
        <Navbar />
      </div>
      <PageBanner title="Privacy Policy" />

      <main className="flex-grow bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white px-4 md:px-8 lg:px-32 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-8">
          Privacy Policy – Close Friends Traders (CFT)
        </h1>

        <p className="mb-6">
          At <strong>Close Friends Traders</strong>, we value your privacy and
          are committed to protecting your personal information. This Privacy
          Policy explains how we collect, use, disclose, and safeguard your data
          when you visit our website or use our services.
        </p>

        <p className="mb-6">
          This policy applies only to our online activities and is valid for
          visitors to our website. If you have any questions, feel free to
          contact us at{" "}
          <a
            href="mailto:info@closefriendtrader.in"
            className="text-[var(--primary-color)] underline"
          >
            info@closefriendtrader.in
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            etc., collected during account registration or interaction.
          </li>
          <li>
            <strong>Financial Information:</strong> Details such as bank account
            or card information required for transactions.
          </li>
          <li>
            <strong>Usage Information:</strong> IP address, browser, device, and
            interaction behavior with the site.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          2. Use of Information
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>To provide and maintain our services</li>
          <li>To improve website experience</li>
          <li>To send marketing/promotional emails (with consent)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          3. Disclosure of Information
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            Shared with trusted third-party providers under confidentiality
            agreements
          </li>
          <li>Disclosed when legally required or to protect rights/safety</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">4. Data Security</h2>
        <p className="mb-6">
          We employ industry-standard security measures to protect your data.
          However, no online system is completely secure, and we cannot
          guarantee absolute protection.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">5. Your Choices</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            Access, correct, or delete your personal data through your account
            or by contacting us.
          </li>
          <li>
            Opt-out of marketing emails by using unsubscribe links or contacting
            us directly.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          6. Changes to this Privacy Policy
        </h2>
        <p className="mb-6">
          We may update this policy at any time. Updates will be posted on this
          page with the revised date.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          7. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Operate and maintain our site</li>
          <li>Improve and personalize user experience</li>
          <li>Analyze usage patterns</li>
          <li>Develop new features</li>
          <li>Communicate with users about updates and offers</li>
          <li>Send transactional and promotional emails</li>
          <li>Detect and prevent fraud</li>
        </ul>

        <h2 className="text-xl font-semibold mt-10 mb-4">8. Contact Us</h2>
        <p className="mb-6">
          For questions or concerns regarding this policy, email us at{" "}
          <a
            href="mailto:info@closefriendtrader.in"
            className="text-[var(--primary-color)] underline"
          >
            info@closefriendtrader.in
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">9. Consent</h2>
        <p className="mb-6">
          By using our website, you consent to this privacy policy and agree to
          its terms.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          10. Advertising Partners Privacy Policies
        </h2>
        <p className="mb-6">
          Third-party advertisers on closefriendstraders.com may use cookies,
          JavaScript, or Web Beacons. These are used to personalize content and
          measure ad effectiveness. We do not control their cookies and
          recommend reviewing their individual privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          11. GDPR Data Protection Rights
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <strong>Access:</strong> Request copies of your data
          </li>
          <li>
            <strong>Rectification:</strong> Correct inaccurate or incomplete
            data
          </li>
          <li>
            <strong>Erasure:</strong> Request deletion of your data
          </li>
          <li>
            <strong>Restrict Processing:</strong> Request data use limitation
          </li>
          <li>
            <strong>Object to Processing:</strong> Oppose specific uses
          </li>
          <li>
            <strong>Data Portability:</strong> Request data transfer to another
            provider
          </li>
        </ul>
        <p className="mb-6">
          We will respond within one month of your request.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          12. Children’s Information
        </h2>
        <p className="mb-6">
          We do not knowingly collect information from children under 13.
          Parents or guardians noticing such data should contact us for prompt
          removal.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">
          13. Updates to This Policy
        </h2>
        <p className="mb-6">
          We may update this privacy policy periodically. Any changes will be
          posted on this page and take effect immediately.
        </p>

        <h2 className="text-xl font-semibold mt-10 mb-4">Disclaimer</h2>
        <p className="mb-6">
          Dabba trading is considered insecure and unlawful. It does not offer
          investor protections typically provided by regulated exchanges. Users
          participating in dabba trading assume all associated risks.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
