import { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setOpen(!open);

  // Ref for the div at the bottom of messages list
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const knowledgeBase: { [key: string]: string } = {
    "how do i start":
      "To start trading with Close Friends Traders, visit our website, sign up, and follow the steps to download the Dabba Trading app and fund your account.",
    "how can i start":
      "To begin, register on Close Friends Traders and download our trading app. You can then log in and start trading with ease.",
    "start trading":
      "To start trading, register on our website, download the app, and fund your account. You're ready to go!",
    "what types of assets":
      "You can trade NSE, MCX, Forex, and Comex instruments on our app.",
    "what can i trade":
      "Our platform supports trading in commodities, stocks, and currency derivatives including NSE, MCX, and Forex.",
    "how can i withdraw":
      "Withdrawals are simple. Just go to the withdrawal section in our app and follow the instructions.",
    "withdraw money":
      "To withdraw money, open the app, go to the withdrawal section, and follow the steps provided.",
    "can i trade from anywhere":
      "Yes, our app allows you to trade from anywhere with an internet connection.",
    "is trading possible anywhere":
      "Yes! You can trade using your mobile or desktop from anywhere.",
    "customer support":
      "We provide 24/7 customer support. Please reach out via the Contact Us section on our website.",
    "support team":
      "Our support team is available 24/7. Visit the Contact Us page for assistance.",
    "trading hours":
      "Trading hours vary by asset class. Please refer to the app for accurate timings.",
    "what is dabba trading":
      "Dabba trading is an off-market trading method that operates outside of official exchanges. It is illegal in India but used by some brokers. We provide insights and services related to this system for educational and proprietary use.",
    "tell me about dabba trading":
      "Dabba trading is a form of unofficial trading outside regular stock exchanges. It's used by some traders but is not recognized by SEBI.",
    "close friends traders":
      "Close Friends Traders is a platform that allows simplified access to the Dabba trading ecosystem with support and education.",
    "what is close friends traders":
      "Close Friends Traders is a platform where you can access the Dabba Trading system, trade conveniently, and get dedicated support.",
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    for (const key in knowledgeBase) {
      if (lowerInput.includes(key)) {
        return knowledgeBase[key];
      }
    }
    return "I'm here to assist with Close Friends Traders or Dabba Trading. For other inquiries, please contact our support team.";
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const botReply = getBotResponse(input);
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[var(--primary-color)] text-white shadow-lg hover:scale-105 transition"
        onClick={toggleChat}
      >
        {open ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50">
          <div className="bg-[var(--primary-color)] text-white px-4 py-2 font-bold rounded-t-lg">
            Chat with Us
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm bg-gray-100">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto w-fit"
                    : "bg-white text-black self-start mr-auto w-fit border"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {/* Dummy div to scroll into view */}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 flex border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              disabled={loading}
            />
            <button
              className="bg-[var(--primary-color)] text-white px-4 rounded-r"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
