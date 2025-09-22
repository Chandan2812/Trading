import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import notFound from "../assets/404page.png";

const NotFound = () => {
  return (
    <>
      <Navbar />

      <div className="bg-white dark:bg-black min-h-[100vh] flex flex-col items-center justify-center px-6 py-12 text-center mt-20">
        <img
          src={notFound} // Replace with your actual image path
          alt="404 Not Found"
          className="w-full max-w-md mb-8"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-[var(--primary-color)] text-white px-6 py-3 rounded-full hover:opacity-90 transition"
        >
          Go Back Home
        </a>
      </div>

      <Footer />
    </>
  );
};

export default NotFound;
