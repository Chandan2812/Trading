import { useEffect, useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Offer {
  _id: string;
  email: string;
  createdAt: string;
}

export default function EmailSubscribers() {
  const [emailSubscribers, setEmailSubscribers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriberPerPage] = useState(10);

  // ✅ Fetch offers
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${baseURL}/subscribers`);
      setEmailSubscribers(res.data);
    } catch (err) {
      console.error("Failed to fetch offers:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Pagination
  const indexOfLast = currentPage * subscriberPerPage;
  const indexOfFirst = indexOfLast - subscriberPerPage;
  const currentSubscribers = emailSubscribers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(emailSubscribers.length / subscriberPerPage);

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Subscribers</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage active subscribers
          </p>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading offers...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1f2937]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subscribe At</th>
              </tr>
            </thead>
            <tbody>
              {currentSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-400">
                    No offers found.
                  </td>
                </tr>
              ) : (
                currentSubscribers.map((subscribers) => (
                  <tr
                    key={subscribers._id}
                    className="border-b border-gray-700 hover:bg-[#111827]"
                  >
                    <td className="px-4 py-3">{subscribers.email}</td>
                    <td className="px-4 py-3">
                      {subscribers.createdAt
                        ? new Date(subscribers.createdAt).toLocaleString(
                            "en-IN",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true, // set false for 24-hour format
                            }
                          )
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
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
    </div>
  );
}
