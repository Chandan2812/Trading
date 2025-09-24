import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  FileText,
  User,
  Wallet,
  LineChart,
  Book,
  ArrowRightLeft,
  BarChart3,
  Globe,
  Settings,
  LogOut,
  BarChart2,
  MessageCircle,
  X,
} from "lucide-react";

import clsx from "clsx";
import logo from "../../assets/logo-01.svg";

export default function Sidebar({
  showSidebar = false,
  onClose,
}: {
  showSidebar?: boolean;
  onClose?: () => void;
}) {
  const location = useLocation();
  const pathname = location.pathname;

  const [open, setOpen] = useState({
    mt5: false,
    market: false,
    settings: false,
  });

  const navigate = useNavigate();

  const toggle = (section: keyof typeof open) =>
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // ✅ correct
  };

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-50 h-full w-64 bg-[#0b121a] text-white flex flex-col transition-transform duration-300 lg:translate-x-0",
        showSidebar ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo and Close (Mobile Only) */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        <img src={logo} alt="Billion Dollar FX" width={150} />
        <button
          onClick={onClose}
          className="lg:hidden text-white hover:text-gray-400"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 pb-16">
        {/* QUICK ACCESS */}
        <Section title="Quick Access">
          <NavLink
            href="/dashboard"
            label="Dashboard"
            icon={LayoutDashboard}
            pathname={pathname}
            onClose={onClose}
          />

          <Dropdown
            label="MT5 Accounts"
            icon={User}
            isOpen={open.mt5}
            onToggle={() => toggle("mt5")}
            items={[
              {
                label: "Live Accounts",
                href: "/dashboard/live-accounts",
                icon: FileText,
              },
            ]}
            pathname={pathname}
            onClose={onClose}
          />

          <NavLink
            href="/dashboard/web-trader"
            label="MT5 Web Trader"
            icon={Globe}
            pathname={pathname}
            onClose={onClose}
          />
          <NavLink
            href="/dashboard/Ourplatform"
            label="Platform"
            icon={BarChart3}
            pathname={pathname}
            onClose={onClose}
          />
        </Section>

        {/* FUNDS */}
        <Section title="Funds">
          <NavLink
            href="/dashboard/deposits"
            label="Deposits"
            icon={Wallet}
            pathname={pathname}
            onClose={onClose}
          />
          <NavLink
            href="/dashboard/withdrawals"
            label="Withdrawals"
            icon={ArrowRightLeft}
            pathname={pathname}
            onClose={onClose}
          />
          <NavLink
            href="/dashboard/transactions"
            label="Transactions"
            icon={BarChart2}
            pathname={pathname}
            onClose={onClose}
          />
        </Section>

        {/* RESOURCES */}
        <Section title="Resources & Insights">
          <NavLink
            href="/dashboard/forex-glossary"
            label="Forex Glossary"
            icon={Book}
            pathname={pathname}
            onClose={onClose}
          />
          <Dropdown
            label="Market Data"
            icon={LineChart}
            isOpen={open.market}
            onToggle={() => toggle("market")}
            items={[
              {
                label: "Live Market Rates",
                href: "/dashboard/live-markets-rates",
                icon: BarChart3,
              },
              {
                label: "News Feed",
                href: "/dashboard/top-news",
                icon: MessageCircle,
              },
              {
                label: "Forex Indicators",
                href: "/dashboard/indicators",
                icon: BarChart2,
              },
            ]}
            pathname={pathname}
            onClose={onClose}
          />
        </Section>

        {/* TOOLS */}
        <Section title="Tools & Add-Ons">
          <NavLink
            href="/dashboard/introducing-broker"
            label="Introducing Broker"
            icon={User}
            pathname={pathname}
            onClose={onClose}
          />
          <NavLink
            href="/dashboard/support"
            label="Support Tickets"
            icon={MessageCircle}
            pathname={pathname}
            onClose={onClose}
          />
        </Section>

        {/* PROFILE */}
        <Section title="Profile">
          <NavLink
            href="/dashboard/settings"
            label="Settings"
            icon={Settings}
            pathname={pathname}
            onClose={onClose}
          />
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1e293b] text-white/80 w-full cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </Section>
      </div>
    </div>
  );
}

// Section Component
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="text-sm uppercase text-gray-400 mb-2">{title}</p>
      {children}
    </div>
  );
}

// NavLink Component
function NavLink({
  href,
  label,
  icon: Icon,
  pathname,
  onClose,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  pathname: string;
  onClose?: () => void;
}) {
  const isActive = pathname === href;
  return (
    <Link
      to={href}
      onClick={() => onClose && onClose()}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 rounded hover:text-[var(--primary)] transition-all text-sm",
        isActive && "text-[var(--primary)] font-semibold"
      )}
    >
      <Icon size={16} />
      {label}
    </Link>
  );
}

// Dropdown Component
function Dropdown({
  label,
  icon: Icon,
  isOpen,
  onToggle,
  items,
  pathname,
  onClose,
}: {
  label: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string; icon: React.ElementType }[];
  pathname: string;
  onClose?: () => void;
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-2 rounded hover:text-[var(--primary)] transition-all text-sm"
      >
        <span className="flex items-center gap-2">
          <Icon size={16} />
          {label}
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {items.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              pathname={pathname}
              onClose={onClose}
            />
          ))}
        </div>
      )}
    </div>
  );
}
