import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from "./pages/Landing";
import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Contact from "./pages/contact";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
        <Chatbot />
      </>
    </Router>
  );
}

export default App;
