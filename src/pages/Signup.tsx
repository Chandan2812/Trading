import { useEffect, useState } from "react";
import logo from "../assets/logo-01.svg";
import sideImage from "../assets/newabout.webp";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMoon, FiSun } from "react-icons/fi";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Phone, setPhone] = useState<number | "">("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
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

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !Phone) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://cft-b87k.onrender.com/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName, email, Phone }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to send OTP.");
      } else {
        setMessage("OTP sent to your email.");
        setStep(2);
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !password) {
      setMessage("Enter OTP and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "https://cft-b87k.onrender.com/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Verification failed.");
      } else {
        setMessage("Signup complete!");
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setOtp("");
        navigate("/login");
      }
    } catch (err) {
      setMessage("Something went wrong during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black transition-colors duration-300 flex flex-col items-center">
      {/* Header */}
      <div className="w-full py-5 px-8 shadow-md dark:shadow-gray-200 flex justify-between items-center mb-12">
        <a href="/">
          <img
            src={logo}
            alt="Logo"
            className="w-40 hover:scale-105 transition-all duration-300"
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

      {/* Main */}
      <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-black shadow-xl dark:shadow-gray-900/30">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left Image */}
          <div className="hidden md:block md:w-1/2 relative">
            <img
              src={sideImage}
              alt="Side Visual"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {step === 1
                  ? "Create Your Account"
                  : "Verify OTP & Set Password"}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {step === 1
                  ? "Join thousands of traders achieving their financial goals"
                  : "Enter the OTP sent to your email and set your password"}
              </p>
            </div>

            <form
              onSubmit={step === 1 ? handleSendOtp : handleVerifyOtp}
              className="space-y-6"
            >
              <div className="space-y-4">
                {step === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={Phone}
                        onChange={(e) => setPhone(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter OTP"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-4 py-3 pr-12 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-teal-500 transition"
                          title={
                            showPassword ? "Hide Password" : "Show Password"
                          }
                        >
                          {showPassword ? (
                            <FiEyeOff size={18} />
                          ) : (
                            <FiEye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white py-3.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                  loading ? "opacity-80" : ""
                }`}
              >
                {loading ? (
                  <>{step === 1 ? "Sending OTP..." : "Verifying..."}</>
                ) : step === 1 ? (
                  "Send OTP"
                ) : (
                  "Verify & Create Account"
                )}
              </button>

              {message && (
                <div
                  className={`p-3 rounded-lg text-center text-sm ${
                    message.toLowerCase().includes("success")
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-teal-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
