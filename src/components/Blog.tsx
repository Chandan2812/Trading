// Blog.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Nav";
import Footer from "./Footer";
import { blogs } from "../data/blogs"; // adjust path if needed

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
          {blogs.map((blog) => (
            <Link to={`/blog/${blog.id}`} key={blog.id}>
              <div
                className="cursor-pointer relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
                style={{
                  background:
                    "linear-gradient(to bottom, #111, var(--primary-color))",
                }}
              >
                <div className="bg-black rounded-lg h-[450px] flex flex-col overflow-hidden text-left">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg flex-shrink-0"
                  />
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="text-xs text-yellow-400 mb-1">
                        {blog.category}
                      </span>
                      <h3 className="text-base font-semibold text-white leading-snug mb-1">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[#71ced0] font-medium mb-2">
                        {blog.source} / {blog.date}
                      </p>
                      <p className="text-sm text-gray-400 mb-2">
                        {blog.description}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      {blog.author} • {blog.readTime}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
