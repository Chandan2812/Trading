import { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChat = () => setOpen(!open);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user" as const, text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://cft-b87k.onrender.com/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (res.ok) {
        const botReply = data.reply || "Sorry, I couldn't understand that.";
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Error: " + data.error },
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Server error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-20 right-6 z-50 p-4 rounded-full bg-[var(--primary-color)] text-white shadow-lg hover:scale-105 transition"
        onClick={toggleChat}
        aria-label="Toggle Chatbot"
      >
        {open ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-36 right-6 w-80 max-h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50">
          <div className="bg-[var(--primary-color)] text-white px-4 py-2 font-bold rounded-t-lg">
            Chat with Mondus Properties
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-sm bg-gray-100">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md ${
                  msg.sender === "user"
                    ? "bg-[var(--primary-color)] text-white self-end ml-auto w-fit"
                    : "bg-white text-black self-start mr-auto w-fit border"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 flex border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
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
