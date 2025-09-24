import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // ✅ use Outlet + navigate
import Sidebar from "../../components/adminComponent/AdminSidebar";
import TopbarMobile from "../../components/adminComponent/AdminTopbar";

export default function AdminDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Auth check (optional, like your DashboardLayout)
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30">
        <TopbarMobile onToggleSidebar={() => setSidebarOpen(true)} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-[#0b121a] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:z-50`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col ">
        {/* Top padding for mobile (because Topbar is fixed) */}
        <div className="pt-16 md:pt-0 flex-1 overflow-y-auto">
          <main className="p-6 min-h-screen">
            <Outlet /> {/* ✅ nested route content will render here */}
          </main>
        </div>
      </div>
    </div>
  );
}
