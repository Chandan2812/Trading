import ComparisonSection from "../components/Comparision";
import DabbaMarkets from "../components/DabbaMarkets";
import DownloadSection from "../components/DownloadSection";
import FAQ from "../components/Faq";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import HowItWorks from "../components/HowITWork";
import Carousel from "../components/ImageCarousel";
import Navbar from "../components/Nav";
import Popup from "../components/PopUp";
import RegulatoryDisclaimer from "../components/RegulatoryDisclaimer";
import ScrollingIcons from "../components/ScrollingIcons";
import StatsSection from "../components/Stats";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Trusted from "../components/Trusted";
import WhyChoose from "../components/WhyChooseUs";
import WhyTrade from "../components/WhyTrade";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyChoose />
      <Carousel />
      <StatsSection />
      <Trusted />
      <WhyTrade />
      <HowItWorks />
      <ComparisonSection />

      <DownloadSection />
      <DabbaMarkets />
      <TestimonialCarousel />
      <ScrollingIcons />
      <FAQ />
      <section className="bg-white dark:bg-black text-black dark:text-white py-16 px-6 transition-colors duration-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-6 leading-tight">
            Trade Big. Trade Smart. <br className="sm:hidden" />
            <span className="italic text-[var(--primary-color)]">
              Trade Close Friends Traders
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6">
            Take control of your trades with{" "}
            <strong>1,500+ global instruments</strong> including Forex, Indices,
            Commodities and Shares — all on one seamless platform. With{" "}
            <strong>₹0 brokerage</strong> and reliable payouts, Close Friends
            Traders gives you the edge to trade smart and stay ahead.
          </p>
          <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 mb-4">
            Start with just <strong>₹100</strong> or explore risk-free with a{" "}
            <strong>Demo Account</strong>. Made for Indian traders who think
            sharp and trade sharper.
          </p>
          <p className="text-lg font-semibold text-gray-800 dark:text-white mt-6 italic">
            Close Friends Traders — Where serious trading begins.
          </p>
        </div>
      </section>

      <Footer />
      <RegulatoryDisclaimer />
      <Popup />
    </div>
  );
};
