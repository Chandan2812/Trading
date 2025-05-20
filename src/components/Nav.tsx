import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo-01.svg";
import TradingViewTicker from "./TradingViewTicker";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navItems = [
    { label: "Learn To Trade", path: "/" },

    { label: "Insights", path: "/" },
    { label: "About Us", path: "/" },
    { label: "Contact Us", path: "/" },
  ];

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const loadGoogleTranslateScript = () => {
      if (!window.googleTranslateElementInit) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    loadGoogleTranslateScript();
  }, []);

  return (
    <>
      <div className="w-full fixed top-0 z-[60]">
        <TradingViewTicker />
      </div>
      <nav className="bg-white dark:bg-black text-black dark:text-white mt-16 md:mt-12 w-full fixed top-0 z-50 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Mobile View */}
            <div className="flex items-center w-full justify-between md:hidden">
              <a href="/">
                <img
                  src={logo}
                  alt="Mondus Logo"
                  className="w-1/3"
                  draggable="false"
                />
              </a>

              <div className="flex gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl text-inherit"
                  title="Toggle Theme"
                >
                  {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-inherit text-2xl"
                >
                  <FiMenu />
                </button>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden md:flex w-full justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="h-20 pr-6 mr-6 border-r border-gray-600 dark:border-gray-400 flex items-center">
                  <a href="/">
                    <img src={logo} alt="AX Logo" className="h-16" />
                  </a>
                </div>
                <div className="flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.path}
                      onClick={() => setActiveItem(item.label)}
                      className={`relative pb-2 text-sm text-inherit transition-colors hover:text-[var(--primary-color)] ${
                        activeItem === item.label ? "font-light text-md" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="text-xl text-inherit transition-colors"
                    title="Toggle Theme"
                  >
                    {darkMode ? <FiSun /> : <FiMoon />}
                  </button>
                  <div className="w-px h-6 bg-gray-400 dark:bg-gray-600"></div>
                </div>

                {/* Login and Sign Up */}
                <div className="flex items-center space-x-4">
                  <a
                    href="#"
                    className="text-sm hover:bg-white hover:text-black transition border border-[var(--primary-color)] py-2 px-4 rounded-full text-[var(--primary-color)] dark:shadow-[0_0_10px_var(--primary-color)]"
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    className="bg-[var(--primary-color)] text-black text-sm px-4 py-2 rounded-full border border-[var(--primary-color)] hover:bg-white transition dark:shadow-[0_0_15px_var(--primary-color)]"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col pl-2 pr-5 pb-6 pt-3 mt-20">
            <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="trading Logo" className="w-36" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-inherit"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col space-y-4 px-5">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={() => {
                    setActiveItem(item.label);
                    setIsOpen(false);
                  }}
                  className="text-lg text-inherit hover:text-[var(--primary-color)] transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Login and Sign Up buttons */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-1/2 text-base text-inherit text-center border border-[var(--primary-color)] py-2 rounded-md hover:text-[var(--primary-color)] transition"
                >
                  Login
                </a>
                <a
                  href="#"
                  className="w-1/2 text-base bg-[var(--primary-color)] text-white text-center py-2 rounded-md hover:opacity-90 transition"
                >
                  Sign Up
                </a>
              </div>
            </div>

            {/* Bottom Buttons */}
            <div className="absolute bottom-0 left-0 w-full flex">
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
          </div>
        )}
      </nav>

      {!isOpen && (
        <div
          id="google_translate_element"
          className="fixed z-[999] right-[90px] top-[85px] translate-x-0 md:right-[230px] md:top-[70px] md:-translate-x-1/2"
        />
      )}
    </>
  );
};

export default Navbar;
