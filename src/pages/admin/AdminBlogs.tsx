import { useEffect, useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Edit2, Trash2, Code, Image as ImageIcon } from "lucide-react";
import AddBlog from "../../components/AddBlogs"; // your modal component
import { formatHtml } from "../../utils/formatHtml";
import Button from "../../components/Button";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  coverImage?: string;
  datePublished: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${baseURL}/api/blogs/viewblog`);
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fuse.js search setup
  const fuse = useMemo(() => {
    return new Fuse(blogs, {
      keys: ["title", "author"],
      threshold: 0.4, // adjust fuzzy matching sensitivity
    });
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const result = fuse.search(searchQuery);
    return result.map((res) => res.item);
  }, [searchQuery, fuse, blogs]);

  const handleDelete = async (slug: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`${baseURL}/api/blogs/${slug}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setBlogs((prev) => prev.filter((b) => b.slug !== slug));
      alert("Blog deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete blog");
    }
  };

  const handleUpdateImage = async () => {
    if (!selectedImage) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("coverImage", selectedImage);

    try {
      const res = await fetch(`${baseURL}/api/blogs/${editingSlug}/image`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update image");
      alert("Image updated successfully!");
      setShowImageModal(false);
      setSelectedImage(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert("Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen text-white">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blogs</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage all blogs</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded border w-full md:w-96 text-black"
          />
        </div>
        <div>
          <Button
            onClick={() => {
              setEditingBlog(null);
              setShowAddModal(true);
            }}
            text="➕ Add Blog"
          />
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading blogs...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-[#1f2937]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Content</th>
                  <th className="px-4 py-3">Author</th>
                  <th className="px-4 py-3">Published On</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-400">
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  currentBlogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-b border-gray-700 hover:bg-[#111827]"
                    >
                      <td className="px-4 py-3 max-w-[150px]">{blog.title}</td>
                      <td
                        className="px-4 py-3 break-words max-w-[250px] cursor-pointer"
                        dangerouslySetInnerHTML={{
                          __html:
                            blog.content.length > 100
                              ? blog.content.slice(0, 100) + "..."
                              : blog.content,
                        }}
                      />
                      <td className="px-4 py-3">{blog.author}</td>
                      <td className="px-4 py-3">
                        {new Date(blog.datePublished).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </td>
                      <td className="px-4 py-3 flex gap-2">
                        <button
                          onClick={() => {
                            setEditingBlog(blog);
                            setShowAddModal(true);
                          }}
                          className="text-blue-500 mt-3"
                        >
                          <Edit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.slug)}
                          className="text-red-500 mt-3"
                        >
                          <Trash2 />
                        </button>
                        <button
                          onClick={async () => {
                            const formatted = formatHtml(blog.content);
                            setHtmlContent(await formatted);
                            setEditingSlug(blog.slug);
                            setShowHtmlEditor(true);
                          }}
                          className="text-yellow-500 mt-3"
                        >
                          <Code />
                        </button>
                        <button
                          onClick={() => {
                            setEditingSlug(blog.slug);
                            setShowImageModal(true);
                          }}
                          className="text-purple-500 mt-3"
                        >
                          <ImageIcon />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="border rounded p-4 shadow-sm bg-gray-800"
              >
                <p className="mb-1 font-semibold">{blog.title}</p>
                <p
                  className="mb-1"
                  dangerouslySetInnerHTML={{
                    __html:
                      blog.excerpt.length > 100
                        ? blog.excerpt.slice(0, 100) + "..."
                        : blog.excerpt,
                  }}
                />
                <p className="mb-1">
                  <strong>Author:</strong> {blog.author}
                </p>
                <p className="mb-1">
                  <strong>Published:</strong>{" "}
                  {new Date(blog.datePublished).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowAddModal(true);
                    }}
                    className="text-blue-500"
                  >
                    <Edit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.slug)}
                    className="text-red-500"
                  >
                    <Trash2 />
                  </button>
                  <button
                    onClick={async () => {
                      const formatted = formatHtml(blog.content);
                      setHtmlContent(await formatted);
                      setEditingSlug(blog.slug);
                      setShowHtmlEditor(true);
                    }}
                    className="text-yellow-500"
                  >
                    <Code />
                  </button>
                  <button
                    onClick={() => {
                      setEditingSlug(blog.slug);
                      setShowImageModal(true);
                    }}
                    className="text-purple-500"
                  >
                    <ImageIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {showAddModal && (
        <AddBlog
          existingBlog={editingBlog}
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchBlogs}
        />
      )}

      {showHtmlEditor && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-3xl shadow-xl relative">
            <h2 className="text-xl font-bold mb-4">Edit Blog </h2>
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded resize-none font-mono text-sm"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  setShowHtmlEditor(false);
                  setHtmlContent("");
                  setEditingSlug(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!editingSlug) return;
                  try {
                    const res = await fetch(
                      `${baseURL}/api/blogs/${editingSlug}`,
                      {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ content: htmlContent }),
                      }
                    );
                    if (!res.ok) throw new Error("Failed to update content");
                    alert("Blog updated successfully");
                    setShowHtmlEditor(false);
                    setHtmlContent("");
                    setEditingSlug(null);
                    fetchBlogs();
                  } catch (err) {
                    alert("Failed to save changes");
                    console.error(err);
                  }
                }}
                className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Update Cover Image</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedImage(e.target.files[0]);
                }
              }}
              className="mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateImage}
                className={`px-4 py-2 text-white rounded ${
                  loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
