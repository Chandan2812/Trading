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
const baseURL = import.meta.env.VITE_API_BASE_URL;

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
      const res = await fetch(`${baseURL}/subscribe`, {
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
    <footer className="bg-gradient-to-b from-gray-100 to-white dark:from-[#1a1a1a] dark:to-black text-black dark:text-white px-6 py-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="Logo" className="w-40" draggable="false" />
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            Behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts they live
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              {
                href: "https://www.facebook.com/closefriendstraders/",
                icon: <FaFacebookF size={24} />,
              },
              {
                href: "https://www.instagram.com/closefriendstraders",
                icon: <FaInstagram size={24} />,
              },
              {
                href: "https://x.com/cft_traders",
                icon: <FaTwitter size={24} />,
              },
              {
                href: "https://www.youtube.com/@closefriendstraders",
                icon: <FaYoutube size={24} />,
              },
              {
                href: "https://t.me/DabbatradingClosefriendstraders",
                icon: <FaTelegram size={24} />,
              },
            ].map(({ href, icon }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--primary-color)] text-black dark:text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)] transition"
                aria-label={`Link to social media ${idx + 1}`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {["Home", "Contact", "About", "Terms", "Condition"].map(
              (link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Market we Serve */}
        <div>
          <h3 className="text-lg font-bold mb-4">Market we Serve</h3>
          <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            {[
              "NSE(Futures and Options)",
              "MCX",
              "Cryptos",
              "Forex",
              "Us Stocks & Indices",
              "Comex",
            ].map((market, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className="hover:text-[var(--primary-color)] transition-colors"
                >
                  {market}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Talk to Expert 24/7</h3>
          <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
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
              className="flex-grow rounded-l-full px-4 py-[7px] text-sm text-black outline-none disabled:bg-gray-200 disabled:dark:bg-gray-700"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary-color,#e5c97e)] px-4 py-2 rounded-r-full flex items-center justify-center transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Subscribe to newsletter"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin dark:border-white" />
              ) : (
                <IoMdSend className="text-black dark:text-black text-lg" />
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

      {/* <div className="w-full flex justify-center mt-10">
        <a
          href="https://www.bigwigdigital.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-[var(--primary-color)] text-[var(--primary-color)] px-4 py-3 uppercase text-xs tracking-widest text-center transition-colors  hover:text-black dark:hover:text-white"
        >
          Made & Marketed with ❤️ by Bigwig Digital
        </a>
      </div> */}
    </footer>
  );
};

export default Footer;
