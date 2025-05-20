import {
  FaFacebookF,
  FaInstagram,
  FaTelegram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import logo from "../assets/logo-01.svg";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#1a1a1a] to-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={logo} alt="Logo" className="w-40" />
          </div>
          <p className="text-sm leading-relaxed">
            Behind the word mountains, far from the countries Vokalia and
            Consonantia, there live the blind texts they live
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="bg-[var(--primary-color)] text-black p-2 rounded-full hover:opacity-80 dark:shadow-[0_0_10px_var(--primary-color)]"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="#"
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
          <form className="flex">
            <input
              type="email"
              placeholder="Your mail here"
              className="rounded-l-full px-4 py-2 text-sm text-black outline-none w-full"
            />
            <button
              type="submit"
              className="bg-[var(--primary-color,#e5c97e)] px-4 py-2 rounded-r-full"
            >
              <IoMdSend className="text-black text-lg" />
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
