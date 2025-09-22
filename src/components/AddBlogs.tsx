const baseURL = import.meta.env.VITE_API_BASE_URL;
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";

// const API_BASE = "http://localhost:8000";

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
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    coverImage: null as File | null,
    schemaMarkup: [""], // array of JSON-LD strings
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (existingBlog) {
      setFormData({
        title: existingBlog.title,
        slug: existingBlog.slug,
        excerpt: existingBlog.excerpt,
        content: existingBlog.content,
        author: existingBlog.author,
        tags: existingBlog.tags || "",
        coverImage: null,
        schemaMarkup: Array.isArray((existingBlog as any).schemaMarkup)
          ? (existingBlog as any).schemaMarkup
          : [(existingBlog as any).schemaMarkup || ""],
      });
    }
  }, [existingBlog]);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["link", "image"],
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "title" && !existingBlog) {
      const autoSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .trim()
        .replace(/\s+/g, "-");

      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: autoSlug,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({ ...prev, coverImage: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("slug", formData.slug);
      blogData.append("excerpt", formData.excerpt);
      blogData.append("content", formData.content);
      blogData.append("author", formData.author);
      blogData.append("tags", formData.tags);

      if (formData.coverImage) {
        blogData.append("coverImage", formData.coverImage);
      }

      // ✅ Append schemaMarkup string
      formData.schemaMarkup.forEach((markup) => {
        if (markup?.trim()) {
          blogData.append("schemaMarkup", markup.trim());
        }
      });

      const res = await fetch(
        existingBlog
          ? `${baseURL}/api/blogs/${existingBlog.slug}`
          : `${baseURL}/api/blogs/add`,
        {
          method: existingBlog ? "PUT" : "POST",
          body: blogData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert(existingBlog ? "Blog updated" : "Blog added");
        onSuccess();
        onClose();
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Network or server error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 w-full max-w-2xl rounded-xl overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold mb-4">
          {existingBlog ? "Edit Blog" : "Add New Blog"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
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
            placeholder="Meta description"
            className="w-full p-2 border"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block font-medium mb-2">Blog Content</label>
            <div className="border rounded overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value }))
                }
                modules={{ toolbar: toolbarOptions }}
                className="react-quill-editor"
              />
            </div>
          </div>

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
          <div>
            <label className="block mb-2 font-medium">
              Schema Markup (JSON-LD)
            </label>
            {formData.schemaMarkup.map((markup, index) => (
              <textarea
                key={index}
                rows={6}
                placeholder="Paste JSON-LD..."
                className="w-full border p-2 rounded mb-2 bg-transparent text-black"
                value={markup}
                onChange={(e) => {
                  const newSchema = [...formData.schemaMarkup];
                  newSchema[index] = e.target.value;
                  setFormData((prev) => ({ ...prev, schemaMarkup: newSchema }));
                }}
              />
            ))}
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline mb-4"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  schemaMarkup: [...prev.schemaMarkup, ""],
                }))
              }
            >
              + Add Another Schema Markup
            </button>
          </div>

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
              className={`px-4 py-2 text-white rounded ${
                submitting
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={submitting}
            >
              {submitting
                ? existingBlog
                  ? "Updating..."
                  : "Adding..."
                : existingBlog
                  ? "Update"
                  : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
