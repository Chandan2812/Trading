import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface User {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  accountHolderName?: string;
  accountNumber?: string;
  ifscCode?: string;
  iban?: string;
  bankName?: string;
  bankAddress?: string;
  pendingBankDetails?: {
    accountHolderName?: string;
    accountNumber?: string;
    ifscCode?: string;
    iban?: string;
    bankName?: string;
    bankAddress?: string;
  };
  bankApprovalStatus?: string; // "pending", "approved", "rejected"
}

export default function BankUpdateApprovals() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // 🔐 Redirect to login if no token
    if (!token || token !== "admin-token") {
      navigate("/login");
      return;
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/auth/users`);
        // Only show users who have pending bank updates
        const pendingUpdates = res.data.filter(
          (u: User) =>
            u.pendingBankDetails && Object.keys(u.pendingBankDetails).length > 0
        );
        setUsers(pendingUpdates);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleBankApproval = async (email: string, approve: boolean) => {
    if (
      !confirm(
        `Are you sure you want to ${
          approve ? "approve" : "reject"
        } this bank update?`
      )
    )
      return;

    try {
      setProcessing(true);
      await axios.patch(`${baseURL}/api/auth/bank-approve/${email}`, {
        approve,
      });

      setUsers(
        (prev) => prev.filter((u) => u.email !== email) // Remove user from pending list
      );

      alert(`Bank details ${approve ? "approved ✅" : "rejected ❌"}`);
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update bank details.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-4">
      <h1 className="text-3xl font-bold mb-6">Pending Bank Updates</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No pending bank updates.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#1f2937]">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Bank Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-gray-700 hover:bg-[#111827]"
                >
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`${
                        user.bankApprovalStatus === "approved"
                          ? "text-green-400"
                          : user.bankApprovalStatus === "rejected"
                            ? "text-red-400"
                            : "text-yellow-400"
                      } font-medium`}
                    >
                      {user.bankApprovalStatus || "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button text="View" onClick={() => setSelectedUser(user)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1f2937] rounded-lg p-6 w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-5 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedUser.fullName}</h2>

            <div className="flex justify-between gap-10 mb-10">
              {/* Current Bank Details */}
              <div className="space-y-2 text-sm text-gray-300 w-1/2">
                <h3 className="text-lg font-semibold mb-2">
                  Current Bank Details
                </h3>
                <p>
                  <b>Account Holder:</b>{" "}
                  {selectedUser.accountHolderName || "N/A"}
                </p>
                <p>
                  <b>Account Number:</b> {selectedUser.accountNumber || "N/A"}
                </p>
                <p>
                  <b>IFSC:</b> {selectedUser.ifscCode || "N/A"}
                </p>
                <p>
                  <b>IBAN:</b> {selectedUser.iban || "N/A"}
                </p>
                <p>
                  <b>Bank Name:</b> {selectedUser.bankName || "N/A"}
                </p>
                <p>
                  <b>Bank Address:</b> {selectedUser.bankAddress || "N/A"}
                </p>
              </div>

              {/* Pending Bank Details */}
              <div className="space-y-2 text-sm text-gray-300 w-1/2">
                <h3 className="text-lg font-semibold mb-2">
                  Pending Bank Details
                </h3>
                <p>
                  <b>Account Holder:</b>{" "}
                  {selectedUser.pendingBankDetails?.accountHolderName || "N/A"}
                </p>
                <p>
                  <b>Account Number:</b>{" "}
                  {selectedUser.pendingBankDetails?.accountNumber || "N/A"}
                </p>
                <p>
                  <b>IFSC:</b>{" "}
                  {selectedUser.pendingBankDetails?.ifscCode || "N/A"}
                </p>
                <p>
                  <b>IBAN:</b> {selectedUser.pendingBankDetails?.iban || "N/A"}
                </p>
                <p>
                  <b>Bank Name:</b>{" "}
                  {selectedUser.pendingBankDetails?.bankName || "N/A"}
                </p>
                <p>
                  <b>Bank Address:</b>{" "}
                  {selectedUser.pendingBankDetails?.bankAddress || "N/A"}
                </p>
              </div>
            </div>

            {/* Approve / Reject Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button
                text="Approve"
                onClick={() => handleBankApproval(selectedUser.email, true)}
                className="bg-green-500 hover:bg-green-600 text-black"
                disabled={processing}
              />
              <Button
                text="Reject"
                onClick={() => handleBankApproval(selectedUser.email, false)}
                className="bg-red-500 hover:bg-red-600 text-black"
                disabled={processing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
