import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../../components/Button";
const baseURL = import.meta.env.VITE_API_BASE_URL;

interface Ticket {
  _id: string;
  category: string;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  unreadByUser?: number; // 👈 added
}

interface Message {
  _id: string;
  senderType: "User" | "Admin";
  message: string;
  createdAt: string;
}

export default function Support() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [newTicket, setNewTicket] = useState({
    category: "",
    subject: "",
    description: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 6;

  const [showModal, setShowModal] = useState(false);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showModal) scrollToBottom();
  }, [messages, showModal]);

  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem("user") || "{}").email;
    if (!storedEmail) {
      alert("User email not found.");
      return;
    }
    setEmail(storedEmail);
  }, []);

  useEffect(() => {
    if (!email) return;
    axios
      .get(`${baseURL}/api/tickets/${email}`)
      .then((res) => {
        const sorted = res.data.sort(
          (a: Ticket, b: Ticket) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setTickets(sorted);
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, [email]);

  const handleCreateTicket = () => {
    const { category, subject, description } = newTicket;
    if (!category || !subject || !description) {
      alert("All fields required.");
      return;
    }
    setLoading(true);
    axios
      .post(`${baseURL}/api/tickets/${email}`, newTicket)
      .then((res) => {
        setTickets((prev) => [res.data, ...prev]);
        setNewTicket({ category: "", subject: "", description: "" });
        setCurrentPage(1);
      })
      .catch((err) =>
        alert("Error creating ticket: " + err.response?.data?.message || err)
      )
      .finally(() => setLoading(false));
  };

  const openTicketModal = (ticket: Ticket) => {
    setActiveTicket(ticket);
    fetchMessages(ticket._id);

    // Reset unread count locally so badge disappears immediately
    setTickets((prev) =>
      prev.map((t) => (t._id === ticket._id ? { ...t, unreadByUser: 0 } : t))
    );

    setShowModal(true);
  };

  const fetchMessages = (ticketId: string) => {
    axios
      .get(`${baseURL}/api/tickets/one/${ticketId}?viewer=User`)
      .then((res) => {
        setMessages(res.data.messages);
      })
      .catch((err) => {
        alert("Failed to fetch messages.");
        console.error(err);
      });
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !activeTicket) return;

    axios
      .post(`${baseURL}/api/tickets/${activeTicket._id}/messages`, {
        senderType: "User",
        message: newMessage,
      })
      .then(() => {
        setNewMessage("");
        fetchMessages(activeTicket._id);
      })
      .catch((err) => {
        alert("Failed to send message.");
        console.error(err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setActiveTicket(null);
    setMessages([]);
    setNewMessage("");
  };

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const statusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-red-600";
      case "Pending":
        return "bg-yellow-600";
      case "Closed":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  // Count tickets that are Open or Pending
  const activeTicketsCount = tickets.filter(
    (t) => t.status === "Open" || t.status === "Pending"
  ).length;

  return (
    <div className="min-h-screen bg-black text-white p-6 font-raleway">
      <div className="grid md:grid-cols-2 gap-6">
        {/* CREATE TICKET */}
        <div className="bg-[#121a2a] p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Create a New Ticket</h2>
          <select
            value={newTicket.category}
            onChange={(e) =>
              setNewTicket({ ...newTicket, category: e.target.value })
            }
            className="w-full bg-[#0d1b2a] border border-gray-700 p-2 rounded mb-3"
          >
            <option value="">Select Category</option>
            <option value="Deposit/Withdrawal">Deposit/Withdrawal</option>
            <option value="Account-verification">Account-verification</option>
            <option value="MT5 Support">MT5 Support</option>
            <option value="IB Commission">IB Commission</option>
            <option value="Bonous&Other Promotion">
              Bonous & Other Promotion
            </option>
            <option value="Others">Others</option>
          </select>
          <input
            type="text"
            placeholder="Subject"
            value={newTicket.subject}
            onChange={(e) =>
              setNewTicket({ ...newTicket, subject: e.target.value })
            }
            className="w-full bg-[#0d1b2a] border border-gray-700 p-2 rounded mb-3"
          />
          <textarea
            placeholder="Describe your issue..."
            value={newTicket.description}
            onChange={(e) =>
              setNewTicket({ ...newTicket, description: e.target.value })
            }
            className="w-full bg-[#0d1b2a] border border-gray-700 p-2 rounded mb-4 h-28"
          ></textarea>
          <Button
            onClick={handleCreateTicket}
            disabled={activeTicketsCount >= 2} // ✅ Disable if 2 or more active tickets
            text={
              loading
                ? "Submitting..."
                : activeTicketsCount >= 2
                  ? "Limit Reached"
                  : "Submit Ticket"
            }
          />
        </div>

        {/* TICKET LIST */}
        <div className="bg-[#121a2a] p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">My Tickets</h2>
          {currentTickets.length === 0 ? (
            <p className="text-gray-400">No tickets yet.</p>
          ) : (
            <ul className="space-y-3">
              {currentTickets.map((ticket) => (
                <li
                  key={ticket._id}
                  onClick={() => openTicketModal(ticket)}
                  className="p-3 border border-gray-700 rounded hover:bg-[#2a2a45] cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ticket.subject}</span>
                      {Number(ticket.unreadByUser) > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {ticket.unreadByUser}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusBadge(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {ticket.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-[var(--primary)] text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && activeTicket && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center px-4">
          <div className="bg-[#121a2a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
              <div>
                <h3 className="text-lg font-semibold">
                  {activeTicket.subject}
                </h3>
                <p className="text-sm text-gray-400">
                  Category: {activeTicket.category}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.length === 0 ? (
                <p className="text-gray-500">No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`${
                      msg.senderType === "Admin" ? "text-left" : "text-right"
                    }`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.senderType === "Admin" ? "BillionDollarFX" : "You"}{" "}
                      <br />
                      <span className="text-gray-500 text-xs">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="inline-block py-2 px-3 bg-gray-800 rounded text-white max-w-[80%]">
                      {msg.message}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            {activeTicket.status !== "Closed" && (
              <div className="p-4 border-t border-gray-700 flex items-center gap-2">
                <textarea
                  rows={2}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-black border border-gray-600 rounded p-2 text-white resize-none"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[var(--primary)] px-4 py-2 rounded text-white"
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
