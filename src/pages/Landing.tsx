import DownloadSection from "../components/DownloadSection";
import Footer from "../components/Footer";
import HeroSection from "../components/Hero";
import Navbar from "../components/Nav";
import WhyTrade from "../components/WhyTrade";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyTrade />
      <DownloadSection />
      <Footer />
    </div>
  );
};
