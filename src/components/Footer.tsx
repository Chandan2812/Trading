import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import logo from "../assets/logo-01.svg";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://cft-b87k.onrender.com/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setEmail("");
      } else {
        setMessage(data.error || "Subscription failed.");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-black text-white px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="Logo" className="w-40" draggable="false" />
          </div>
          <p className="text-sm leading-relaxed">
            Behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts they live
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/closefriendstraders"
              target="blank"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/closefriendstraders"
              target="blank"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/cft_traders"
              target="blank"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.youtube.com/@closefriendstraders/shorts"
              target="blank"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://t.me/closefriendstraderscft"
              target="blank"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaTelegram size={24} />
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-sm ">
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Condition
              </a>
            </li>
          </ul>
        </div>

        {/* Market we Serve */}
        <div>
          <h3 className="text-lg font-bold mb-4">Market we Servie</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Commodity Market
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                FOREX Trading Partner
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Futures and Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                Margin Trading Market
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--primary-color)]">
                CRYPTO Trading Market
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Talk to Expert 24/7</h3>
          <p className="text-sm mb-4">
            Don’t miss our future updates! Get Subscribed Today!
          </p>
          <form
            onSubmit={handleSubscribe}
            className="flex items-center max-w-[300px] w-full"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your mail here"
              className="flex-grow rounded-l-full px-4 py-[7px] text-sm text-black outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary-color,#e5c97e)] px-4 py-2   rounded-r-full flex items-center justify-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
              ) : (
                <IoMdSend className="text-black text-lg" />
              )}
            </button>
          </form>

          {message && (
            <p className="text-sm mt-2 text-[var(--primary-color)]">
              {message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <a
          href="https://www.bigwigdigital.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-3 uppercase text-xs tracking-widest  text-center"
        >
          Made & Marketed with ❤️ by Bigwig Digital
        </a>
      </div>
    </footer>
  );
};

export default Footer;
