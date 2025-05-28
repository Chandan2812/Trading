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
import AdminPage from "./admin/AdminPage";

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
          <Route path="/AdminPage" element={<AdminPage />} />
        </Routes>
        <Chatbot />
      </>
    </Router>
  );
}

export default App;
