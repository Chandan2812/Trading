import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Download } from "lucide-react";
import { exportToExcel } from "../../utils/exportToExcel";

const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Lead {
  _id: string;
  fullName: string;
  phone: string;
  city: string;
  email: string;
  marketSegment: string;
  createdAt: string;
  isChecked?: boolean;
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/popup-lead`);
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle marked
  const toggleMarked = async (id: string, current: boolean) => {
    try {
      const res = await axios.patch(`${baseURL}/api/popup-lead/${id}/check`, {
        isChecked: !current,
      });
      setLeads((prev) =>
        prev.map((lead) =>
          lead._id === id
            ? { ...lead, isChecked: res.data.lead.isChecked }
            : lead
        )
      );
    } catch (err) {
      console.error("Failed to toggle marked:", err);
    }
  };

  // ✅ Delete lead
  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await axios.delete(`${baseURL}/api/popup-lead/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // ✅ Search filter
  const filteredLeads = leads.filter((lead) => {
    const term = search.toLowerCase();
    return (
      (lead.fullName?.toLowerCase() ?? "").includes(term) ||
      (lead.phone?.toLowerCase() ?? "").includes(term) ||
      (lead.city?.toLowerCase() ?? "").includes(term) ||
      (lead.email?.toLowerCase() ?? "").includes(term) ||
      (lead.marketSegment?.toLowerCase() ?? "").includes(term)
    );
  });

  // ✅ Pagination
  const indexOfLast = currentPage * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  // ✅ Export handler
  const handleExport = () => {
    exportToExcel(
      "Leads",
      filteredLeads,
      [
        "Full Name",
        "Phone",
        "City",
        "Email",
        "Market Segment",
        "Created At",
        "Checked",
      ],
      [
        "fullName",
        "phone",
        "city",
        "email",
        "marketSegment",
        "createdAt",
        "isChecked",
      ]
    );
  };

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage all collected leads
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setCurrentPage(1);
              setSearch(e.target.value);
            }}
            className="px-3 py-2 rounded bg-gray-800 text-sm focus:outline-none"
          />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-gray-400">Loading Leads...</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-[#1f2937]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Full Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Market Segment</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-6 text-gray-400">
                      No leads found.
                    </td>
                  </tr>
                ) : (
                  currentLeads.map((lead, index) => (
                    <tr
                      key={lead._id}
                      className="border-b border-gray-700 hover:bg-[#111827]"
                    >
                      <td className="px-4 py-3">{indexOfFirst + index + 1}</td>
                      <td className="px-4 py-3">{lead.fullName}</td>
                      <td className="px-4 py-3">{lead.phone}</td>
                      <td className="px-4 py-3">{lead.city}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.marketSegment}</td>
                      <td className="px-4 py-3">
                        {new Date(lead.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-3 flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={lead.isChecked || false}
                          onChange={() =>
                            toggleMarked(lead._id, lead.isChecked || false)
                          }
                        />
                        <button
                          onClick={() => deleteLead(lead._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden">
            {currentLeads.length === 0 ? (
              <p className="text-center text-gray-400">No leads found.</p>
            ) : (
              currentLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="p-4 rounded-lg border border-gray-700 bg-[#111827] shadow"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold">{lead.fullName}</h2>
                    <input
                      type="checkbox"
                      checked={lead.isChecked || false}
                      onChange={() =>
                        toggleMarked(lead._id, lead.isChecked || false)
                      }
                    />
                  </div>
                  <p className="text-sm text-gray-400">{lead.email}</p>
                  <p className="text-sm text-gray-400">{lead.phone}</p>
                  <p className="text-sm text-gray-400">{lead.city}</p>
                  <p className="text-sm text-gray-400">{lead.marketSegment}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(lead.createdAt).toLocaleString("en-IN")}
                  </p>
                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="mt-3 text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              ))
            )}
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
    </div>
  );
}
