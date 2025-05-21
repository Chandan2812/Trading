import DabbaMarkets from "../components/DabbaMarkets";
import DownloadSection from "../components/DownloadSection";
import FAQ from "../components/Faq";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import HowItWorks from "../components/HowITWork";
import Carousel from "../components/ImageCarousel";
import Navbar from "../components/Nav";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Trusted from "../components/Trusted";
import WhyTrade from "../components/WhyTrade";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Carousel />
      <Trusted />
      <WhyTrade />
      <HowItWorks />

      <DownloadSection />
      <DabbaMarkets />
      <TestimonialCarousel />
      <FAQ />
      <Footer />
    </div>
  );
};
