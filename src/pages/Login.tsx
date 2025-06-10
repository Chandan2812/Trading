import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../assets/logo-01.svg";
import sideImage from "../assets/newabout.webp";
import { FiMoon, FiSun } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://cft-b87k.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Login failed.");
      } else {
        localStorage.setItem("user", JSON.stringify(data.user));

        const isAdmin = data.user.email === "admin@gmail.com";
        if (isAdmin) {
          navigate("/AdminPage");
        } else {
          navigate("/");
        }
        window.location.reload();
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black  transition-colors duration-300">
      <div className="w-full py-5 px-8 shadow-md dark:shadow-gray-200 flex justify-between items-center mb-12">
        <a href="/">
          <img
            src={logo}
            alt="Close Friends Traders"
            className="w-40 transition-all duration-300 hover:scale-105"
          />
        </a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors duration-300"
          title="Toggle Theme"
        >
          {darkMode ? (
            <FiSun size={24} className="text-white" />
          ) : (
            <FiMoon size={24} className="text-gray-700" />
          )}
        </button>
      </div>

      <div className="flex w-full mx-auto max-w-4xl h-[500px] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 backdrop-blur-sm shadow-2xl">
        {/* Side image (hidden on mobile) */}
        <div className="w-1/2 hidden md:block">
          <img
            src={sideImage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form side */}
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
                placeholder="john@example.com"
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

            {/* <div className="text-right text-sm">
              <a
                href="/forgot-password"
                className="text-teal-500 dark:text-teal-400 hover:underline"
              >
                Forgot password?
              </a>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition duration-300"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            {message && (
              <p className="text-sm text-center text-red-500 dark:text-red-400">
                {message}
              </p>
            )}
          </form>

          <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-teal-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
