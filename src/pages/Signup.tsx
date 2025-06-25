import { useEffect, useState } from "react";
import logo from "../assets/logo-01.svg";
import sideImage from "../assets/newabout.webp";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiMoon, FiSun } from "react-icons/fi";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
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

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      setMessage("Please fill in all fields.");
      setMessageType("error");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Invalid email format.");
      setMessageType("error");
      return;
    }

    if (!validatePhone(phone)) {
      setMessage("Phone number must be 10 digits.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          Phone: countryCode + phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Failed to send OTP.");
        setMessageType("error");
      } else {
        setMessage("OTP sent to your email.");
        setMessageType("success");
        setStep(2);
      }
    } catch (err) {
      setMessage("Something went wrong. Try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !password) {
      setMessage("Enter OTP and password.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Verification failed.");
        setMessageType("error");
      } else {
        setMessage("Signup complete!");
        setMessageType("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setPassword("");
        setOtp("");
        navigate("/login");
      }
    } catch (err) {
      setMessage("Something went wrong during verification.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black transition-colors duration-300 flex flex-col items-center">
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

      <div className="w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-black shadow-xl dark:shadow-gray-900/30">
        <div className="flex flex-col md:flex-row h-full">
          <div className="hidden md:block md:w-1/2 relative">
            <img
              src={sideImage}
              alt="Side Visual"
              className="w-full h-full object-cover"
            />
          </div>

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
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-4 py-3 bg-white dark:bg-black  text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <option value="+1">+1 (USA)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+91" selected>
                            +91 (India)
                          </option>
                          <option value="+61">+61 (Australia)</option>
                          <option value="+81">+81 (Japan)</option>
                          <option value="+49">+49 (Germany)</option>
                          <option value="+33">+33 (France)</option>
                          <option value="+39">+39 (Italy)</option>
                          <option value="+86">+86 (China)</option>
                          <option value="+7">+7 (Russia)</option>
                          <option value="+971">+971 (UAE)</option>
                          <option value="+966">+966 (Saudi Arabia)</option>
                          <option value="+92">+92 (Pakistan)</option>
                          <option value="+880">+880 (Bangladesh)</option>
                          <option value="+34">+34 (Spain)</option>
                          <option value="+82">+82 (South Korea)</option>
                          <option value="+55">+55 (Brazil)</option>
                          <option value="+27">+27 (South Africa)</option>
                          <option value="+351">+351 (Portugal)</option>
                          <option value="+62">+62 (Indonesia)</option>
                          <option value="+90">+90 (Turkey)</option>
                          <option value="+32">+32 (Belgium)</option>
                          <option value="+31">+31 (Netherlands)</option>
                          <option value="+1-876">+1-876 (Jamaica)</option>
                          <option value="+20">+20 (Egypt)</option>
                          <option value="+234">+234 (Nigeria)</option>
                          <option value="+60">+60 (Malaysia)</option>
                          <option value="+46">+46 (Sweden)</option>
                          <option value="+41">+41 (Switzerland)</option>
                          <option value="+48">+48 (Poland)</option>
                          <option value="+1-876">+1-876 (Jamaica)</option>
                          <option value="+358">+358 (Finland)</option>
                          <option value="+36">+36 (Hungary)</option>
                          <option value="+52">+52 (Mexico)</option>
                          <option value="+1-809">
                            +1-809 (Dominican Republic)
                          </option>
                          <option value="+351">+351 (Portugal)</option>

                          {/* Add more country codes as needed */}
                        </select>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="flex-1 px-4 py-3 bg-white dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder="9876543210"
                        />
                      </div>
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
                    messageType === "success"
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
