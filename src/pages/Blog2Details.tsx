import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
// import { Share2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface BlogType {
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  content: string;
  slug: string;
  schemaMarkup?: string[]; // support array of JSON-LD strings
}

const Blog2Details = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogType[]>([]);
  const [error, setError] = useState("");
  // const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/blogs/viewblog`);
        const blogList: BlogType[] = res.data;
        console.log(blogList);
        const found = blogList.find((b) => b.slug === slug);

        if (!found) {
          setError("Blog not found");
        } else {
          setBlog(found);

          // Get 4 related blogs excluding current
          const related = blogList
            .filter((b) => b.slug !== slug)
            .sort(() => 0.5 - Math.random()) // shuffle
            .slice(0, 4); // take 4

          setRelatedBlogs(related);
        }
      } catch (err) {
        setError("Blog not found");
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  // const handleShare = async () => {
  //   const url = window.location.href;

  //   if (typeof navigator.share === "function") {
  //     try {
  //       await navigator.share({
  //         title: blog?.title,
  //         text: "Check out this blog from Close Friends Traders!",
  //         url,
  //       });
  //     } catch (error) {
  //       console.error("Sharing failed:", error);
  //     }
  //   } else {
  //     try {
  //       await navigator.clipboard.writeText(url);
  //       setCopied(true);
  //       setTimeout(() => setCopied(false), 2000);
  //     } catch (error) {
  //       console.error("Copy failed:", error);
  //     }
  //   }
  // };

  if (error)
    return <div className="pt-40 text-center text-red-600">{error}</div>;
  if (!blog)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-white border-t-[var(--primary-color)] rounded-full animate-spin"></div>
        <p className="text-white mt-4">Loading....</p>
      </div>
    );
  return (
    <div className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white">
      <Helmet>
        <title>{blog.title}</title>
        <meta name="description" content={blog.excerpt} />
        <link
          rel="canonical"
          href={`https://www.closefriendstraders.com/blogs/${blog.slug}`}
        />
      </Helmet>
      {/* ✅ Schema Markup */}
      {Array.isArray(blog.schemaMarkup) &&
        blog.schemaMarkup.map((markup, idx) => (
          <script
            key={idx}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: markup }}
          />
        ))}

      <Navbar />
      <div className="p-8 max-w-7xl mx-auto pt-28">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          By {blog.author} - {new Date(blog.datePublished).toLocaleDateString()}
        </p>

        <img
          src={blog.coverImage}
          className="mb-4 w-full rounded"
          alt={blog.title}
        />

        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        {/* <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded"
        >
          <Share2 size={18} />
          {typeof navigator.share === "function" ? "Share" : "Copy Link"}
        </button>
        {copied && (
          <p className="mt-2 text-green-500">Link copied to clipboard!</p>
        )} */}
      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="max-w-7xl mx-auto px-8 pb-20">
          <h2 className="text-3xl font-bold mb-6 text-center">Related Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedBlogs.map((related) => (
              <a
                key={related.slug}
                href={`/blogs/${related.slug}${location.search}`}
                className="block bg-white dark:bg-black rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={related.coverImage}
                  alt={related.title}
                  className="w-full h-[180px] object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-base font-semibold mb-1">
                    {related.title}
                  </h3>
                  <p className="text-xs text-gray-500 italic">
                    By {related.author}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Blog2Details;
