import logo from "../assets/logo-01.svg";

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-black">
      {/* Logo */}
      <div className="max-w-7xl mx-auto py-5">
        <a href="/">
          <img src={logo} alt="Close Friends Traders" className="w-48" />
        </a>
      </div>

      {/* Centered Login Form */}
      <div className="flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2 text-sm">Log in to your account</p>
          </div>

          <form className="space-y-5">
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

            <div className="text-right text-sm">
              <a
                href="/forgot-password"
                className="text-teal-400 hover:underline"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-medium transition duration-300"
            >
              Log In
            </button>
          </form>

          {/* Bottom link */}
          <p className="text-gray-500 text-xs text-center mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-teal-400 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
