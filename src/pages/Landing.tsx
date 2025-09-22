import { Helmet } from "react-helmet-async";
import ComparisonSection from "../components/Comparision";
import DabbaMarkets from "../components/DabbaMarkets";
import DownloadSection from "../components/DownloadSection";
import FAQ from "../components/Faq";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import HowItWorks from "../components/HowITWork";
import Carousel from "../components/ImageCarousel";
import Navbar from "../components/Nav";
// import Popup from "../components/PopUp";
// import RegulatoryDisclaimer from "../components/RegulatoryDisclaimer";
import ScrollingIcons from "../components/ScrollingIcons";
import StatsSection from "../components/Stats";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Trusted from "../components/Trusted";
import WhyChoose from "../components/WhyChooseUs";
import WhyTrade from "../components/WhyTrade";

export const Landing = () => {
  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Trade smarter  with Close Friends Traders – India’s trusted insider trading group offering premium signals, 
500× leverage, zero tax, and expert mentorship. Join our private trading community for real-time setups 
across forex, crypto, indices, and stocks."
        />

        <link rel="canonical" href="https://www.closefriendstraders.com/" />
      </Helmet>
      <Navbar />
      <HeroSection />
      <WhyChoose />
      <Carousel />
      <WhyTrade />

      <Trusted />
      <StatsSection />
      <HowItWorks />
      <ComparisonSection />

      <DownloadSection />
      <DabbaMarkets />
      <TestimonialCarousel />
      <ScrollingIcons />
      <FAQ />
      <Footer />
      {/* <RegulatoryDisclaimer /> */}
      {/* <Popup /> */}
    </div>
  );
};
