import Footer from "../components/Footer";
import Navbar from "../components/Nav";
import TradingViewTicker from "../components/TradingViewTicker";

export const Landing = () => {
  return (
    <div>
      <Navbar />
      <TradingViewTicker />
      <Footer />
    </div>
  );
};
