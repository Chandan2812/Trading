import logo from "../assets/logo-01.svg";
import sideImage from "../assets/newabout.webp"; // your left side image

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-black  px-4 py-8">
      {/* Logo at Top */}
      <div className=" mb-8 max-w-7xl mx-auto">
        <a href="/">
          <img src={logo} alt="Close Friends Traders" className="w-44" />
        </a>
      </div>

      {/* Centered Box */}
      <div className="flex w-full mx-auto max-w-4xl h-[500px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
        {/* Left Image Side */}
        <div className="w-1/2 hidden md:block">
          <img
            src={sideImage}
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-400 mb-6">Log in to your account</p>

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

          <p className="text-xs text-gray-500 text-center mt-6">
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
