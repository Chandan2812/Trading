"use client";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type Transaction = {
  date: string;
  amount: number;
  account: string;
  status: "Pending" | "Completed" | "Failed" | "Rejected";
  txnId?: string;
  name?: string | "";
};

interface DepositResponse {
  orderid: string;
  _id: string;
  createdAt: string;
  amount: string | number;
  accountNo: string | number;
  status: "SUCCESS" | "FAILED" | "PENDING" | string;
  name: string | "";
}

interface WithdrawalResponse {
  _id: string;
  createdAt: string;
  amount: string | number;
  name: string;
  accountNo: string | number;
  status: "Pending" | "Completed" | "Rejected" | string;
  response?: {
    orderid?: string;
    [key: string]: unknown; // safer than any
  };
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function AdminTransactionPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"deposit" | "withdrawal">(
    "deposit"
  );
  // const [accounts, setAccounts] = useState<Account[]>([]);
  // const [accountNo, setAccountNo] = useState<string>("");

  // data + totals
  const [depositAll, setDepositAll] = useState<Transaction[] | null>(null); // for client fallback
  const [withdrawAll, setWithdrawAll] = useState<Transaction[] | null>(null); // for client fallback
  const [depositPageData, setDepositPageData] = useState<Transaction[]>([]);
  const [withdrawPageData, setWithdrawPageData] = useState<Transaction[]>([]);
  const [depositTotal, setDepositTotal] = useState<number>(0);
  const [withdrawTotal, setWithdrawTotal] = useState<number>(0);

