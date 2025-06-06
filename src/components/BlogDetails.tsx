import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import Navbar from "./Nav";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog)
    return (
      <div className="text-center py-20 text-black dark:text-white">
        Blog not found.
      </div>
    );

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white">
      <Navbar />

      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="text-[#006d6f] dark:text-[#71ced0] mb-6 inline-flex items-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </Link>

          <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            By {blog.author} • {blog.date} • {blog.readTime}
          </p>

          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 rounded-lg mb-8"
            draggable="false"
          />

          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            {blog.shortDescription}
          </p>

          {/* Key Highlights */}
          <div className="bg-gray-100 dark:bg-[#111] border border-gray-300 dark:border-gray-700 p-5 rounded-lg mb-10">
            <h2 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-3">
              Key Highlights:
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              {blog.highlights.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Blog Sections */}
          {blog.sections.map((section, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-2xl font-bold text-[var(--primary-color)] mb-3">
                {section.heading}
              </h2>
              {section.content && (
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {section.content}
                </p>
              )}
              {section.points && (
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {section.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* CTA Box */}
          <div className="bg-yellow-100 dark:bg-[#1a1a1a] border border-yellow-400 dark:border-yellow-600 p-6 rounded-lg text-center mt-12">
            <h2 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {blog.cta.title}
            </h2>
            <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-6 rounded-lg transition">
              {blog.cta.buttonLabel}
            </button>
            <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-300 italic">
              {blog.cta.rating}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;
