import { useState, useEffect, useRef } from "react";
import { FaComments, FaTimes } from "react-icons/fa";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [userDetailsCaptured, setUserDetailsCaptured] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<
    null | "Buy" | "Sell" | "Invest"
  >(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const storedUser = localStorage.getItem("user");
  let userObj: { fullName?: string } | null = null;

  if (storedUser) {
    try {
      userObj = JSON.parse(storedUser);
    } catch (e) {
      userObj = null;
    }
  }
  const toggleChat = () => {
    setOpen((prev) => !prev);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem("granth-chat-messages");
      const savedUserInfo = sessionStorage.getItem("granth-chat-userInfo");
      const savedUserDetailsCaptured = sessionStorage.getItem(
        "granth-chat-userDetailsCaptured"
      );
      const savedSelectedPurpose = sessionStorage.getItem(
        "granth-chat-purpose"
      );

      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages)) {
          setMessages(parsedMessages);
        }
      } else {
        const welcome = {
          sender: "bot" as const,
          text: `hii ${
            userObj?.fullName || "Guest"
          } 👋 Welcome to Close Friends Traders! May I know your name and email to assist you better?`,
        };
        setMessages([welcome]);
        sessionStorage.setItem(
          "granth-chat-messages",
          JSON.stringify([welcome])
        );
      }

      if (savedUserInfo) setUserInfo(JSON.parse(savedUserInfo));
      if (savedUserDetailsCaptured !== null)
        setUserDetailsCaptured(savedUserDetailsCaptured === "true");
      if (savedSelectedPurpose)
        setSelectedPurpose(savedSelectedPurpose as "Buy" | "Sell" | "Invest");
    } catch (err) {
      console.error("Error parsing chatbot session data. Resetting chat.", err);
      sessionStorage.clear();
      const welcome = {
        sender: "bot" as const,
        text: `hii ${
          userObj?.fullName || "Guest"
        } 👋 Welcome to Close Friends Traders! May I know your name and email to assist you better?`,
      };
      setMessages([welcome]);
      sessionStorage.setItem("granth-chat-messages", JSON.stringify([welcome]));
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?.fullName && parsedUser?.email) {
          setUserInfo({
            name: parsedUser.fullName,
            email: parsedUser.email,
          });
          setUserDetailsCaptured(true); // so bot doesn't ask for name/email
          const welcome = {
            sender: "bot" as const,
            text: `Hi ${parsedUser.fullName} 👋 Welcome back to Close Friends Traders!`,
          };
          setMessages([welcome]);
          sessionStorage.setItem(
            "granth-chat-messages",
            JSON.stringify([welcome])
          );
          return;
        }
      } catch (e) {
        console.error("Failed to parse user:", e);
      }
    }

    // Fallback if no user data
    const fallbackWelcome = {
      sender: "bot" as const,
      text: `Hi Guest 👋 Welcome to Close Friends Traders! May I know your name and email to assist you better?`,
    };
    setMessages([fallbackWelcome]);
    sessionStorage.setItem(
      "granth-chat-messages",
      JSON.stringify([fallbackWelcome])
    );
  }, []);

  // Keep sessionStorage in sync
  useEffect(() => {
    sessionStorage.setItem("granth-chat-messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    sessionStorage.setItem("granth-chat-userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    sessionStorage.setItem(
      "granth-chat-userDetailsCaptured",
      String(userDetailsCaptured)
    );
  }, [userDetailsCaptured]);

  useEffect(() => {
    if (selectedPurpose) {
      sessionStorage.setItem("granth-chat-purpose", selectedPurpose);
    }
  }, [selectedPurpose]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const trimmedInput = input.trim();
    const newUserMsg = { sender: "user" as const, text: trimmedInput };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setLoading(true);

    try {
      let botReply = "";

      if (!userDetailsCaptured) {
        const emailMatch = trimmedInput.match(
          /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
        );
        const namePart = trimmedInput.replace(emailMatch?.[0] || "", "").trim();

        if (!emailMatch || !namePart) {
          botReply =
            "❗ Please provide both your name and a valid email in one message.";
          setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
          return;
        }

        const name = namePart;
        const email = emailMatch[0];
        setUserInfo({ name, email });
        setUserDetailsCaptured(true);

        botReply = `Thanks ${name}! What are you looking to do today?`;
        setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);

        await fetch(`${baseURL}/api/enquiry/chatbot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: { name, email },
            message: trimmedInput,
            isLead: true,
            chatHistory: [...messages, newUserMsg],
          }),
        });

        return;
      }

      if (!selectedPurpose) return;

      const res = await fetch(`${baseURL}/api/enquiry/chatbot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userInfo,
          purpose: selectedPurpose,
          message: trimmedInput,
          chatHistory: [...messages, newUserMsg],
        }),
      });

      const data = await res.json();
      botReply =
        res.ok && data.reply
          ? data.reply
          : "Sorry, something went wrong. Please try again.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-24 right-6 z-50 p-4 rounded-full bg-[var(--primary-color)] text-white shadow-lg hover:scale-105 transition"
        onClick={toggleChat}
        aria-label="Toggle Chatbot"
      >
        {open ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-36 right-6 w-80 max-h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50">
          <div className="bg-[var(--primary-color)] text-white px-4 py-2 font-bold rounded-t-lg">
            Chat with Close Friends Traders
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

          {/* Purpose Selection */}
          {userDetailsCaptured && !selectedPurpose && (
            <div className="flex justify-around p-2 gap-2 flex-wrap border-t">
              {["Buy", "Sell", "Invest"].map((purpose) => (
                <button
                  key={purpose}
                  className="bg-[var(--primary-color)] text-white px-4 py-1 rounded-full text-sm"
                  onClick={async () => {
                    setSelectedPurpose(purpose as "Buy" | "Sell" | "Invest");

                    setMessages((prev) => [
                      ...prev,
                      { sender: "user", text: purpose },
                      {
                        sender: "bot",
                        text: `Got it! You're interested in ${purpose.toLowerCase()} trading. How can I assist you today?`,
                      },
                    ]);

                    await fetch(`${baseURL}/api/enquiry/chatbot`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        user: userInfo,
                        purpose,
                        message: purpose,
                        isLead: true,
                        chatHistory: messages,
                      }),
                    });
                  }}
                >
                  {purpose}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-2 flex border-t">
            <input
              type="text"
              className="flex-1 p-2 border rounded-l outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={
                !userDetailsCaptured
                  ? "e.g. John Doe john@example.com"
                  : "Type your message..."
              }
              disabled={loading || (userDetailsCaptured && !selectedPurpose)}
            />
            <button
              className="bg-[var(--primary-color)] text-white px-4 rounded-r"
              onClick={sendMessage}
              disabled={loading || (userDetailsCaptured && !selectedPurpose)}
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
