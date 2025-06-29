import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo-01.svg";
import sideImage from "../assets/cft-login-page-3.jpg";
import { FiMoon, FiSun } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark"
      ? true
      : localStorage.getItem("theme") === "light"
      ? false
      : true; // Default to true if not set
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "admin@2025") {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/AdminPage"); // No reload
    } else {
      setErrorPopup(true);
    }
  };

  return (
    <div className="min-h-screen pb-8 w-full bg-white dark:bg-black transition-colors duration-300">
      {/* Header */}
      <div className="w-full py-5 px-8 shadow-md dark:shadow-gray-200 flex justify-between items-center mb-12">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="w-40 transition-all duration-300 hover:scale-105"
          />
        </a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20"
          title="Toggle Theme"
        >
          {darkMode ? (
            <FiSun size={24} className="text-white" />
          ) : (
            <FiMoon size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      {/* Login Box */}
      <div className="flex w-full mx-auto max-w-4xl h-[500px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-sm shadow-2xl">
        <div className="w-1/2 hidden md:block">
          <img
            src={sideImage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Log in to your account
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white dark:bg-white/10 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-white dark:bg-white/10 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-xl border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500 pr-12"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-teal-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition duration-300"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Error Popup */}
      {errorPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
              Invalid Credentials
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              Please check your email and password.
            </p>
            <button
              onClick={() => setErrorPopup(false)}
              className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
