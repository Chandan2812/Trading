import DabbaMarkets from "../components/DabbaMarkets";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";

function Market() {
  return (
    <div className="bg-white dark:bg-[var(--bg-color1)]">
      <div className="mb-12">
        <Navbar />
      </div>
      <DabbaMarkets />
      <Footer />
    </div>
  );
}

export default Market;
