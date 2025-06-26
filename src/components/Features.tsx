import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SwipeGallery from "./SlideShow";
import Footer from "./Footer";

import Navbar from "./Nav";

import { motion } from "framer-motion";
import bgImage from "../assets/bg-earth-desktop.webp";
import WhyChooseCFT from "./Why";
import FeaturesSplit from "./CFTFeature";
import { MergedDashboardTable } from "../pages/DashboardTables";

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
      text: "Why just trade when you can dominate?",
      style: "text-4xl font-bold",
    },
    {
      text: "CFT puts power, precision, and profits in your hands.",
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
          className="h-screen bg-cover bg-center text-white flex flex-col items-center justify-center space-y-4 px-4"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
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

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: lines.join("").length * 0.04 + 0.3,
              duration: 0.5,
            }}
            className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:bg-white shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit"
          >
            Register Now
          </motion.button>
        </section>

        {/* Section 2: Scroll Animated Cards (Desktop) & Static Cards (Mobile) */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              <span className="text-[var(--primary-color)]">CFT</span>{" "}
              Intelligence Cards
            </h2>

            {/* Desktop (with animation) */}
            <div className="hidden md:flex gap-8 flex-wrap justify-center">
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
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="w-8 h-8 bg-gray-100 dark:bg-neutral-900 border border-[var(--primary-color)] rounded-full flex items-center justify-center transition-all duration-300 text-white overflow-hidden"
                >
                  <div
                    ref={(el) => (iconRefs.current[i] = el)}
                    className="opacity-0 scale-50 text-white text-center px-3"
                  >
                    <div className="text-4xl">{card.icon}</div>
                    <div className="text-lg font-semibold mt-2">
                      {card.label}
                    </div>
                    <p className="text-sm mt-1 leading-snug text-gray-300">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile (simple stacked layout) */}
            <div className="md:hidden space-y-6">
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
                  className="bg-neutral-900 rounded-xl p-6 border border-[var(--primary-color)]"
                >
                  <div className="text-4xl mb-3">{card.icon}</div>
                  <div className="text-lg font-semibold mb-2 text-[var(--primary-color)]">
                    {card.label}
                  </div>
                  <p className="text-sm text-gray-300">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SwipeGallery />
        <MergedDashboardTable />
        <WhyChooseCFT />
        <FeaturesSplit />

        <section className="bg-[#0a0a0d] text-white py-24 px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center space-y-20 relative z-10">
            {/* Upgrade Ready */}
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeInUp}
            >
              <div className="inline-block px-6 py-2 rounded-full border border-[var(--primary-color)] text-[var(--primary-color)] text-sm uppercase tracking-widest">
                Upgrade Ready
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                CFT evolves with you.
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Regular updates based on trader feedback, market shifts, and
                real-world trading behavior.
              </p>
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
                Experience CFT Today
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Zero clutter. No confusion. Just clean, powerful trading
                intelligence.
                <br />
                <span className="text-white font-semibold mt-2 block">
                  India's #1 Trading Companion.
                </span>
                Built for performance. Backed by data. Trusted by traders.
              </p>
            </motion.div>
          </div>

          {/* Glow behind */}
          <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[var(--primary-color)] opacity-10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
        </section>
        <Footer />
      </div>
    </div>
  );
}
