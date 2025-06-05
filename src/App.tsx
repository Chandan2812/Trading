import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Contact from "./pages/contact";
import Chatbot from "./components/Chatbot";
import AboutUsSection from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Emailer from "./pages/Emailer";
import NewsletterForm from "./pages/Newsletter";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/about" element={<AboutUsSection />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailer" element={<Emailer />} />
          <Route path="/newsletter" element={<NewsletterForm />} />
        </Routes>
        {/* Bottom Buttons */}
        <div className="fixed bottom-0 left-0 w-full flex md:hidden z-[9999]">
          <div className="flex w-full">
            <a
              href="https://wa.me/1234567890"
              className="w-1/2 bg-[var(--primary-color)] text-white flex justify-center items-center py-4 text-xl"
              title="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="tel:+1234567890"
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
