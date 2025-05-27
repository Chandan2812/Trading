import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import logo from "../assets/logo-01.svg";

const NewsletterForm = () => {
  const [form, setForm] = useState({
    subject: "",
    title: "",
    content: "",
    ctaText: "",
    ctaUrl: "",
    imageUrl: "",
    scheduleAt: "",
    emails: "",
    sendToAll: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const isCheckbox = (input: EventTarget): input is HTMLInputElement =>
      (input as HTMLInputElement).type === "checkbox";

    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox(e.target)
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      subject: form.subject,
      title: form.title,
      content: form.content,
      ctaText: form.ctaText,
      ctaUrl: form.ctaUrl,
      imageUrl: form.imageUrl,
      scheduleAt: form.scheduleAt
        ? new Date(form.scheduleAt).toISOString()
        : undefined,
      sendToAll: form.sendToAll,
      emails: form.sendToAll
        ? undefined
        : form.emails.split(",").map((email) => email.trim()),
    };

    try {
      const res = await axios.post(
        `https://cft-b87k.onrender.com/send-newsletter`,
        payload
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to send/schedule newsletter.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
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
      <h2 className="text-3xl font-semibold text-center mt-5">
        📬 Send Newsletter
      </h2>

      {/* Responsive Grid Layout */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-900 p-6 rounded shadow space-y-5"
        >
          {[
            { label: "Subject", name: "subject" },
            { label: "Title", name: "title" },
            { label: "Button Text", name: "ctaText" },
            { label: "Button URL", name: "ctaUrl", type: "url" },
            { label: "Image URL (optional)", name: "imageUrl" },
            {
              label: "Schedule At",
              name: "scheduleAt",
              type: "datetime-local",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"}
                value={form[field.name as keyof typeof form] as string}
                onChange={handleChange}
                className="w-full p-2 bg-neutral-700 border border-gray-600 text-white"
                required={!["imageUrl", "scheduleAt"].includes(field.name)}
              />
            </div>
          ))}

          <div>
            <label className="block mb-1">Content (Plain Text)</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows={6}
              placeholder={`Example: We launched a new feature.`}
              className="w-full p-2 bg-neutral-700 border border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Recipients</label>
            <label className="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                name="sendToAll"
                checked={form.sendToAll}
                onChange={handleChange}
              />
              <span>Send to All Subscribers</span>
            </label>

            {!form.sendToAll && (
              <textarea
                name="emails"
                placeholder="Enter comma-separated emails"
                value={form.emails}
                onChange={handleChange}
                className="w-full p-2 bg-neutral-700 border border-gray-600 text-white"
                rows={3}
                required
              />
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#ac7072] via-[#e6d2d1] to-[#ad7173] text-black font-medium py-2 px-6 hover:opacity-80"
            >
              {form.scheduleAt ? "Schedule Newsletter" : "Send Newsletter"}
            </button>
          </div>
        </form>

        {/* Right: Preview */}
        <div className="bg-neutral-800 p-6 rounded shadow space-y-4">
          <h3 className="text-xl font-semibold border-b border-gray-600 pb-2">
            🧾 Preview
          </h3>

          <p className="text-lg">{form.subject}</p>

          <h2 className="text-2xl font-bold">{form.title}</h2>

          <div className="text-sm whitespace-pre-wrap">{form.content}</div>

          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Newsletter"
              className="w-full rounded border border-gray-700"
            />
          )}

          {form.ctaText && (
            <a
              href={form.ctaUrl || "#"}
              className="inline-block mt-4 px-4 py-2 bg-gradient-to-r from-[#ac7072] via-[#e6d2d1] to-[#ad7173] text-black font-semibold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
