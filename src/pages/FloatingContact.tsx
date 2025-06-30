import { useState } from "react";
import { FaMoneyCheckAlt, FaMoneyBillWave, FaTools } from "react-icons/fa";

const contacts = [
  {
    id: "deposit",
    label: "Deposits",
    number: "+1 (236) 305-9090",
    href: "tel:+12363059090",
    icon: <FaMoneyCheckAlt />,
  },
  {
    id: "withdrawal",
    label: "Withdrawals",
    number: "+1 (236) 305-9092",
    href: "tel:+12363059092",
    icon: <FaMoneyBillWave />,
  },
  {
    id: "tech",
    label: "Tech Help",
    number: "+91 72309 41008",
    href: "tel:+917230941008",
    icon: <FaTools />,
  },
];

const FloatingContact = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-[9999] flex flex-col gap-2 pr-2">
      {contacts.map((item) => (
        <div
          key={item.id}
          className="group flex items-center justify-end relative"
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <a
            href={item.href}
            className="flex items-center bg-[var(--primary-color)] text-white p-3 rounded-l-full shadow-lg transition-all duration-300"
            title={item.label}
          >
            {item.icon}
          </a>
          <div
            className={`absolute right-full mr-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg shadow-md whitespace-nowrap transition-all duration-300 overflow-hidden ${
              hovered === item.id
                ? "opacity-100 max-w-[300px]"
                : "opacity-0 max-w-0"
            }`}
          >
            <p className="text-sm font-medium">
              {item.label}:{" "}
              <span className="hover:underline">{item.number}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingContact;
