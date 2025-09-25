import React, { useEffect, useState } from "react";
import axios from "axios";
import { Notebook, Users, UserSquare2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeadsGraph from "../../components/LeadsGraph";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalBrokers, setTotalBrokers] = useState<number | null>(null);
  const [totalBlogs, setTotalBlogs] = useState<number | null>(null);
  const [totalLeads, setTotalLeads] = useState<number | null>(null);
  const [totalSubscribers, setTotalSubscribers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    // 🔐 Redirect to login if no token
    if (!token || token !== "admin-token") {
      navigate("/login");
      return;
    }

    axios.get(`${baseURL}/api/auth/users`).then((res) => {
      setTotalUsers(res.data.length || 0);
    });

    axios.get(`${baseURL}/api/ib`).then((res) => {
      setTotalBrokers(res.data.length || 0);
    });

    axios.get(`${baseURL}/api/blogs/viewblog`).then((res) => {
      setTotalBlogs(res.data.length || 0);
    });

    axios.get(`${baseURL}/api/popup-lead`).then((res) => {
      setTotalLeads(res.data.length || 0);
    });

    axios
      .get(`${baseURL}/subscribers`)
      .then((res) => {
        setTotalSubscribers(res.data.length || 0);
      })
      .catch((err) => {
        console.error("Failed to fetch total users:", err);
        setTotalUsers(0);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Welcome to the admin overview
        </p>
        <hr className="mt-4 border-gray-700" />
      </div>

      {/* Cards */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 md:px-6">
        <DashboardCard
          title="Total Users"
          value={loading ? null : totalUsers}
          icon={<Users size={28} />}
        />
        <DashboardCard
          title="Total Brokers"
          value={loading ? null : totalBrokers}
          icon={<UserSquare2 size={28} />}
        />
        <DashboardCard
          title="Total Blogs"
          value={loading ? null : totalBlogs}
          icon={<Notebook size={28} />}
        />
        <DashboardCard
          title="Total Leads"
          value={loading ? null : totalLeads}
          icon={<Users size={28} />}
        />
        <DashboardCard
          title="Total Subscribers"
          value={loading ? null : totalSubscribers}
          icon={<Users size={28} />}
        />
      </div>

      {/* ✅ Leads Graph Below */}
      <LeadsGraph />
    </div>
  );
}

// --- DashboardCard Component ---
function DashboardCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number | null;
  icon: React.ReactNode;
}) {
  return (
    <div className="w-full bg-gradient-to-br from-[#0d1b2a] to-[#1b263b] hover:shadow-lg transition-all border border-[#334155] rounded-xl p-4 sm:p-6 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-400 truncate">{title}</p>
        <div className="bg-[var(--primary)] text-white rounded-full p-2 shadow-inner">
          {icon}
        </div>
      </div>
      {value === null ? (
        <div className="w-24 h-6 bg-gray-700 animate-pulse rounded"></div>
      ) : (
        <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">
          {value}
        </h2>
      )}
    </div>
  );
}
