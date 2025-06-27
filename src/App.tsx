import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import Contact from "./pages/contact";
import AboutUsSection from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Emailer from "./pages/Emailer";
import NewsletterForm from "./pages/Newsletter";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import AdminPage from "./admin/AdminPage";
import Blog2 from "./pages/Blog2";
import Blog2Details from "./pages/Blog2Details";
import WhatsAppButton from "./components/floatingBtn";
import ZohoSalesIQ from "./components/ZohoSalesIQ";
import OfferPopup from "./components/OfferPopup";
import Feature from "./components/Features";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CFDInstrument from "./pages/CFDInstrument";
import Stocks from "./pages/Stocks";
import Commodity from "./pages/Commodity";
import Indexes from "./pages/Indexes";
import Disclaimer from "./pages/Disclaimer";
import Trading from "./pages/Trading";
import EquityTrading from "./pages/equityTrading";
import FutureOptions from "./pages/FutureOptions";
import CommodityTrading from "./pages/CommodityTrading";
import MarginTrading from "./pages/MarginTrading";
import IntradayTrading from "./pages/IntradayTrading";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/blogs" element={<Blog2 />} />
          <Route path="/blogs/:slug" element={<Blog2Details />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailer" element={<Emailer />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/newsletter" element={<NewsletterForm />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/products/cfd-instrument" element={<CFDInstrument />} />
          <Route path="/products/stocks" element={<Stocks />} />
          <Route path="/products/commodity" element={<Commodity />} />
          <Route path="/products/indexes" element={<Indexes />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/knowledge/trading" element={<Trading />} />
          <Route path="/knowledge/equity-trading" element={<EquityTrading />} />
          <Route path="/knowledge/future-options" element={<FutureOptions />} />
          <Route
            path="/knowledge/commodity-trading"
            element={<CommodityTrading />}
          />
          <Route path="/knowledge/margin-trading" element={<MarginTrading />} />
          <Route
            path="/knowledge/intraday-trading"
            element={<IntradayTrading />}
          />
        </Routes>
        <div className="hidden md:block">
          <WhatsAppButton />
        </div>
        {/* Bottom Buttons */}
        <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
          <div className="flex w-full">
            <a
              href="https://wa.me/+917045263033"
              className="w-1/2 bg-[var(--primary-color)] text-white flex justify-center items-center py-4 text-xl"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+917045263033"
              className="w-1/2 bg-black dark:bg-white text-white dark:text-black flex justify-center items-center py-4 text-xl border-l border-[var(--primary-color)]"
              title="Phone"
            >
              <FaPhoneAlt />
            </a>
          </div>
        </div>
        <ZohoSalesIQ />
        <OfferPopup />
      </>
    </Router>
  );
}

export default App;
