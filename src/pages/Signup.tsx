import logo from "../assets/logo-01.svg";
const Signup = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-5">
        <a href="/">
          <img src={logo} alt="" className="w-48" />
        </a>
      </div>

      <div className=" flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Close Friends Traders
            </h1>
            <p className="text-gray-400 mt-2 text-sm">Create your account</p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-sm text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/10 text-white placeholder-gray-500 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="john@example.com"
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
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Bottom text */}
          <p className="text-gray-500 text-xs text-center mt-6">
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
