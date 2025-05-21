// components/Chatbot.tsx
import { useState } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { sender: "user", text: input };
    setMessages((prev: any) => [...prev, userMsg]);

    // Simulate bot response (replace this with API call)
    setTimeout(() => {
      const botMsg = {
        sender: "bot",
        text: ` How can I help further?`,
      };
      setMessages((prev: any) => [...prev, botMsg]);
    }, 500);

    setInput("");
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
          </div>
          <div className="p-2 flex border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
            />
            <button
              className="bg-[var(--primary-color)] text-white px-4 rounded-r"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
