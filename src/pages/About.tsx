import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import worldGraph from "../assets/1.png";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import { FaCheckCircle } from "react-icons/fa";
import { usePopup } from "../components/PopupContext";

const points = [
  {
    title: "Begin trading for just ₹1000",
    desc: "Begin without making significant commitments. Start trading for as low as ₹1000 and increase as you see fit.",
  },
  {
    title: "No Commission",
    desc: "Don't spend your earnings. There are no charges, fees, or brokerage surprises when you trade with us.",
  },
  {
    title: "500x Leverage",
    desc: "Use the least amount of capital to increase your market exposure. Make large trades without breaking the bank.",
  },
  {
    title: "No Tax",
    desc: "Bid farewell to profit and withdrawal tax breaks. You are entitled to keep what you earn.",
  },
  {
    title: "Instant Withdrawals",
    desc: "There are no delays. Take your money out whenever you want. It is quick, safe, and stress-free.",
  },
  {
    title: "Trading Insights in Real Time",
    desc: "Use price alerts, smart charts, and real-time market data to stay informed.",
  },
];

const sections = [
  {
    title: "Our Mission",
    text: "To provide Indian traders with an easily accessible, dependable, and goal-oriented platform. Close Friends Traders provides the groundwork for success on your terms, whether you're learning the ropes, becoming pro, or accumulating long-term riches. Our goal is to cut through the clutter and make trading easier, not easier. We're creating a community where growth is individualized, performance is important, and trust is valued.",
  },
  {
    title: "Our Journey",
    text: "Well, we want to be 100% transparent with you! Close Friends Traders was born out of frustration…yes, it is! We were fed up with unstated fees, sluggish withdrawals, and trading methods that were ineffective for actual users. So, we built Close Friends Traders with the sole purpose of facilitating quick and hassle-free trading for all users. Just strong tools, real-time data, and a close-knit community of traders that appreciate control and clarity! Close Friends Traders was created by traders, for traders. And we have only just begun.",
  },
];

const offers = [
  {
    id: 1,
    title: "Powerful Trading Experience",
    desc: "Trade with complete control, accuracy, and speed. Use a quick, user-friendly platform designed for serious Indian traders to access more than 1,500 instruments.",
  },
  {
    id: 2,
    title: "One Account, Several Markets",
    desc: "With only one login, gain access to a variety of domestic and international markets:",
    bullets: [
      "NSE Options & Futures",
      "MCX (Oil, Gold, etc.)",
      "Cryptocurrencies",
      "US Indices & Stocks",
      "Forex Pairs",
      "Metals Comex",
    ],
  },
  {
    id: 3,
    title: "One-Stop Trading Resources",
    desc: "Use a streamlined, mobile-friendly interface to access technical indicators, intelligent alerts, and integrated risk management features.",
  },
];

