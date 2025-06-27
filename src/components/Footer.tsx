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
import footerbg from "../assets/earth.jpg";
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
    <footer
      className="relative text-white px-6 py-16 transition-colors duration-500"
      style={{
        backgroundImage: `url(${footerbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="Logo" className="w-40" draggable="false" />
          </div>
          <p className="text-md leading-relaxed text-white">
            Behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts they live
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              {
                href: "https://www.facebook.com/closefriendstraders/",
                icon: <FaFacebookF size={20} />,
              },
              {
                href: "https://www.instagram.com/closefriendstraders",
                icon: <FaInstagram size={20} />,
              },
              {
                href: "https://x.com/cft_traders",
                icon: <FaTwitter size={20} />,
              },
              {
                href: "https://www.youtube.com/@closefriendstraders",
                icon: <FaYoutube size={20} />,
              },
              {
                href: "https://t.me/DabbatradingClosefriendstraders",
                icon: <FaTelegram size={20} />,
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
          <ul className="space-y-3 text-sm text-white">
            {[
              "Contact",
              "About",
              "Terms & Conditions",
              "Privacy Policy",
              "Disclaimer",
            ].map((link, idx) => {
              const formatted = link
                .toLowerCase()
                .replace(/[^a-z0-9\s]/gi, "") // remove special characters
                .replace(/\s+/g, "-"); // replace spaces with hyphens

              return (
                <li key={idx}>
                  <a
                    href={`/${formatted}`}
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Market we Serve */}
        <div>
          <h3 className="text-lg font-bold mb-4">Products</h3>
          <ul className="space-y-3 text-sm text-white">
            {["CFD Instrument", "Stocks", "Commodity", "Indexes"].map(
              (market, idx) => {
                const formatted = market
                  .toLowerCase()
                  .replace(/[^a-z0-9\s]/gi, "") // remove special characters
                  .replace(/\s+/g, "-"); // replace spaces with hyphens

                return (
                  <li key={idx}>
                    <a
                      href={`/products/${formatted}`}
                      className="hover:text-[var(--primary-color)] transition-colors"
                    >
                      {market}
                    </a>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Knowledge Center</h3>
          <ul className="space-y-3 text-sm text-white">
            {[
              "Trading",
              "Equity Trading",
              "Future & Options",
              "Commodity Trading",
              "Margin Trading",
              "Intraday Trading",
            ].map((market, idx) => {
              const formatted = market
                .toLowerCase()
                .replace(/[^a-z0-9\s]/gi, "") // remove special characters
                .replace(/\s+/g, "-"); // replace spaces with hyphens

              return (
                <li key={idx}>
                  <a
                    href={`/knowledge/${formatted}`}
                    className="hover:text-[var(--primary-color)] transition-colors"
                  >
                    {market}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Talk to Expert 24/7</h3>
          <p className="text-sm mb-4 text-white">
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
