import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
import logo from "../assets/logo-01.svg";
import FinlogixWidget from "./TradingViewTicker";
import { usePopup } from "../components/PopupContext";

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
  const { openPopup } = usePopup();

  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showUserSubMenu, setShowUserSubMenu] = useState(false);
  const [showBrokerSubMenu, setShowBrokerSubMenu] = useState(false);

  const [mobileLoginExpanded, setMobileLoginExpanded] = useState(false);
  const [mobileUserExpanded, setMobileUserExpanded] = useState(false);
  const [mobileBrokerExpanded, setMobileBrokerExpanded] = useState(false);

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
    { label: "Home", path: "/" },
    { label: "Insights", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/Contact" },
    { label: "Features", path: "/features" },
  ];

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          includedLanguages: "en,hi,gu,mr,ta,te,bn,ml,pa,kn,as,or",
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
      <div className="fixed top-0 w-full z-50">
        <FinlogixWidget />
      </div>

      <nav
        className={`w-full fixed z-40 border-b transition-colors ${
          darkMode
            ? "bg-black text-white border-gray-800"
            : "bg-white text-black border-gray-200"
        }`}
        style={{ top: "55px" }} // Adjust based on widget height
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Mobile View */}
            <div className="flex items-center w-full justify-between lg:hidden">
              <a href="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-1/3"
                  draggable="false"
                />
              </a>
              <div className="flex gap-4">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl"
                >
                  {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
                  <FiMenu />
                </button>
              </div>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex w-full justify-between items-center">
              <div className="flex items-center space-x-4">
                <div
                  className={`h-20 pr-6 mr-6 border-r flex items-center ${
                    darkMode ? "border-gray-400" : "border-gray-600"
                  }`}
                >
                  <a href="/">
                    <img
                      src={logo}
                      alt="Logo"
                      className="h-16"
                      draggable="false"
                    />
                  </a>
                </div>
                <div className="flex items-center gap-8">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.path}
                      onClick={() => setActiveItem(item.label)}
                      className={`pb-2 text-sm transition-colors hover:text-[var(--primary-color)] ${
                        activeItem === item.label ? "font-light text-md" : ""
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6 relative">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-xl"
                >
                  {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                <div
                  className={`w-px h-6 ${
                    darkMode ? "bg-gray-600" : "bg-gray-400"
                  }`}
                ></div>

                {/* Desktop Login Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowLoginDropdown(true)}
                  onMouseLeave={() => {
                    setShowLoginDropdown(false);
                    setShowUserSubMenu(false);
                    setShowBrokerSubMenu(false);
                  }}
                >
                  <button
                    className={`text-sm border py-2 px-4 rounded-full shadow-[0_0_10px_var(--primary-color)] transition ${
                      darkMode
                        ? "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-white hover:text-black"
                        : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-black hover:text-white"
                    }`}
                  >
                    Login
                  </button>

                  {showLoginDropdown && (
                    <div className="absolute py-5 right-0 w-44 bg-white dark:bg-black shadow-lg rounded-md text-left z-50">
                      <div
                        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer relative"
                        onMouseEnter={() => setShowUserSubMenu(true)}
                        onMouseLeave={() => setShowUserSubMenu(false)}
                      >
                        User Login
                        {showUserSubMenu && (
                          <div className="absolute py-2 right-full top-0 ml-1 w-40 bg-white dark:bg-black shadow-md rounded">
                            <a
                              href="https://Trade-dost.com"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              Version 1
                            </a>
                            <a
                              href="https://tradedostfx.com/client"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              Version 2
                            </a>
                          </div>
                        )}
                      </div>
                      <div
                        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer relative"
                        onMouseEnter={() => setShowBrokerSubMenu(true)}
                        onMouseLeave={() => setShowBrokerSubMenu(false)}
                      >
                        Broker Login
                        {showBrokerSubMenu && (
                          <div className="absolute right-full top-0 ml-1 w-40 bg-white dark:bg-black shadow-md rounded">
                            <a
                              href="https://Trade-dost.com"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              Version 1
                            </a>
                            <a
                              href="https://tradedostfx.com/master"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                              Version 2
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={openPopup}
                  className={`text-sm border py-2 px-4 rounded-full shadow-[0_0_10px_var(--primary-color)] transition ${
                    darkMode
                      ? "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-white hover:text-black"
                      : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-black hover:text-white"
                  }`}
                >
                  Start Trading Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            className={`md:hidden fixed inset-0 z-[9999] flex flex-col pl-2 pr-5 pb-6 pt-3 mt-16 ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="Logo" className="w-36" />
              <button onClick={() => setIsOpen(false)} className="text-2xl">
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
                  className="text-lg hover:text-[var(--primary-color)]"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={openPopup}
                className="w-fit text-left border border-[var(--primary-color)] text-[var(--primary-color)] py-2 px-4 rounded-md"
              >
                Start Your Trading
              </button>

              {/* Mobile Login Dropdown */}
              <div className="mt-4 ">
                <button
                  onClick={() => setMobileLoginExpanded(!mobileLoginExpanded)}
                  className="w-fit text-left border py-2 px-4 rounded-md"
                >
                  Login ▾
                </button>

                {mobileLoginExpanded && (
                  <div className="pl-4 space-y-2">
                    <button
                      onClick={() => setMobileUserExpanded(!mobileUserExpanded)}
                      className="block text-left w-full"
                    >
                      User Login ▸
                    </button>
                    {mobileUserExpanded && (
                      <div className="pl-4 space-y-1">
                        <Link to="/user-login/v1" className="block">
                          Version 1
                        </Link>
                        <Link to="/user-login/v2" className="block">
                          Version 2
                        </Link>
                      </div>
                    )}

                    <button
                      onClick={() =>
                        setMobileBrokerExpanded(!mobileBrokerExpanded)
                      }
                      className="block text-left w-full"
                    >
                      Broker Login ▸
                    </button>
                    {mobileBrokerExpanded && (
                      <div className="pl-4 space-y-1">
                        <Link to="/broker-login/v1" className="block">
                          Version 1
                        </Link>
                        <Link to="/broker-login/v2" className="block">
                          Version 2
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {!isOpen && (
        <div
          id="google_translate_element"
          className="fixed z-[99] right-[100px] top-[80px] translate-x-0 md:right-[80px] md:top-[67px] lg:right-[290px] lg:top-[80px] lg:-translate-x-1/2"
        />
      )}
    </>
  );
};

export default Navbar;
