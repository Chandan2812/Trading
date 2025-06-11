import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiMoon, FiSun } from "react-icons/fi";
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
  const [user, setUser] = useState<any>(null);

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
  const userdata = JSON.parse(localStorage.getItem("user") || "null");

  const navItems = [
    { label: "Home", path: "/" },

    { label: "Insights", path: "/blogs" },
    { label: "About Us", path: "/about" },
    { label: "Contact Us", path: "/Contact" },
  ];

  if (userdata && userdata.email.toLowerCase() === "admin@gmail.com") {
    navItems.push({ label: "Admin", path: "/AdminPage" });
  }

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
          includedLanguages: "en,hi,gu,mr,ta,te,bn,ml,pa,kn,as,or", // English + Indian languages
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

      <nav
        className={`w-full fixed top-0 z-50 mt-16 md:mt-11 border-b transition-colors 
    ${
      darkMode
        ? "bg-black text-white border-gray-800"
        : "bg-white text-black border-gray-200"
    }`}
      >
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Mobile View */}
            <div className="flex items-center w-full justify-between lg:hidden">
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
                      alt="CFT"
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
                      className={`relative pb-2 text-sm transition-colors hover:text-[var(--primary-color)] 
                  ${activeItem === item.label ? "font-light text-md" : ""}`}
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
                  <div
                    className={`w-px h-6 ${
                      darkMode ? "bg-gray-600" : "bg-gray-400"
                    }`}
                  ></div>
                </div>

                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-md text-[var(--primary-color)]">
                      Hi,&nbsp;{user.fullName.split(" ")[0]}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <a
                      href="/login"
                      className={`text-sm border py-2 px-4 rounded-full transition shadow-[0_0_10px_var(--primary-color)] 
                  ${
                    darkMode
                      ? "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-white hover:text-black"
                      : "border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-black hover:text-white"
                  }`}
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className={`text-sm px-4 py-2 rounded-full border transition shadow-[0_0_15px_var(--primary-color)] 
                  ${
                    darkMode
                      ? "bg-[var(--primary-color)] text-black border-[var(--primary-color)] hover:bg-white"
                      : "bg-[var(--primary-color)] text-white border-[var(--primary-color)] hover:bg-black"
                  }`}
                    >
                      Sign Up
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div
            className={`md:hidden fixed inset-0 z-[9999] flex flex-col pl-2 pr-5 pb-6 pt-3 mt-20 transition-colors 
      ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}
          >
            <div className="flex justify-between items-center mb-6">
              <img src={logo} alt="trading Logo" className="w-36" />
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-inherit"
              >
                ✕
              </button>
            </div>
            {user && (
              <span className="text-lg text-[var(--primary-color)] p-5 ">
                Hi, {user.fullName}
              </span>
            )}

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

              {user ? (
                <div className="flex flex-col items-start gap-2 mt-4">
                  <button
                    onClick={handleLogout}
                    className="w-fit px-5 text-base bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <a
                    href="/login"
                    className={`w-1/2 text-base text-center border py-2 rounded-md transition 
                ${
                  darkMode
                    ? "text-inherit border-[var(--primary-color)] hover:text-[var(--primary-color)]"
                    : "text-inherit border-[var(--primary-color)] hover:text-[var(--primary-color)]"
                }`}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className={`w-1/2 text-base text-center py-2 rounded-md transition 
                ${
                  darkMode
                    ? "bg-[var(--primary-color)] text-white hover:opacity-90"
                    : "bg-[var(--primary-color)] text-white hover:opacity-90"
                }`}
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {!isOpen && (
        <div
          id="google_translate_element"
          className="fixed z-[99] right-[100px] top-[85px] translate-x-0 md:right-[80px] md:top-[67px] lg:right-[270px] lg:top-[67px] lg:-translate-x-1/2"
        />
      )}
    </>
  );
};

export default Navbar;
