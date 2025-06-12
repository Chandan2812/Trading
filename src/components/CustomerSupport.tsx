import React from "react";
import { Heart, Lightbulb, Headphones, Settings } from "lucide-react";

const supportItems = [
  {
    icon: <Heart className="w-10 h-10 text-[var(--primary-color)]" />,
    title: "24/7 Multilanguages Support",
    description:
      "Our dedicated customer service team is ready to assist you 24/7 in English,Hindi, Gujrati, Marathi,Telgue.",
  },
  {
    icon: <Lightbulb className="w-10 h-10 text-[var(--primary-color)]" />,
    title: "Market Insight Assistance",
    description:
      "Receive real-time sentiment on the latest market trends and updates from our in-house market experts. Make informed decisions with our superior customer support.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-[var(--primary-color)]" />,
    title: "Our Team",
    description:
      "Clients can connect directly to our experienced support agents about trading and non-trading queries via phone or email.",
  },
  {
    icon: <Settings className="w-10 h-10 text-[var(--primary-color)]" />,
    title: "Technical Support",
    description:
      "Clients can connect directly to our experienced support agents about trading and non-trading queries via phone or email.",
  },
];

const CustomerSupport: React.FC = () => {
  return (
    <div className="bg-white dark:bg-black transition-colors duration-300">
      <section className="text-center py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-black dark:text-white">
          Customer support you can count on
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {supportItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 dark:bg-neutral-900 p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerSupport;
