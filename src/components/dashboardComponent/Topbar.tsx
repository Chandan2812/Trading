import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, Maximize, Minimize } from "lucide-react";

export default function Topbar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.fullName || "U");
      } catch {
        setUserName("U");
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // 👈 redirect
  };

  return (
    <header className="h-16 w-full bg-[#121e2c] text-white flex items-center justify-between px-4 md:px-6 shadow z-40">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="lg:hidden text-white">
          <Menu size={24} />
        </button>
        <span className="font-semibold text-lg hidden sm:inline">
          Welcome Back!
        </span>
      </div>

      <div className="flex items-center gap-4 relative">
        <button
          title="Fullscreen"
          onClick={() =>
            !document.fullscreenElement
              ? document.documentElement.requestFullscreen()
              : document.exitFullscreen()
          }
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>

        <div className="relative">
          <button
            className="flex items-center justify-center bg-[var(--primary-color)] text-white w-8 h-8 rounded-full text-sm font-bold"
            onClick={() => setOpenUserMenu((prev) => !prev)}
          >
            {userName.charAt(0).toUpperCase()}
          </button>
          {openUserMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-[#121E2C] text-white rounded shadow z-50">
              <button
                onClick={() => navigate("/dashboard/settings")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black"
              >
                Profile
              </button>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
