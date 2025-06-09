import { useEffect, useState } from "react";

const API_BASE = "https://cft-b87k.onrender.com/api/blogs";

interface BlogPost {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  tags?: string;
  coverImage?: string;
}

const AddBlog = ({
  onClose,
  onSuccess,
  existingBlog = null,
}: {
  onClose: () => void;
  onSuccess: () => void;
  existingBlog?: BlogPost | null;
}) => {
  const [formData, setFormData] = useState({
    title: existingBlog?.title || "",
    slug: existingBlog?.slug || "",
    excerpt: existingBlog?.excerpt || "",
    content: existingBlog?.content || "",
    author: existingBlog?.author || "",
    tags: existingBlog?.tags || "",
    coverImage: null as File | null,
  });

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog?.tags || "",
        coverImage: null,
      });
    }
  }, [existingBlog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, coverImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("slug", formData.slug);
    blogData.append("excerpt", formData.excerpt);
    blogData.append("content", formData.content);
    blogData.append("author", formData.author);
    blogData.append("tags", formData.tags);
    if (formData.coverImage) blogData.append("coverImage", formData.coverImage);

    try {
      const method = existingBlog ? "PUT" : "POST";
      const endpoint = existingBlog
        ? `${API_BASE}/${existingBlog.slug}`
        : `${API_BASE}/add`;

      const res = await fetch(endpoint, {
        method,
        body: blogData,
      });

      const data = await res.json();
      if (res.ok) {
        alert(
          existingBlog ? "Blog updated successfully" : "Blog added successfully"
        );
        onSuccess();
        onClose();
      } else {
        alert(
          data.error || `Failed to ${existingBlog ? "update" : "add"} blog`
        );
      }
    } catch (err) {
      alert(`Error ${existingBlog ? "updating" : "adding"} blog`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 w-full max-w-2xl rounded-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">
          {existingBlog ? "Edit Blog" : "Add New Blog"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="w-full p-2 border"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug"
            className="w-full p-2 border"
            value={formData.slug}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="excerpt"
            placeholder="Excerpt"
            className="w-full p-2 border"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            className="w-full p-2 border h-32"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="w-full p-2 border"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            className="w-full p-2 border"
            value={formData.tags}
            onChange={handleChange}
          />
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleImageChange}
            required={!existingBlog}
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--primary-color)] text-white rounded"
            >
              {existingBlog ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
