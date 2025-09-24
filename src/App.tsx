import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import Market from "./pages/Market";
import Products from "./pages/Products";
import Knowledge from "./pages/Knowledge";
import RedirectToBlogs from "./components/RedirectToBlogs";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import LiveAccounts from "./pages/dashboard/LiveAccounts";
import Dashboard from "./pages/dashboard/Dashboard";
import MoneyPlantTrader from "./pages/dashboard/WebTrader";
import TradingPlatform from "./pages/dashboard/Platform";
import AdminDashboardLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/Users";
import AdminTicketsPage from "./pages/admin/SupportTicket";
import Deposit from "./pages/dashboard/Deposit";
import Withdrawal from "./pages/dashboard/Withdrawal";
import IBRequestsPage from "./pages/admin/IbPage";
import AdminTransactionPage from "./pages/admin/AllTransactions";
import BankUpdateApprovals from "./pages/admin/BankRequests";
import AdminWithdrawals from "./pages/admin/PayoutRequests";
import OffersPage from "./pages/admin/AdminOfferPage";
import ForexGlossary from "./pages/dashboard/Forex-glossary";

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
          <Route path="/:slug" element={<RedirectToBlogs />} />
          <Route
            path="/blogs/trade-smart-and-understand-the-best-dabba-app-in-india"
            element={
              <Navigate
                to="/blogs/trade-smart-exploring-best-dabba-trading-app-and-its-benefits"
                replace
              />
            }
          />
          <Route
            path="/blogs/dabba-trading-platform-is-profit-or-risk"
            element={
              <Navigate
                to="/blogs/best-dabba-trading-platform-2025-mt-45-trading-app"
                replace
              />
            }
          />
          <Route
            path="/blogs/dabba-trading-app-box-trading-platform"
            element={
              <Navigate
                to="/blogs/trade-smart-exploring-best-dabba-trading-app-and-its-benefits"
                replace
              />
            }
          />
          <Route
            path="/blogs/dabba-trading-app-in-india-a-closer-look-at-the-best-platform"
            element={
              <Navigate
                to="/blogs/trade-smart-exploring-best-dabba-trading-app-and-its-benefits"
                replace
              />
            }
          />
          <Route
            path="/blogs/trade-smart-and-understand-the-best-dabba-app-in-india"
            element={
              <Navigate
                to="/blogs/trade-smart-exploring-best-dabba-trading-app-and-its-benefits"
                replace
              />
            }
          />
          <Route
            path="/category/dabba-trading/"
            element={
              <Navigate
                to="/blogs/trade-smart-exploring-best-dabba-trading-app-and-its-benefits"
                replace
              />
            }
          />

          <Route
            path="/blogs/trading"
            element={<Navigate to="/blogs" replace />}
          />

          <Route
            path="/blogs/news-blogs"
            element={<Navigate to="/blogs" replace />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailer" element={<Emailer />} />
          <Route path="/features" element={<Feature />} />
          <Route path="/newsletter" element={<NewsletterForm />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/cfd-instrument" element={<CFDInstrument />} />
          <Route path="/products/stocks" element={<Stocks />} />
          <Route path="/products/commodity" element={<Commodity />} />
          <Route path="/products/indexes" element={<Indexes />} />
          <Route path="/products/Forex" element={<Forex2 />} />
          <Route path="/products/Comex" element={<Comex />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/knowledge/trading" element={<Trading />} />
          <Route path="/knowledge/equity-trading" element={<EquityTrading />} />
          <Route path="/knowledge/future-options" element={<FutureOptions />} />
          <Route path="/markets" element={<Market />} />
          <Route path="/markets/nse-f-o" element={<NSEFOInfo />} />
          <Route path="/markets/mcx" element={<Mcx />} />
          <Route path="/markets/crypto" element={<Crypto />} />
          <Route path="/markets/us-stocks-indices" element={<USStocks />} />
          <Route path="/markets/forex" element={<Forex />} />
          <Route path="/markets/comex" element={<ComexInfo />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/knowledge/commodity-trading"
            element={<CommodityTrading />}
          />
          <Route path="/knowledge/margin-trading" element={<MarginTrading />} />
          <Route
            path="/knowledge/intraday-trading"
            element={<IntradayTrading />}
          />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} /> {/* default dashboard */}
            <Route path="live-accounts" element={<LiveAccounts />} />
            <Route path="web-trader" element={<MoneyPlantTrader />} />
            <Route path="ourplatform" element={<TradingPlatform />} />
            <Route path="deposits" element={<Deposit />} />
            <Route path="withdrawals" element={<Withdrawal />} />
            <Route path="forex-glossary" element={<ForexGlossary />} />
          </Route>
          <Route path="/admin" element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="tickets" element={<AdminTicketsPage />} />
            <Route path="ib" element={<IBRequestsPage />} />
            <Route path="all-transactions" element={<AdminTransactionPage />} />
            <Route path="bank-approval" element={<BankUpdateApprovals />} />
            <Route path="payout-requests" element={<AdminWithdrawals />} />
            <Route path="offers" element={<OffersPage />} />
          </Route>
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
