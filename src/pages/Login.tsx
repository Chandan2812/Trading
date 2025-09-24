import { useEffect, useState } from "react";
import Button from "../components/Button";
import Logo from "../assets/logo-01.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"login" | "reset-request" | "reset-verify">(
    "login"
  );

  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignIn = async () => {
    setError("");
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return setError("Please fill in all fields.");
    }

    if (email === "admin@gmail.com" && password === "admin@2025") {
      localStorage.setItem("adminToken", "admin-token");
      localStorage.setItem(
        "admin",
        JSON.stringify({ email: "admin@gmail.com", role: "admin" })
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/admin");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data.user);

      if (!res.ok) {
        setLoading(false);
        return setError(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Failed to send OTP");

      alert("OTP sent to email and WhatsApp");
      setStep("reset-verify");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAndResetPassword = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/auth/verify-reset-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: resetOtp, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.message || "Reset failed");

      alert("Password reset successful. Please login.");
      setStep("login");
      setPassword("");
      setNewPassword("");
      setResetOtp("");
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black transition-colors">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover z-0"
        >
          <source src="/signup.mp4" type="video/mp4" />
        </video>

        <div className="z-20 w-full max-w-md p-8 rounded-xl bg-white/70 dark:bg-black/30 backdrop-blur border border-black/10 dark:border-white/10 text-black dark:text-white transition-colors">
          <div className="text-center mb-6">
            <a href={"/"}>
              <img
                src={Logo}
                alt="Billion Dollar FX"
                width={200}
                className="mx-auto mb-2"
              />
            </a>
            <h2 className="text-2xl font-semibold">
              {step === "login"
                ? "Login"
                : step === "reset-request"
                  ? "Reset Password"
                  : "Verify OTP"}
            </h2>
            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="/signup">
                {" "}
                <span className="text-black dark:text-white font-semibold cursor-pointer">
                  Sign Up
                </span>
              </a>
            </p>
          </div>

          {/* --- LOGIN FORM --- */}
          {step === "login" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block mb-1">Email*</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-black dark:text-white"
                  placeholder="abc@example.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password*</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-black dark:text-white"
                    placeholder="**********"
                    required
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 cursor-pointer text-lg"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              <div className="flex justify-end items-center text-sm text-gray-600 dark:text-gray-400">
                <span
                  onClick={() => setStep("reset-request")}
                  className="hover:underline text-black dark:text-white cursor-pointer"
                >
                  Forgot Password?
                </span>
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <Button
                onClick={handleSignIn}
                disabled={loading}
                text={loading ? "Signing..." : "Sign in"}
                className="w-full"
              />
            </form>
          )}

          {/* --- RESET REQUEST --- */}
          {step === "reset-request" && (
            <div className="space-y-4">
              <label className="block">Enter your email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-black dark:text-white"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                text={loading ? "Sending OTP..." : "Send OTP"}
                onClick={requestPasswordReset}
                className="w-full "
              />

              <p
                className="text-sm text-gray-600 dark:text-gray-400 text-center cursor-pointer hover:underline"
                onClick={() => setStep("login")}
              >
                Back to Login
              </p>
            </div>
          )}

          {/* --- RESET VERIFY --- */}
          {step === "reset-verify" && (
            <div className="space-y-4">
              <label className="block">Enter OTP</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-black dark:text-white"
                placeholder="OTP"
                value={resetOtp}
                onChange={(e) => setResetOtp(e.target.value)}
              />

              <label className="block">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-[#0f172a] border border-gray-300 dark:border-gray-700 text-black dark:text-white pr-10"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <Button
                text={loading ? "Resetting..." : "Reset Password"}
                onClick={verifyAndResetPassword}
                className="w-full "
              />

              <p
                className="text-sm text-gray-600 dark:text-gray-400 text-center cursor-pointer hover:underline"
                onClick={() => setStep("login")}
              >
                Back to Login
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
