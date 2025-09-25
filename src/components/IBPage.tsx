import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface User {
  totalDeposit: number;
  totalWithdrawal: number;
  totalAccounts: number;
  accountType: string;
  createdAt: string;
  email: string;
  fullName?: string;
  referralCode?: string;
  isApprovedIB?: boolean;
}

interface IBPageProps {
  user: {
    email: string;
    isApprovedIB?: boolean;
  };
}

interface DepositResponse {
  _id: string;
  createdAt: string;
  amount: string | number;
  accountNo: string | number;
  status: "SUCCESS" | "FAILED" | "PENDING" | string;
}

interface WithdrawalResponse {
  _id: string;
  createdAt: string;
  amount: string | number;
  accountNo: string | number;
  status: "SUCCESS" | "FAILED" | "PENDING" | string;
}

function IBPage({ user }: IBPageProps) {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [connections, setConnections] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // 🔹 Filters
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // ✅ Fetch deposits for a user (all accounts)
  const fetchUserStats = async (
    email: string
  ): Promise<{ totalDeposit: number; totalWithdrawal: number }> => {
    try {
      const userRes = await axios.get(`${baseURL}/api/auth/user/${email}`);
      const accounts = userRes.data?.accounts || [];

      let depositSum = 0;
      let withdrawalSum = 0;

      for (const acc of accounts) {
        try {
          // deposits
          const depRes = await axios.get(
            `${baseURL}/api/payment/deposit/${acc.accountNo}`
          );
          const deposits: DepositResponse[] = depRes.data?.deposits || [];
          depositSum += deposits
            .filter((d) => d.status === "SUCCESS")
            .reduce((sum, d) => sum + Number(d.amount), 0);

          // withdrawals
          const wdRes = await axios.get(
            `${baseURL}/api/payment/withdrawal/${acc.accountNo}`
          );
          const withdrawals: WithdrawalResponse[] =
            wdRes.data?.withdrawals || [];
          withdrawalSum += withdrawals
            .filter((w) => w.status === "SUCCESS")
            .reduce((sum, w) => sum + Number(w.amount), 0);
        } catch (err) {
          console.error(
            `Error fetching transactions for account ${acc.accountNo}:`,
            err
          );
        }
      }

      return { totalDeposit: depositSum, totalWithdrawal: withdrawalSum };
    } catch (err) {
      console.error(`Error fetching accounts for user ${email}:`, err);
      return { totalDeposit: 0, totalWithdrawal: 0 };
    }
  };

  useEffect(() => {
    const fetchReferralAndConnections = async () => {
      try {
        // 1. Fetch IB referral code
        const ibRes = await axios.get<{ referralCode: string }>(
          `${baseURL}/api/ib/${user.email}`
        );
        const code = ibRes.data.referralCode;
        setReferralCode(code);

        // 2. Fetch all users
        const usersRes = await axios.get<User[]>(`${baseURL}/api/auth/users`);
        const allUsers = usersRes.data;

        // 3. Filter connections by referral code
        const matchedUsers = allUsers.filter((u) => u.referralCode === code);

        // 4. For each connection → fetch deposits
        const enrichedUsers = await Promise.all(
          matchedUsers.map(async (u) => {
            const { totalDeposit, totalWithdrawal } = await fetchUserStats(
              u.email
            );
            return { ...u, totalDeposit, totalWithdrawal };
          })
        );

        setConnections(enrichedUsers);
      } catch (err: unknown) {
        const axiosErr = err as AxiosError;
        console.error(
          "❌ Error fetching IB data:",
          axiosErr.response?.data || axiosErr.message
        );
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchReferralAndConnections();
  }, [user?.email]);

  const copyToClipboard = () => {
    if (referralCode) {
      navigator.clipboard.writeText(
        `https://www.billiondollarfx.com/register?ref=${referralCode}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 🔹 Apply filters
  const filteredConnections = connections.filter((c) => {
    const nameMatch = c.fullName
      ?.toLowerCase()
      .includes(searchName.toLowerCase());

    const date = new Date(c.createdAt);
    const afterStart = startDate ? date >= new Date(startDate) : true;
    const beforeEnd = endDate ? date <= new Date(endDate) : true;

    return nameMatch && afterStart && beforeEnd;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] px-6 md:px-12 py-10 text-white">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        Welcome, IB Partner 🎉
      </h1>

      {/* Referral Code Panel */}
      <div className="w-full max-w-2xl mx-auto bg-[#111a2e] p-6 rounded-2xl shadow-lg mb-10 flex flex-col items-center">
        <p className="text-gray-400 mb-2">Your Referral Code</p>
        <div className="flex items-center gap-3">
          <span className="text-yellow-400 font-mono font-semibold text-sm bg-[#1b2744] px-5 py-2 rounded-lg break-all">
            {`https://www.billiondollarfx.com/register?ref=${referralCode}`}
          </span>
          <button
            onClick={copyToClipboard}
            className="bg-[#1b2744] px-3 py-2 rounded-lg hover:bg-[#2a3a5f] transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Connections Panel */}
      <div className="w-full max-w-6xl mx-auto bg-[#111a2e] rounded-2xl shadow-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
          👥 My Connections
        </h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-6">
          <input
            type="text"
            placeholder="Search Client Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="px-3 sm:px-4 py-2 rounded-lg bg-[#1b2744] text-white w-full sm:w-64 outline-none"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 sm:px-4 py-2 rounded-lg bg-[#1b2744] text-white outline-none w-full sm:w-auto"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 sm:px-4 py-2 rounded-lg bg-[#1b2744] text-white outline-none w-full sm:w-auto"
          />
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-left border-collapse text-sm md:text-base">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">Client</th>
                <th className="py-3 px-4 text-gray-400 font-medium">
                  Total Withdrawal
                </th>

                <th className="py-3 px-4 text-gray-400 font-medium">
                  Total Deposit
                </th>
                <th className="py-3 px-4 text-gray-400 font-medium">
                  Total Lots
                </th>
                <th className="py-3 px-4 text-gray-400 font-medium">
                  Commission
                </th>
                <th className="py-3 px-4 text-gray-400 font-medium">
                  Account Type
                </th>
                <th className="py-3 px-4 text-gray-400 font-medium">
                  Registered Date
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    Loading connections...
                  </td>
                </tr>
              ) : filteredConnections.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-gray-400">
                    No Data found
                  </td>
                </tr>
              ) : (
                filteredConnections.map((c, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#1b2744] transition rounded-lg"
                  >
                    <td className="py-3 px-4">
                      {c.fullName || "Unnamed User"}
                    </td>
                    <td className="py-3 px-4">
                      ${c.totalWithdrawal?.toFixed(2) ?? "0.00"}
                    </td>
                    <td className="py-3 px-4">
                      ${c.totalDeposit?.toFixed(2) ?? "0.00"}
                    </td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4">—</td>
                    <td className="py-3 px-4">{c.accountType}</td>
                    <td className="py-3 px-4">
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleDateString("en-CA")
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-4">
          {loading ? (
            <p className="text-center text-gray-400 py-6">
              Loading connections...
            </p>
          ) : filteredConnections.length === 0 ? (
            <p className="text-center text-gray-400 py-6">No Data found</p>
          ) : (
            filteredConnections.map((c, idx) => (
              <div
                key={idx}
                className="bg-[#1b2744] rounded-lg p-4 shadow-md space-y-2"
              >
                <p>
                  <span className="text-gray-400">Client:</span>{" "}
                  {c.fullName || "Unnamed User"}
                </p>
                <p>
                  <span className="text-gray-400">Total Withdrawal:</span> $
                  {c.totalWithdrawal?.toFixed(2) ?? "0.00"}
                </p>
                <p>
                  <span className="text-gray-400">Total Deposit:</span> $
                  {c.totalDeposit?.toFixed(2) ?? "0.00"}
                </p>
                <p>
                  <span className="text-gray-400">Total Lots:</span> —
                </p>
                <p>
                  <span className="text-gray-400">Commission:</span> —
                </p>
                <p>
                  <span className="text-gray-400">Account Type:</span>{" "}
                  {c.accountType}
                </p>
                <p>
                  <span className="text-gray-400">Registered Date:</span>{" "}
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString("en-CA")
                    : "—"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default IBPage;
// function fetchUserDeposits(
//   email: string
// ):
//   | { totalDeposit: any; totalAccounts: any }
//   | PromiseLike<{ totalDeposit: any; totalAccounts: any }> {
//   throw new Error("Function not implemented.");
// }
