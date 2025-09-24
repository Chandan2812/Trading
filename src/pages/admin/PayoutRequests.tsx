"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../../components/Button";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Withdrawal {
  _id: string;
  orderid: string;
  account: string;
  ifsc: string;
  name: string;
  mobile: string;
  amount: number;
  accountNo: string;
  note?: string;
  status: "Pending" | "Completed" | "Rejected";
  createdAt: string;
}

interface AccountSummary {
  response: string;
  message: string;
  accountno: string;
  balance: string;
  Credit: string;
  Floating: string;
  Margin: string;
  MarginFree: string;
  Equity: string;
  DWBalance: string;
}

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApprove, setIsApprove] = useState(false);
  const [isReject, setIsReject] = useState(false);

  const [selectedWithdrawal, setSelectedWithdrawal] =
    useState<Withdrawal | null>(null);

  // 👉 state for balance
  const [balanceData, setBalanceData] = useState<AccountSummary | null>(null);
  const [loadingBalance, setLoadingBalance] = useState(false);

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
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/payment/withdrawals`);
      setWithdrawals(res.data.data);
    } catch (err: unknown) {
      toast.error("Failed to load withdrawals");
    } finally {
      setLoading(false);
    }
  };

  // 👉 fetch balance when opening modal
  const fetchBalance = async (accountNo: string) => {
    setLoadingBalance(true);
    setBalanceData(null);
    // console.log(accountNo);
    try {
      const res = await axios.post(`${baseURL}/api/moneyplant/checkBalance`, {
        accountno: accountNo,
      });
      // console.log(res);
      setBalanceData(res.data.data);
    } catch {
      toast.error("Failed to fetch account balance");
    } finally {
      setLoadingBalance(false);
    }
  };

  const handleApprove = async (id: string) => {
    setIsApprove(true);
    try {
      const res = await axios.post(`${baseURL}/api/payment/approve/${id}`);

      if (res.data?.success) {
        toast.success("Withdrawal Approved");
        fetchWithdrawals();
      } else {
        toast.error(res.data?.message || "Approval failed");
      }
    } catch (err: unknown) {
      let errorMsg = "Approval failed";

      if (err instanceof AxiosError) {
        errorMsg =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          errorMsg;
        console.error("Approval Axios error:", err.response?.data);
      } else if (err instanceof Error) {
        errorMsg = err.message;
        console.error("Approval Error:", err);
      }

      toast.error(errorMsg);
    } finally {
      setIsApprove(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsReject(true);
    try {
      const res = await axios.post(`${baseURL}/api/payment/reject/${id}`);

      if (res.data?.success) {
        toast.success(res.data.message || "Withdrawal rejected & refunded");
        fetchWithdrawals();
      } else {
        toast.error(res.data?.message || "Rejection failed");
      }
    } catch (err: unknown) {
      let errorMsg = "Rejection failed";

      if (err instanceof AxiosError) {
        errorMsg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          errorMsg;
        console.error("Reject Axios error:", err.response?.data);
      } else if (err instanceof Error) {
        errorMsg = err.message;
        console.error("Reject Error:", err);
      }

      toast.error(errorMsg);
    } finally {
      setIsReject(false);
    }
  };

  if (loading) return <p className="text-gray-400 p-6">Loading...</p>;

  return (
    <div className="min-h-screen text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Withdrawal Requests</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Manage and review user withdrawal requests
        </p>
        <hr className="mt-4 border-gray-700" />
      </div>

      {withdrawals.length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No withdrawal requests found.
        </p>
      ) : (
        <div className="rounded-lg border border-[#1f2937] overflow-hidden">
          {/* ✅ Desktop Table */}
          <table className="hidden md:table w-full text-sm text-left">
            <thead className="bg-[#1f2937] text-gray-300 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Account</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr
                  key={w._id}
                  className="border-b border-gray-700 hover:bg-[#111827]"
                >
                  <td className="px-4 py-3">{w.orderid}</td>
                  <td className="px-4 py-3">{w.account}</td>
                  <td className="px-4 py-3">{w.name}</td>
                  <td className="px-4 py-3">₹{w.amount}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      w.status === "Completed"
                        ? "text-green-400"
                        : w.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }`}
                  >
                    {w.status}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      onClick={() => {
                        setSelectedWithdrawal(w);
                        fetchBalance(w.accountNo);
                      }}
                      text="View"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden space-y-4">
            {withdrawals.map((w) => (
              <div
                key={w._id}
                className="p-4 border border-gray-700 rounded-lg bg-[#111827]"
              >
                <p className="text-sm">
                  <b>Order ID:</b> {w.orderid}
                </p>
                <p className="text-sm">
                  <b>Account:</b> {w.account}
                </p>
                <p className="text-sm">
                  <b>Name:</b> {w.name}
                </p>
                <p className="text-sm">
                  <b>Amount:</b> ₹{w.amount}
                </p>
                <p className="text-sm">
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      w.status === "Completed"
                        ? "text-green-400"
                        : w.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }`}
                  >
                    {w.status}
                  </span>
                </p>
                <Button
                  onClick={() => {
                    setSelectedWithdrawal(w);
                    fetchBalance(w.accountNo);
                  }}
                  text="View Details"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Modal */}
      {selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1f2937] rounded-lg p-6 w-11/12 md:w-2/3 max-h-[90vh] overflow-y-auto space-y-3 relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setSelectedWithdrawal(null);
                setBalanceData(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              Withdrawal {selectedWithdrawal.orderid}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-300">
              <div className="space-y-3">
                <p>
                  <b>Account:</b> {selectedWithdrawal.account}
                </p>
                <p>
                  <b>IFSC:</b> {selectedWithdrawal.ifsc}
                </p>
                <p>
                  <b>Name:</b> {selectedWithdrawal.name}
                </p>
                <p>
                  <b>Mobile:</b> {selectedWithdrawal.mobile}
                </p>
                <p>
                  <b>Note:</b> {selectedWithdrawal.note || "—"}
                </p>
              </div>
              <div className="space-y-3">
                <p>
                  <b>Amount:</b> ₹{selectedWithdrawal.amount}
                </p>
                <p>
                  <b>Account No:</b> {selectedWithdrawal.accountNo}
                </p>
                <p>
                  <b>Status:</b>{" "}
                  <span
                    className={`font-semibold ${
                      selectedWithdrawal.status === "Completed"
                        ? "text-green-400"
                        : selectedWithdrawal.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }`}
                  >
                    {selectedWithdrawal.status}
                  </span>
                </p>
                <p>
                  <b>Created:</b>{" "}
                  {new Date(selectedWithdrawal.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* ✅ Balance Info */}
            <div className="mt-6 border-t border-gray-700 pt-4">
              <h3 className="font-semibold text-lg mb-2">
                Client Remaining Balance
              </h3>
              {loadingBalance ? (
                <p className="text-gray-400">Fetching balance...</p>
              ) : balanceData ? (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <b>Total Balance:</b> ${balanceData.balance}
                  </p>
                  <p>
                    <b>Equity:</b> ${balanceData.Equity}
                  </p>
                  <p>
                    <b>Margin Free:</b> ${balanceData.MarginFree}
                  </p>
                  <p>
                    <b>DW Balance:</b> ${balanceData.DWBalance}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400">No balance info available.</p>
              )}
            </div>

            {/* ✅ Actions */}
            <div className="flex justify-end gap-3 mt-6">
              {selectedWithdrawal.status !== "Completed" && (
                <Button
                  onClick={async () => {
                    await handleApprove(selectedWithdrawal._id);
                    setSelectedWithdrawal(null);
                  }}
                  text={isApprove ? "Approving..." : "Approve"}
                  disabled={isApprove}
                />
              )}
              {selectedWithdrawal.status !== "Rejected" && (
                <Button
                  onClick={async () => {
                    await handleReject(selectedWithdrawal._id);
                    setSelectedWithdrawal(null);
                  }}
                  text={isReject ? "Rejecting..." : "Reject"}
                  disabled={isReject}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
