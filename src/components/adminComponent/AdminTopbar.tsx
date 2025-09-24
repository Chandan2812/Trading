import { Menu } from "lucide-react";

export default function TopbarMobile({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  return (
    <header className="h-16 bg-[#121e2c] text-white flex items-center justify-between px-4 shadow-md md:hidden">
      <button onClick={onToggleSidebar}>
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-semibold">Admin Panel</h1>
      <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center text-sm font-bold">
        A
      </div>
    </header>
  );
}
