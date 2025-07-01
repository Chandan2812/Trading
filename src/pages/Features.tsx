import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SwipeGallery from "../components/featurePageComponent/SlideShow";

import Footer from "../components/Footer";

import Navbar from "../components/Nav";

import { motion } from "framer-motion";
import bgImage from "../assets/Features Home Bg.jpg";
import WhyChooseCFT from "../components/featurePageComponent/Why";
import FeaturesSplit from "../components/featurePageComponent/CFTFeature";
// import { MergedDashboardTable } from "../components/featurePageComponent/DashboardTables";
import { usePopup } from "../components/PopupContext";

const charVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

gsap.registerPlugin(ScrollTrigger);

export default function Feature() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { openPopup } = usePopup();

  // const colors = ["#ef4444", "#facc15", "#22c55e"];
  // const icons = ["🚀", "🔒", "⚙️"];
  // const labels = ["Performance", "Security", "Reliability"];

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      const icon = iconRefs.current[i];
      if (!card || !icon) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });

      tl.to(card, {
        width: 256, // w-64
        height: 256, // h-64
        borderRadius: "16px",
        ease: "power2.out",
      });

      tl.to(
        icon,
        {
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
        },
        "<+0.2"
      );
    });
  }, []);

  const lines = [
    {
      text: "Why just trade when you can DOMINATE?",
      style: "text-4xl font-bold",
    },
    {
      text: "Close Friends Traders puts power, precision, and profits in your hands. ",
      style: "text-2xl",
    },
    { text: "Start smart. Scale faster.", style: "text-xl" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white">
      <div>
        <Navbar />
      </div>
      <div className="w-full">
        {/* Section 1: Intro */}
        <section
          className="relative h-screen bg-cover bg-center text-white flex flex-col items-center justify-center space-y-4 px-4"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center space-y-4">
            {lines.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className={`flex flex-wrap justify-center ${line.style}`}
              >
                {line.text.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            ))}

            <button onClick={openPopup}>
              <motion.button
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: lines.join("").length * 0.04 + 0.3,
                  duration: 0.5,
                }}
                className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit"
              >
                Start Trading Now
              </motion.button>
            </button>
          </div>
        </section>

        {/* Section 2: Scroll Animated Cards (Desktop) & Static Cards (Mobile) */}
        <section className="py-20 px-4 bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white transition-colors duration-300">
          <div className="w-11/12  mx-auto">
            {/* Desktop (animated cards) */}
            <div className="hidden md:flex gap-8 flex-wrap justify-center">
              {[
                {
                  color: "#ef4444",
                  icon: "📊",
                  label: "Crisp & Professional",
                  desc: "Get a 360° view of your trading business in real time",
                },
                {
                  color: "#facc15",
                  icon: "⚡",
                  label: "Bold & Catchy",
                  desc: "Your money, your market, your movers: control everything 24x7",
                },
                {
                  color: "#22c55e",
                  icon: "📈",
                  label: "Insight-Driven",
                  desc: "Track growth, efficiency, and impact like never before",
                },
                {
                  color: "#3b82f6",
                  icon: "🎯",
                  label: "Action-Focused",
                  desc: "Spot trends, fix gaps, and scale what works with real-time data.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="w-8 h-8 bg-gray-100 dark:bg-[var(--bg-color1)] border border-[var(--primary-color)] rounded-full flex items-center justify-center transition-all duration-300 text-black dark:text-white overflow-hidden"
                >
                  <div
                    ref={(el) => (iconRefs.current[i] = el)}
                    className="opacity-0 scale-50 text-center px-3"
                  >
                    <div className="text-4xl">{card.icon}</div>
                    <div className="text-lg font-semibold mt-2 text-[var(--primary-color)]">
                      {card.label}
                    </div>
                    <p className="text-sm mt-1 leading-snug text-gray-700 dark:text-gray-300">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile (static cards) */}
            <div className="md:hidden space-y-6 mt-6">
              {[
                {
                  color: "#ef4444",
                  icon: "📊",
                  label: "Crisp & Professional",
                  desc: "Get a 360° view of your trading business: revenue, lead quality, top talent, and campaign performance in real time.",
                },
                {
                  color: "#facc15",
                  icon: "⚡",
                  label: "Bold & Catchy",
                  desc: "Your money, your market, your movers: see who’s winning and what’s working, all from your CFT control panel.",
                },
                {
                  color: "#22c55e",
                  icon: "📈",
                  label: "Insight-Driven",
                  desc: "From L0 leads to L2 loyalists, track growth, efficiency, and impact like never before.",
                },
                {
                  color: "#3b82f6",
                  icon: "🎯",
                  label: "Action-Focused",
                  desc: "Turn insights into impact. Spot trends, fix gaps, and scale what works with real-time data at your fingertips.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-gray-100 dark:bg-neutral-900 rounded-xl p-6 border border-[var(--primary-color)] transition-all"
                >
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <div className="text-lg font-semibold mb-2 text-[var(--primary-color)]">
                    {card.label}
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SwipeGallery />
        {/* <MergedDashboardTable /> */}
        <WhyChooseCFT />
        <FeaturesSplit />

        <section className="py-12 bg-white dark:bg-[var(--bg-color1)] transition-colors duration-300">
          <div className="w-11/12 max-w-5xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              How it Works
            </h1>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              <span className="font-semibold text-[var(--primary-color)]">
                Close Friends Traders
              </span>{" "}
              connects your trading, CRM, and ad data into one unified
              dashboard. It processes everything in real time, giving you
              instant insights, alerts, and control — all without the
              complexity.
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white py-12 relative overflow-hidden transition-colors duration-500">
          <div className="w-11/12 md:w-5/6 mx-auto text-center space-y-20 relative z-10">
            {/* Upgrade Ready */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
            >
              <div className="inline-block   text-[var(--primary-color)] text-2xl uppercase tracking-widest">
                Upgrade Now
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Close Friends Traders evolves with you.
              </h2>
              <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
                Regular updates based on trader feedback, market shifts, and
                real-world trading behavior.
              </p>
              <button
                onClick={openPopup}
                className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
              >
                Start Trading Now
              </button>
            </motion.div>

            {/* Divider Glow Line */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent blur-sm opacity-40" />

            {/* Experience CFT Today */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                Experience Close Friends Traders Today
              </h2>
              <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
                <br />
                <span className="text-black dark:text-white font-semibold mt-2 block">
                  India's #1 Trading Companion.
                </span>
                Built for performance. Backed by data. Trusted by traders.
              </p>
              <button
                onClick={openPopup}
                className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
              >
                Start Trading Now
              </button>
            </motion.div>
          </div>

          {/* Glow Behind */}
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[var(--primary-color)] opacity-10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        </section>

        <Footer />
      </div>
    </div>
  );
}
