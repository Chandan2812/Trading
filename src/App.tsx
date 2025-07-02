import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import Contact from "./pages/contact";
import AboutUsSection from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Emailer from "./pages/Emailer";
import NewsletterForm from "./pages/Newsletter";
// import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import AdminPage from "./admin/AdminPage";
import Blog2 from "./pages/Blog2";
import Blog2Details from "./pages/Blog2Details";
import WhatsAppButton from "./components/floatingBtn";
import ZohoSalesIQ from "./components/ZohoSalesIQ";
import OfferPopup from "./components/OfferPopup";
import Feature from "./pages/Features";

import Stocks from "./pages/footerPage/products/Stocks";

import Disclaimer from "./pages/Disclaimer";
import Trading from "./pages/footerPage/knowledgeCenter/Trading";
import EquityTrading from "./pages/footerPage/knowledgeCenter/equityTrading";
import FutureOptions from "./pages/footerPage/knowledgeCenter/FutureOptions";

import MarginTrading from "./pages/footerPage/knowledgeCenter/MarginTrading";
import IntradayTrading from "./pages/footerPage/knowledgeCenter/IntradayTrading";
import NSEFOInfo from "./pages/Markets/Nse";
import Mcx from "./pages/Markets/Mcx";
import Crypto from "./pages/Markets/Crypto";
import USStocks from "./pages/Markets/UsStocks";
import Forex from "./pages/Markets/Forex";
import Forex2 from "./pages/footerPage/products/Forex";
import Comex from "./pages/footerPage/products/Comex";
import ComexInfo from "./pages/Markets/Comex";
import CFDInstrument from "./pages/footerPage/products/CFDInstrument";
import Commodity from "./pages/footerPage/products/Commodity";
import Indexes from "./pages/footerPage/products/Indexes";
import CommodityTrading from "./pages/footerPage/knowledgeCenter/CommodityTrading";
import TermsConditions from "./pages/footerPage/TermsConditions";
import PrivacyPolicy from "./pages/footerPage/PrivacyPolicy";

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
          <Route path="/products/Forex" element={<Forex2 />} />
          <Route path="/products/Comex" element={<Comex />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/knowledge/trading" element={<Trading />} />
          <Route path="/knowledge/equity-trading" element={<EquityTrading />} />
          <Route path="/knowledge/future-options" element={<FutureOptions />} />
          <Route path="/markets/nse-f-o" element={<NSEFOInfo />} />
          <Route path="/markets/mcx" element={<Mcx />} />
          <Route path="/markets/crypto" element={<Crypto />} />
          <Route path="/markets/us-stocks-indices" element={<USStocks />} />
          <Route path="/markets/forex" element={<Forex />} />
          <Route path="/markets/comex" element={<ComexInfo />} />
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
        <div>
          <WhatsAppButton />
        </div>
        {/* Bottom Buttons */}
        {/* <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
          <div className="flex w-full">
            <a
              href="https://wa.me/+918368284948"
              className="w-1/2 bg-[var(--primary-color)] text-white flex justify-center items-center py-4 text-xl"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+918368284948"
              className="w-1/2 bg-black dark:bg-white text-white dark:text-black flex justify-center items-center py-4 text-xl border-l border-[var(--primary-color)]"
              title="Phone"
            >
              <FaPhoneAlt />
            </a>
          </div>
        </div> */}
        <ZohoSalesIQ />
        <OfferPopup />
      </>
    </Router>
  );
}

export default App;
