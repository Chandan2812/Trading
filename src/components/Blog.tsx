import React from "react";
import Navbar from "./Nav";
import Footer from "./Footer";

const blogs = [
  {
    title: "US Market Crash 2025 New Update | Dabba Trading App 2025",
    description:
      "The year 2025 will go down in history as Wall Street crashed hard. Billions of dollars were wiped out in moments.",
    image: "https://www.arrowtradefx.com/assets/images/svg/forex.svg", // Replace with blog thumbnail
    date: "April 28, 2025",
    source: "dabbatradingapp.com",
  },
  {
    title: "FOREX Trading Partner | Maximize Returns Globally",
    description:
      "Global currencies are seeing huge volatility. Now is the time to save on hidden charges and trade smarter.",
    image: "https://dabbatradingapp.com/wp-content/uploads/2025/04/FO-5.jpg",
    date: "April 25, 2025",
    source: "dabbatradingapp.com",
  },
  {
    title: "Futures and Options Market Insight 2025",
    description:
      "With minimal capital, investors are leveraging futures and options for high exposure and flexibility.",
    image:
      "https://dabbatradingapp.com/wp-content/uploads/2024/08/codifyformatter-1-1.png",
    date: "April 22, 2025",
    source: "dabbatradingapp.com",
  },
  {
    title: "Futures and Options Market Insight 2025",
    description:
      "With minimal capital, investors are leveraging futures and options for high exposure and flexibility.",
    image: "https://dabbatradingapp.com/wp-content/uploads/2025/04/FO-1.png",
    date: "April 22, 2025",
    source: "dabbatradingapp.com",
  },
  {
    title: "Futures and Options Market Insight 2025",
    description:
      "With minimal capital, investors are leveraging futures and options for high exposure and flexibility.",
    image:
      "https://dabbatradingapp.com/wp-content/uploads/2024/07/Dabba-Trading-blog-.png",
    date: "April 22, 2025",
    source: "dabbatradingapp.com",
  },
];

const Blog: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-br from-black to-[#0a0a0a] text-white py-16 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Latest <span className="text-[#71ced0] italic">Blog Updates</span>
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl mx-auto">
            Stay informed with the latest updates in trading, markets, and the
            economy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
              style={{
                background:
                  "linear-gradient(to bottom, #111, var(--primary-color))",
              }}
            >
              <div className="bg-black rounded-lg h-full flex flex-col overflow-hidden text-left">
                {/* Image on top */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />

                {/* Blog Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-yellow-400 mb-1">Blog</span>
                  <h3 className="text-base font-semibold text-white leading-snug mb-1">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-[#71ced0] font-medium mb-2">
                    {blog.source} / {blog.date}
                  </p>
                  <p className="text-sm text-gray-400">{blog.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
