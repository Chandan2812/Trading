import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom"; // ✅ import Outlet
import Topbar from "../../components/dashboardComponent/Topbar";
import Sidebar from "../../components/dashboardComponent/Sidebar";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar
        showSidebar={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="h-16 fixed top-0 left-0 lg:left-64 right-0 z-40 bg-[#121e2c] text-white">
          <Topbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        </header>

        <main className="mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-6 bg-[#000000]">
          <Outlet /> {/* ✅ nested route content will render here */}
        </main>
      </div>
    </div>
  );
}
