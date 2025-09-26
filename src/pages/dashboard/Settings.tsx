import { useState } from "react";
import ProfileForm from "../../components/settings/ProfileForm";
import IdentityVerification from "../../components/settings/IdentityVerification";
import SecurityForm from "../../components/settings/SecurityForm";
import BankDetailsForm from "../../components/settings/BankDetailsForm";

const tabs = [
  { key: "profile", label: "Profile Info" },
  { key: "identity", label: "Identity-Verification" },
  { key: "security", label: "Security" },
  { key: "bank", label: "Bank Details" },
];

export default function Setting() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm />;
      case "identity":
        return <IdentityVerification />;
      case "security":
        return <SecurityForm />;
      case "bank":
        return <BankDetailsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white md:p-6 font-raleway">
      <h1 className="sticky md:top-10 text-2xl font-bold mb-6">Settings</h1>

      {/* Mobile Tabs at Top */}
      <div className="md:hidden mb-4 grid grid-cols-2 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab.key
                ? "bg-[var(--primary)] text-white"
                : "bg-[#121a2a] text-gray-200 hover:bg-[var(--bg)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* LEFT MENU (Desktop) */}
        <div className="hidden md:block md:w-64">
          <div className="sticky top-20 bg-[#121a2a] rounded-lg p-4 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`block w-full text-left px-4 py-2 rounded-md mb-2 font-medium transition ${
                  activeTab === tab.key
                    ? "bg-[var(--primary)] text-white"
                    : "hover:bg-[var(--bg)] text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] p-3 md:p-6 rounded-lg shadow-lg min-h-[80vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
