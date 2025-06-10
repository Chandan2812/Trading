import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
// import Blog from "./components/Blog";
// import BlogDetails from "./components/BlogDetails";
import Contact from "./pages/contact";
import Chatbot from "./components/Chatbot";
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

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} /> */}
          <Route path="/Contact" element={<Contact />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/Blog2" element={<Blog2 />} />
          <Route path="/blogs/:slug" element={<Blog2Details />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailer" element={<Emailer />} />
          <Route path="/newsletter" element={<NewsletterForm />} />
          <Route path="/AdminPage" element={<AdminPage />} />
        </Routes>
        <div className="hidden md:block">
          <WhatsAppButton />
        </div>
        {/* Bottom Buttons */}
        <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
          <div className="flex w-full">
            <a
              href="https://wa.me/+919584068783"
              className="w-1/2 bg-[var(--primary-color)] text-white flex justify-center items-center py-4 text-xl"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+919584068783"
              className="w-1/2 bg-black dark:bg-white text-white dark:text-black flex justify-center items-center py-4 text-xl border-l border-[var(--primary-color)]"
              title="Phone"
            >
              <FaPhoneAlt />
            </a>
          </div>
        </div>
        <Chatbot />
      </>
    </Router>
  );
}

export default App;
