import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Fuse from "fuse.js";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  datePublished: string;
  slug: string;
  tags: string[];
};

const Blog2 = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const postsPerPage = 9;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromURL = parseInt(params.get("page") || "1");
    setCurrentPage(pageFromURL);
    fetchBlogPosts();
  }, [location.search]);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/blogs/viewblog`);
      setBlogPosts(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blog posts");
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?page=${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blogs/${slug}`);
  };

  // Fuzzy search using Fuse.js
  const fuse = new Fuse(blogPosts, {
    keys: ["title", "excerpt"],
    threshold: 0.4,
  });

  const searchResults = searchTerm
    ? fuse.search(searchTerm).map((res) => res.item)
    : blogPosts;

  const filteredPosts = searchResults.filter((post) => {
    const matchesDate = selectedDate
      ? post.datePublished?.startsWith(selectedDate)
      : true;
    return matchesDate;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <div className="w-12 h-12 border-4 border-white border-t-[var(--primary-color)] rounded-full animate-spin"></div>
        <p className="text-white mt-4">Processing your data. Please wait...</p>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white">
      <Helmet>
        <title>Stock Market Blogs | Close Friends Traders</title>
        <meta
          name="description"
          content="Read expert-written blogs from Close Friends Traders - trading tips, intraday strategies, market updates, and everything you need to master the markets in 2025."
        />
        <link
          rel="canonical"
          href="https://www.closefriendstraders.com/blogs"
        />
      </Helmet>

      <Navbar />

      <div className="py-16 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Latest{" "}
            <span className="text-[var(--primary-color)] italic">
              Blog Updates
            </span>
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-gray-500 dark:text-gray-300">
            Stay informed with the latest updates in trading, markets, and the
            economy.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search by title or content"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[65%] p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white text-black"
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full md:w-[30%] p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white text-black"
          />
        </div>

        {/* Blog Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {currentPosts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300 col-span-full">
              No blogs match your search or filter.
            </p>
          ) : (
            currentPosts.map((post) => (
              <a
                key={post._id}
                href={`/blogs/${post.slug}`}
                className="cursor-pointer relative rounded-lg p-[1.5px] hover:shadow-[0_0_10px_var(--primary-color)] transition"
                style={{
                  background:
                    "linear-gradient(to bottom, #111, var(--primary-color))",
                }}
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="bg-white dark:bg-black rounded-lg h-[450px] flex flex-col overflow-hidden text-left">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-[300px] object-fill rounded-t-lg"
                  />
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-black dark:text-white leading-snug mb-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 truncate">
                        {post.excerpt}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 italic">
                      By {post.author} •{" "}
                      {new Date(post.datePublished).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page <= 2 ||
                  page > totalPages - 2 ||
                  Math.abs(currentPage - page) <= 1
              )
              .reduce((acc: (number | string)[], page, i, arr) => {
                if (
                  i > 0 &&
                  typeof arr[i - 1] === "number" &&
                  page - (arr[i - 1] as number) > 1
                ) {
                  acc.push("...");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 py-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item as number)}
                    className={`px-4 py-2 rounded ${
                      currentPage === item
                        ? "bg-[var(--primary-color)] text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
          </div>
        )}

        {/* Support CTA */}
        <div className="mt-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-white dark:bg-[var(--bg-color1)] rounded-xl py-6 px-6 shadow-lg">
            <h3 className="text-3xl font-bold mb-4">Let’s Connect Today</h3>
            <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto mb-6">
              Want a walkthrough? Need help? Or just curious? We’re just a click
              or call away—reach out now and experience the difference of Close
              Friends Traders.
            </p>
            <a
              href="tel:+918368284948"
              className="inline-block mt-2 px-8 py-3 bg-[var(--primary-color)] text-white dark:text-black font-semibold rounded-full hover:shadow-[0_0_15px_var(--primary-color)] transition duration-300"
            >
              Talk to Support
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog2;
