// BlogDetails.tsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs"; // adjust path

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/blog" className="text-blue-500 underline mb-4 block">
        ← Back to Blogs
      </Link>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500">
        By {blog.author} • {blog.date}
      </p>

      <img src={blog.image} alt={blog.title} className="w-full my-6 rounded" />

      <p className="text-lg mb-6">{blog.shortDescription}</p>

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="font-semibold">Key Highlights:</h2>
        <ul className="list-disc ml-6">
          {blog.highlights.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      </div>

      {blog.sections.map((section, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
          {section.content && <p>{section.content}</p>}
          {section.points && (
            <ul className="list-disc ml-6">
              {section.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      <div className="bg-yellow-100 p-6 rounded text-center">
        <h2 className="text-xl font-bold">{blog.cta.title}</h2>
        <button className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
          {blog.cta.buttonLabel}
        </button>
        <p className="mt-2 text-sm">{blog.cta.rating}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
