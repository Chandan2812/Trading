import { useEffect, useState } from "react";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Button from "../../components/Button";
import { Edit2, Trash2 } from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Offer {
  _id: string;
  title: string;
  subtitle?: string;
  bannerImage: string;
  popupImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(5);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  // ✅ Form State (controlled inputs)
  const [formState, setFormState] = useState<any>({
    title: "",
    subtitle: "",
    ctaLabel: "",
    ctaLink: "",
    startDate: "",
    endDate: "",
    isActive: "true",
    bannerImage: null,
    popupImage: null,
  });

  // ✅ Fetch offers
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/offer/view`);
      setOffers(res.data);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Pagination
  const indexOfLast = currentPage * offersPerPage;
  const indexOfFirst = indexOfLast - offersPerPage;
  const currentOffers = offers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(offers.length / offersPerPage);

  // ✅ Delete Offer
  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this offer?")) return;

    try {
      await axios.delete(`${baseURL}/api/offer/${id}`);
      setOffers((prev) => prev.filter((o) => o._id !== id));
      alert("🗑️ Offer deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Failed to delete offer");
    }
  };

  // ✅ Open Add Modal (reset form)
  const handleAdd = () => {
    setFormState({
      title: "",
      subtitle: "",
      ctaLabel: "",
      ctaLink: "",
      startDate: "",
      endDate: "",
      isActive: "true",
      bannerImage: null,
      popupImage: null,
    });
    setShowAddModal(true);
  };

  // ✅ Open Edit Modal (fill form)
  const handleEdit = (offer: Offer) => {
    setSelectedOffer(offer);
    setFormState({
      title: offer.title || "",
      subtitle: offer.subtitle || "",
      ctaLabel: offer.ctaLabel || "",
      ctaLink: offer.ctaLink || "",
      startDate: offer.startDate ? offer.startDate.split("T")[0] : "",
      endDate: offer.endDate ? offer.endDate.split("T")[0] : "",
      isActive: offer.isActive ? "true" : "false",
      bannerImage: null,
      popupImage: null,
    });
    setShowEditModal(true);
  };

  // ✅ Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const input = e.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        setFormState((prev: any) => ({ ...prev, [name]: input.files![0] }));
      }
    } else {
      setFormState((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent, isEdit = false) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formState).forEach(([key, value]) => {
      if (value === null || value === undefined) return;

      // If it's a File (from input type="file")
      if (value instanceof File) {
        data.append(key, value);
      } else {
        data.append(key, String(value)); // safely cast everything else to string
      }
    });

    try {
      if (isEdit && selectedOffer) {
        await axios.put(`${baseURL}/api/offer/${selectedOffer._id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Offer updated!");
      } else {
        await axios.post(`${baseURL}/api/offer/new`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Offer added!");
      }

      setShowAddModal(false);
      setShowEditModal(false);
      fetchOffers();
    } catch (error) {
      console.error("Save error:", error);
      alert("❌ Failed to save offer");
    }
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Offers</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage active offers</p>
        </div>
        <Button text="➕ Add Offer" onClick={handleAdd} />
      </div>

      {/* Offers List - Table for md+, Cards for mobile */}
      {loading ? (
        <p className="text-gray-400 text-center py-4">Loading offers...</p>
      ) : currentOffers.length === 0 ? (
        <p className="text-gray-400 text-center py-6">No offers found.</p>
      ) : (
        <>
          {/* Table - visible on md+ */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-[#1f2937]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Banner</th>
                  <th className="px-4 py-3">CTA</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentOffers.map((offer) => (
                  <tr
                    key={offer._id}
                    className="border-b border-gray-700 hover:bg-[#111827]"
                  >
                    <td className="px-4 py-3">{offer.title}</td>
                    <td className="px-4 py-3">
                      {offer.startDate
                        ? new Date(offer.startDate).toLocaleDateString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {offer.endDate
                        ? new Date(offer.endDate).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Zoom>
                        <img
                          src={offer.bannerImage}
                          alt="banner"
                          className="h-12 rounded object-cover"
                        />
                      </Zoom>
                    </td>
                    <td className="px-4 py-3">
                      {offer.ctaLabel || "—"}{" "}
                      {offer.ctaLink && (
                        <a
                          href={offer.ctaLink}
                          target="_blank"
                          className="text-blue-400 underline"
                        >
                          Link
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {offer.isActive ? (
                        <span className="text-green-400">Active</span>
                      ) : (
                        <span className="text-red-400">Inactive</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => handleEdit(offer)}
                        className="text-blue-500 mt-3"
                      >
                        <Edit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(offer._id)}
                        className="text-red-500 mt-3"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card/Box view - visible on mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {currentOffers.map((offer) => (
              <div
                key={offer._id}
                className="bg-[#1f2937] rounded-lg p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-white font-semibold text-lg">
                    {offer.title}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="text-blue-500"
                    >
                      <Edit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(offer._id)}
                      className="text-red-500"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Start:{" "}
                  {offer.startDate
                    ? new Date(offer.startDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </p>
                <p className="text-gray-400 text-sm">
                  End:{" "}
                  {offer.endDate
                    ? new Date(offer.endDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </p>
                <p className="text-gray-400 text-sm">
                  CTA: {offer.ctaLabel || "—"}{" "}
                  {offer.ctaLink && (
                    <a
                      href={offer.ctaLink}
                      target="_blank"
                      className="text-blue-400 underline"
                    >
                      Link
                    </a>
                  )}
                </p>
                <p className="text-sm">
                  Status:{" "}
                  {offer.isActive ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-red-400">Inactive</span>
                  )}
                </p>
                {offer.bannerImage && (
                  <Zoom>
                    <img
                      src={offer.bannerImage}
                      alt="banner"
                      className="h-24 w-full object-cover rounded mt-2"
                    />
                  </Zoom>
                )}
              </div>
            ))}
          </div>
        </>
      )}

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

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-[#1f2937] rounded-lg p-6 w-11/12 md:w-1/2 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
              }}
              className="absolute top-3 right-5 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              {showEditModal ? "Edit Offer" : "Add New Offer"}
            </h2>

            <form onSubmit={(e) => handleSubmit(e, showEditModal)}>
              {/* Title */}
              <label className="block mb-1 text-gray-300">Title</label>
              <input
                name="title"
                type="text"
                value={formState.title}
                placeholder="Enter title"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              />

              {/* Subtitle */}
              <label className="block mb-1 text-gray-300">Subtitle</label>
              <input
                name="subtitle"
                type="text"
                value={formState.subtitle}
                placeholder="Enter subtitle"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              />

              {/* CTA Label */}
              <label className="block mb-1 text-gray-300">CTA Label</label>
              <input
                name="ctaLabel"
                type="text"
                value={formState.ctaLabel}
                placeholder="e.g. Buy Now"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              />

              {/* CTA Link */}
              <label className="block mb-1 text-gray-300">CTA Link</label>
              <input
                name="ctaLink"
                type="text"
                value={formState.ctaLink}
                placeholder="https://example.com"
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              />

              {/* Dates */}
              <label className="block mb-1 text-gray-300">Start Date</label>
              <input
                name="startDate"
                type="date"
                value={formState.startDate}
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              />

              <label className="block mb-1 text-gray-300">End Date</label>
              <input
                name="endDate"
                type="date"
                value={formState.endDate}
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              />

              {/* Status */}
              <label className="block mb-1 text-gray-300">Status</label>
              <select
                name="isActive"
                value={formState.isActive}
                onChange={handleChange}
                className="w-full p-2 mb-3 rounded bg-gray-800 text-white border border-gray-600"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              {/* Banner Image */}
              <label className="block mb-1 text-gray-300">Banner Image</label>
              <input
                name="bannerImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 mb-3 text-white border border-gray-600"
              />

              {/* Popup Image */}
              <label className="block mb-1 text-gray-300">Popup Image</label>
              <input
                name="popupImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 mb-3 text-white border border-gray-600"
              />

              {/* Submit Button */}
              <Button
                text={showEditModal ? "Update Offer" : "Add Offer"}
                type="submit"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