  // paging state
  const [depPage, setDepPage] = useState<number>(1);
  const [withPage, setWithPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Filters
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(false);

  // ---------- helpers ----------
  const formatRow = (
    row: DepositResponse | WithdrawalResponse,
    type: "deposit" | "withdrawal"
  ): Transaction => ({
    date: new Date(row.createdAt).toLocaleString(),
    amount: Number(row.amount),
    account: String(row.accountNo),
    name: row && row.name ? String(row.name) : "-",
    status:
      type === "deposit"
        ? row.status === "SUCCESS"
          ? "Completed"
          : row.status === "FAILED"
            ? "Failed"
            : "Pending"
        : (row as WithdrawalResponse).status === "Completed"
          ? "Completed"
          : (row as WithdrawalResponse).status === "Rejected"
            ? "Rejected"
            : "Pending",
    txnId:
      type === "withdrawal"
        ? (row as WithdrawalResponse).response?.orderid || "-"
        : (row as DepositResponse).orderid || "-", // Safe and typed
  });

  const sliceForPage = (rows: Transaction[], page: number, limit: number) => {
    const start = (page - 1) * limit;
    return rows.slice(start, start + limit);
  };

  const totalDepositPages = useMemo(
    () => Math.max(1, Math.ceil(depositTotal / pageSize)),
    [depositTotal, pageSize]
  );
  const totalWithdrawPages = useMemo(
    () => Math.max(1, Math.ceil(withdrawTotal / pageSize)),
    [withdrawTotal, pageSize]
  );

  const currentPage = activeTab === "deposit" ? depPage : withPage;
  const totalPages =
    activeTab === "deposit" ? totalDepositPages : totalWithdrawPages;
  const currentData =
    activeTab === "deposit" ? depositPageData : withdrawPageData;
  const currentTotal = activeTab === "deposit" ? depositTotal : withdrawTotal;

  // ---------- fetch accounts ----------

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // 🔐 Redirect to login if no token
    if (!token || token !== "admin-token") {
      navigate("/login");
      return;
    }
  }, []);

  // ---------- fetch transactions (server first, fallback client) ----------
  const fetchDeposits = async (page = 1, limit = pageSize) => {
    try {
      setLoading(true);
      const url = `${baseURL}/api/payment/deposit?page=${page}&limit=${limit}`;
      const res = await axios.get(url);
      // console.log(res.data);

      // If API returns paginated structure
      if (
        Array.isArray(res.data?.deposits) &&
        typeof res.data?.total === "number"
      ) {
        setDepositAll(null); // server paging mode
        setDepositPageData(
          res.data.deposits.map((d: DepositResponse) => formatRow(d, "deposit"))
        );
        setDepositTotal(res.data.total);
      } else {
        // fallback: API returned all rows
        const allRows: Transaction[] = (res.data?.deposits || []).map(
          (d: DepositResponse) => formatRow(d, "deposit")
        );
        setDepositAll(allRows);
        setDepositTotal(allRows.length);
        setDepositPageData(sliceForPage(allRows, page, limit));
      }
    } catch (err) {
      console.error("Error fetching deposits:", err);
      setDepositAll([]);
      setDepositTotal(0);
      setDepositPageData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchWithdrawals = async (page = 1, limit = pageSize) => {
    try {
      setLoading(true);
      const url = `${baseURL}/api/payment/withdrawal?page=${page}&limit=${limit}`;
      const res = await axios.get(url);

      if (
        Array.isArray(res.data?.withdrawals) &&
        typeof res.data?.total === "number"
      ) {
        setWithdrawAll(null); // server paging mode
        setWithdrawPageData(
          res.data.withdrawals.map((w: WithdrawalResponse) =>
            formatRow(w, "withdrawal")
          )
        );
        setWithdrawTotal(res.data.total);
      } else {
        const allRows: Transaction[] = (res.data?.withdrawals || []).map(
          (w: WithdrawalResponse) => formatRow(w, "withdrawal")
        );
        setWithdrawAll(allRows);
        setWithdrawTotal(allRows.length);
        setWithdrawPageData(sliceForPage(allRows, page, limit));
      }
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
      setWithdrawAll([]);
      setWithdrawTotal(0);
      setWithdrawPageData([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------- effects ----------

  // When accountNo is ready, load the active tab
  useEffect(() => {
    setDepPage(1);
    setWithPage(1);
    if (activeTab === "deposit") fetchDeposits(1, pageSize);
    else fetchWithdrawals(1, pageSize);
  }, []); // eslint-disable-line

  // When tab changes, (re)fetch page 1 for that tab
  useEffect(() => {
    if (activeTab === "deposit") fetchDeposits(depPage, pageSize);
    else fetchWithdrawals(withPage, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // When pageSize changes, reset to page 1 for active tab and refetch
  useEffect(() => {
    if (activeTab === "deposit") {
      setDepPage(1);
      fetchDeposits(1, pageSize);
    } else {
      setWithPage(1);
      fetchWithdrawals(1, pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize]);

  // When page changes (per tab), refetch or slice
  useEffect(() => {
    if (activeTab === "deposit") {
      if (depositAll) {
        setDepositPageData(sliceForPage(depositAll, depPage, pageSize));
      } else {
        fetchDeposits(depPage, pageSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depPage]);

  useEffect(() => {
    if (activeTab === "withdrawal") {
      if (withdrawAll) {
        setWithdrawPageData(sliceForPage(withdrawAll, withPage, pageSize));
      } else {
        fetchWithdrawals(withPage, pageSize);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withPage]);

  // ---------- pagination UI helpers ----------
  const getPageButtons = (current: number, total: number, maxButtons = 3) => {
    if (total <= maxButtons)
      return Array.from({ length: total }, (_, i) => i + 1);

    const buttons: (number | string)[] = [];
    const middleCount = maxButtons - 2; // reserve for first & last
    let start = Math.max(2, current - Math.floor(middleCount / 2));
    const end = Math.min(total - 1, start + middleCount - 1);

    // shift window if at the end
    if (end - start + 1 < middleCount) {
      start = Math.max(2, end - middleCount + 1);
    }

    buttons.push(1);
    if (start > 2) buttons.push("…");
    for (let i = start; i <= end; i++) buttons.push(i);
    if (end < total - 1) buttons.push("…");
    buttons.push(total);

    return buttons;
  };

  const pageButtons = getPageButtons(currentPage, totalPages);

  const handleFirst = () => {
    if (activeTab === "deposit") setDepPage(1);
    else setWithPage(1);
  };
  const handlePrev = () => {
    if (activeTab === "deposit") setDepPage((p) => Math.max(1, p - 1));
    else setWithPage((p) => Math.max(1, p - 1));
  };
  const handleNext = () => {
    if (activeTab === "deposit") setDepPage((p) => Math.min(totalPages, p + 1));
    else setWithPage((p) => Math.min(totalPages, p + 1));
  };
  const handleLast = () => {
    if (activeTab === "deposit") setDepPage(totalPages);
    else setWithPage(totalPages);
  };
  const jumpTo = (n: number) => {
    if (activeTab === "deposit") setDepPage(n);
    else setWithPage(n);
  };

  const filteredData = currentData.filter((item) => {
    const matchStatus =
      statusFilter === "All" ? true : item.status === statusFilter;
    const matchStart = startDate
      ? new Date(item.date) >= new Date(startDate)
      : true;
    const matchEnd = endDate ? new Date(item.date) <= new Date(endDate) : true;
    return matchStatus && matchStart && matchEnd;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="min-h-screen    px-6 pt-5  text-white ">
        <h1 className="text-2xl font-bold mb-6">Transaction History</h1>

        {/* Account Selector */}

        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-4 items-end">
            {/* Status Filter */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              >
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <button
              onClick={() => {
                setStatusFilter("All");
                setStartDate("");
                setEndDate("");
              }}
              className="px-4 py-2 bg-red-500 rounded-lg"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Rows per page
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600"
            >
              {PAGE_SIZE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "deposit"
                ? "bg-[var(--primary-color)]"
                : "bg-gray-700"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdrawal")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "withdrawal"
                ? "bg-[var(--primary-color)]"
                : "bg-gray-700"
            }`}
          >
            Withdrawal
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto md:w-full w-[330px]">
          {loading ? (
            <p className="text-center text-gray-400 py-4">Loading...</p>
          ) : (
            <table className="w-full border border-gray-700 rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-left">
                  <th className="px-4 py-2">Txn Id</th>
                  <th className="px-4 py-2">Account</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Amount</th>

                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2 pr-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => (
                    <tr key={idx} className="border-t border-gray-700">
                      <td className="px-4 py-2">{item.txnId}</td>
                      <td className="px-4 py-2">{item.account}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.amount}</td>

                      <td className="px-4 py-2">{item.status}</td>
                      <td className="px-4 py-2 pr-6">{item.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-4 text-center text-gray-400"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Bar */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-2">
          <div className="text-sm text-gray-400">
            {currentTotal > 0 ? (
              <>
                Showing{" "}
                <span className="text-white">
                  {(currentPage - 1) * pageSize + 1}-
                  {Math.min(currentPage * pageSize, currentTotal)}
                </span>{" "}
                of <span className="text-white">{currentTotal}</span>
              </>
            ) : (
              "No records"
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFirst}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              « First
            </button>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              ‹ Prev
            </button>

            {pageButtons.map((btn, i) =>
              typeof btn === "number" ? (
                <button
                  key={i}
                  onClick={() => jumpTo(btn)}
                  className={`px-3 py-1 rounded ${
                    btn === currentPage
                      ? "bg-[var(--primary-color)]"
                      : "bg-gray-700"
                  }`}
                >
                  {btn}
                </button>
              ) : (
                <span key={i} className="px-2 select-none">
                  {btn}
                </span>
              )
            )}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              Next ›
            </button>
            <button
              onClick={handleLast}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
            >
              Last »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