const AboutUsSection = () => {
  const { openPopup } = usePopup();
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  return (
    <div className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white">
      <div className="mb-20">
        <Navbar />
      </div>

      <section className="flex flex-col lg:flex-row items-center justify-between mx-auto gap-8 py-16 w-11/12 md:w-5/6">
        {/* Left: Text Content with AOS animations */}
        <div className="w-full lg:w-1/2">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            India’s No. 1 <br className="sm:hidden" />
            <span className="text-[var(--primary-color)]">
              Leading Trading Platform
            </span>
          </h2>
          <p
            className="text-gray-700 dark:text-white text-lg mb-4"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            Built by traders. Backed by innovation. Powered by trust.
          </p>
          <p
            className="text-gray-700 dark:text-gray-200 mb-4 md:max-w-xl"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            We at <strong>Close Friends Traders</strong> think trading must be
            straightforward and simple! Our goal is to provide every trader with
            the technology, transparency, and resources they need to succeed in
            the markets free from unneeded fees, delays, or distractions. aim to
            get you into the market as soon as possible, provide you with
            real-time information to keep you informed, and support your growth
            with features designed to meet your needs rather than just ours.
          </p>
          <button
            onClick={openPopup}
            className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
          >
            Start Trading Now
          </button>
        </div>

        {/* Right: Image with AOS animation */}
        <div
          className="w-full lg:w-1/2"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <img
            src={worldGraph}
            alt="Trading Graph"
            className="w-2/3 object-cover rounded-lg shadow-md mx-auto"
            draggable="false"
          />
        </div>
      </section>

      <section className="bg-gray-50 dark:bg-[var(--bg-color1)] py-12 text-black dark:text-white transition-colors duration-300">
        <div className="w-11/12 md:w-5/6 mx-auto">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            Our Core Features That Power Every Trade
          </h2>

          <p
            className="text-center  mx-auto mb-16 text-gray-700 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Close Friends Traders is made for speed, clarity, and total control,
            in contrast to conventional stock brokers or trading apps. Sharp
            tools, immediate onboarding, and a platform that works for you
            rather than against you are what you'll discover here!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {points.map((point, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[var(--bg-color1)] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-[0_0_20px_var(--primary-color)] transition-all"
                data-aos="zoom-in"
                data-aos-delay={150 + index * 100}
              >
                <h3 className="text-lg font-semibold mb-2 text-[var(--primary-color)]">
                  {point.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-400">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-[var(--bg-color1)] py-12 text-black dark:text-white transition-colors duration-300">
        <div className="w-11/12 md:w-5/6 mx-auto relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--primary-color)] z-0 hidden sm:block"></div>

          <div className="space-y-20 relative z-10">
            {sections.map((sec, index) => (
              <div
                key={index}
                className={`flex flex-col sm:flex-row items-center gap-10 ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
                data-aos={index % 2 === 0 ? "flip-left" : "flip-right"}
              >
                {/* Card content */}
                <div className="bg-white dark:bg-[var(--bg-color1)]  p-6 rounded-xl shadow-2xl sm:w-11/12 backdrop-blur-2xl">
                  <h3 className="text-2xl font-bold mb-3 text-[var(--primary-color)]">
                    {sec.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {sec.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-[var(--bg-color1)] py-12  transition-colors duration-300">
        <div className="w-11/12 md:w-5/6 mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold mb-4" data-aos="fade-up">
            What We <span className="text-[var(--primary-color)]">Offer?</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-11/12 md:w-5/6 mx-auto">
          {offers.map((item, idx) => (
            <div
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 200}
              className="relative bg-white dark:bg-[var(--bg-color1)] bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-xl hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Number Badge */}
              <div className="absolute -top-4 left-4 w-10 h-10 bg-[var(--primary-color)] text-white font-bold rounded-full flex items-center justify-center shadow-md">
                {item.id}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-[var(--primary-color)]">
                {item.title}
              </h3>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {item.desc}
              </p>

              {/* Bullet points if exist */}
              {item.bullets && (
                <ul className="space-y-2 mt-2">
                  {item.bullets.map((point, i) => (
                    <li
                      key={i}
                      className="flex  items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <FaCheckCircle className="text-green-500 mt-[2px]" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-[var(--bg-color1)] py-12">
        <div className="w-11/12 md:w-5/6 mx-auto flex flex-col-reverse lg:flex-row items-center gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-2/3" data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl font-semibold leading-tight mb-6">
              Join the{" "}
              <span className="text-[var(--primary-color)]">
                Close Friends Traders Movement
              </span>
            </h2>

            <p className="text-gray-700 dark:text-gray-300 text-md mb-4">
              We are not just another trading business. We are a platform
              designed to meet the needs of Indian users who want more
              authority, clarity, and control. In any case, from Day 1, you are
              in control. 5 million+ users have switched! They have witnessed
              genuine development, better trades, and quicker rewards. You can,
              too.
            </p>

            <div className=" gap-6 mt-6">
              <div className="bg-white dark:bg-[var(--bg-color1)] border border-[var(--primary-color)] rounded-xl shadow p-5">
                <h4 className="text-xl font-semibold text-[var(--primary-color)] mb-2">
                  Real Trading Starts with Close Friends Traders
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  We take pride in our accomplishments. However, we are much
                  more enthusiastic about the future. We're only getting
                  started, from new tools and platform enhancements to larger
                  markets and improved education. Make wiser trades.
                </p>
                <p className="italic font-bold mt-5">
                  Trade smarter. Trade bolder. Choose Close Friends Traders
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Visual or Illustration (optional placeholder) */}
          <div
            className="w-full lg:w-1/3 md:flex justify-center hidden"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-6">
              {/* Circle Counter */}
              <div className="border border-[var(--primary-color)] text-white rounded-full w-[250px] h-[250px] flex items-center justify-center text-center p-6 shadow-2xl">
                <div>
                  <p className="text-5xl font-bold">5M+</p>
                  <p className="text-sm font-semibold mt-2">Traders Joined</p>
                  <p className="text-xs mt-1 opacity-70">and counting...</p>
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={openPopup}
                className="bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
              >
                Start Trading Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsSection;
