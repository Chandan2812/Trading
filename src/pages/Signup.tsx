import { useState } from "react";
import logo from "../assets/logo-01.svg";
import sideImage from "../assets/newabout.webp";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      setMessage("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://cft-b87k.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed.");
      } else {
        setMessage(data.message || "Signup successful!");
        // Optionally reset fields
        setFullName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black px-4 py-8">
      {/* Logo */}
      <div className="mb-8 max-w-7xl mx-auto">
        <a href="/">
          <img src={logo} alt="Close Friends Traders" className="w-44" />
        </a>
      </div>

      {/* Main Container */}
      <div className="flex w-full mx-auto max-w-4xl h-[550px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
        {/* Left Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src={sideImage}
            alt="Signup Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-sm text-gray-400 mb-6">Sign up to get started</p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition duration-300"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            {message && (
              <p className="text-sm text-center text-green-400">{message}</p>
            )}
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-teal-400 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
