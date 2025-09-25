import { useEffect, useState } from "react";
import axios from "axios";
import { exportToExcel } from "../../utils/exportToExcel"; // adjust path if needed
import { Download } from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function EmailSubscribers() {
  const [emailSubscribers, setEmailSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [subscriberPerPage] = useState(10);
  const [search, setSearch] = useState("");

  // ✅ Fetch subscribers
  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await axios.get(`${baseURL}/subscribers`);
      setEmailSubscribers(res.data);
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Filtered data
  const filteredSubscribers = emailSubscribers.filter((sub) =>
    (sub.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Pagination
  const indexOfLast = currentPage * subscriberPerPage;
  const indexOfFirst = indexOfLast - subscriberPerPage;
  const currentSubscribers = filteredSubscribers.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(filteredSubscribers.length / subscriberPerPage);

  // ✅ Export to Excel
  const handleExport = () => {
    exportToExcel(
      "Email Subscribers",
      filteredSubscribers,
      ["Email", "Subscribed At"],
      ["email", "createdAt"]
    );
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-3xl font-bold">Email Subscribers</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage active subscribers
          </p>
        </div>

        {/* Search + Export */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-1 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            <Download size={16} /> Export To Excel
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-400">Loading subscribers...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1f2937]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {currentSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-6 text-gray-400">
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                currentSubscribers.map((sub) => (
                  <tr
                    key={sub._id}
                    className="border-b border-gray-700 hover:bg-[#111827]"
                  >
                    <td className="px-4 py-3">{sub.email}</td>
                    <td className="px-4 py-3">
                      {sub.createdAt
                        ? new Date(sub.createdAt).toLocaleString("en-IN", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true,
                          })
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
