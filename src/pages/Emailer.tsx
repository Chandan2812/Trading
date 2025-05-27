import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo-01.svg";

const Emailer = () => {
  const [form, setForm] = useState({
    subject: "",
    title: "",
    content: "",
    ctaText: "",
    ctaUrl: "",
    imageUrl: "",
    emails: "",
    sendToAll: true,
  });
  const [attachments, setAttachments] = useState<FileList | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", form.subject);
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("ctaText", form.ctaText);
    formData.append("ctaUrl", form.ctaUrl);
    formData.append("imageUrl", form.imageUrl);
    formData.append("sendToAll", form.sendToAll.toString());

    if (!form.sendToAll) {
      form.emails
        .split(",")
        .map((email) => email.trim())
        .forEach((email) => formData.append("emails", email));
    }

    if (attachments) {
      for (let i = 0; i < attachments.length; i++) {
        formData.append("attachments", attachments[i]);
      }
    }

    try {
      const res = await axios.post(
        "https://cft-b87k.onrender.com/send-emailer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-gray-900 shadow px-6">
        <a href="/">
          <img
            src={logo}
            alt="Mondus Logo"
            className="h-20"
            draggable="false"
          />
        </a>
      </nav>
      <div className="p-6 max-w-7xl mx-auto text-white ">
        <h1 className="text-3xl font-bold mb-4 text-center">📧 Send Emailer</h1>
        <div className="flex flex-col lg:flex-row gap-8 ">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-full lg:w-1/2 bg-neutral-900 p-6"
          >
            {[
              { label: "Subject", name: "subject" },
              { label: "Title", name: "title" },
              { label: "Button Text", name: "ctaText" },
              { label: "Button URL", name: "ctaUrl" },
            ].map((field) => {
              const value = form[field.name as keyof typeof form];
              return (
                <div key={field.name}>
                  <label className="block mb-1">{field.label}</label>
                  <input
                    name={field.name}
                    value={typeof value === "string" ? value : ""}
                    onChange={handleChange}
                    className="w-full p-2 bg-neutral-800 border border-gray-600"
                    required
                  />
                </div>
              );
            })}

            <div>
              <label className="block mb-1">Image URL (Optional)</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full p-2 bg-neutral-800 border border-gray-600"
              />
            </div>
            <div>
              <label className="block mb-1">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 bg-neutral-800 border border-gray-600"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Attachments</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="block w-full text-white"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="sendToAll"
                  checked={form.sendToAll}
                  onChange={handleChange}
                />
                <span>Send to All Subscribers</span>
              </label>
            </div>

            {!form.sendToAll && (
              <div>
                <label className="block mb-1">Emails (comma-separated)</label>
                <textarea
                  name="emails"
                  value={form.emails}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 bg-neutral-800 border border-gray-600"
                  required
                />
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#ac7072] via-[#e6d2d1] to-[#ad7173] text-black font-medium py-2 px-6 hover:opacity-80"
              >
                Send Email
              </button>
            </div>
          </form>

          {/* Preview Section */}
          <div className="w-full lg:w-1/2 border border-gray-600 p-4 rounded bg-neutral-800">
            <h2 className="text-xl font-semibold mb-4">📄 Preview</h2>
            <h3 className="text-2xl font-bold mb-2">{form.title}</h3>
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Email Banner"
                className="w-full h-auto rounded mb-4"
              />
            )}
            <p className="mb-4 whitespace-pre-wrap">{form.content}</p>
            {form.ctaText && form.ctaUrl && (
              <a
                href={form.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 bg-gradient-to-r from-[#ac7072] via-[#e6d2d1] to-[#ad7173] text-black px-4 py-2 rounded hover:opacity-80"
              >
                {form.ctaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emailer;
