import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import { exportToDocx } from "../utils/exportDoc";
import { exportToExcel } from "../utils/exportToExcel";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [popupLeads, setPopupLeads] = useState([]);
  const [activePanel, setActivePanel] = useState("Users");
  const [emailerData, setEmailerData] = useState([]);
  const [chatbotData, setChatbotData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email !== "admin@gmail.com") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://cft-b87k.onrender.com/api/auth/allUser")
      .then((res) => {
        console.log("Users:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Users error:", err));

    axios
      .get("https://cft-b87k.onrender.com/newsletter")
      .then((res) => {
        console.log("Newsletter:", res.data);
        setNewsletterData(res.data);
      })
      .catch((err) => console.error("Newsletter error:", err));

    axios
      .get("https://cft-b87k.onrender.com/subscribers")
      .then((res) => {
        console.log("Subscribers:", res.data);
        setEmailSubscribers(res.data);
      })
      .catch((err) => console.error("Subscribers error:", err));

    axios
      .get("https://cft-b87k.onrender.com/api/popup-lead")
      .then((res) => {
        console.log("Leads:", res.data);
        setPopupLeads(res.data);
      })
      .catch((err) => console.error("Leads error:", err));

    // Fetch Emailer Data
    axios
      .get("http://localhost:8000/emailer")
      .then((res) => {
        console.log("Emailer:", res.data);
        setEmailerData(res.data);
      })
      .catch((err) => console.error("Emailer error:", err));

    // Fetch Chatbot Data
    axios
      .get("http://localhost:8000/api/enquiry/chatbot")
      .then((res) => {
        console.log("Chatbot:", res.data);
        setChatbotData(res.data);
      })
      .catch((err) => console.error("Chatbot error:", err));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 mt-32">
        <div className="flex gap-6">
          <aside className="w-1/4 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Access Panel</h2>
            <ul className="space-y-2">
              {[
                "Users",
                "Newsletter Data",
                "Email Subscribers",
                "Popup Leads",
                "Emailer Data",
                "Chatbot Data",
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActivePanel(item)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      activePanel === item
                        ? "bg-blue-200 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          <main className="flex-1">
            {activePanel === "Users" && (
              <section className="bg-white p-4 rounded shadow mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold">User Logins</h2>
                  <button
                    onClick={() =>
                      exportToExcel(
                        "User Logins",
                        users,
                        ["Name", "Email", "Logins"],
                        ["fullName", "email", "logins"]
                      )
                    }
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Export to Excel
                  </button>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">Name</th>
                      <th className="border-b pb-1">Email</th>
                      <th className="border-b pb-1">Logins</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any) => (
                      <tr key={user._id}>
                        <td className="py-1">{user.fullName}</td>
                        <td className="py-1">{user.email}</td>
                        <td className="py-1">{user.logins || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activePanel === "Newsletter Data" && (
              <section className="bg-white p-10 rounded shadow mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold mb-2">
                    Newsletter Data
                  </h2>
                  <button
                    onClick={() =>
                      exportToExcel(
                        "Email Subscribers",
                        newsletterData,
                        [
                          "title",
                          "Subject",
                          "Send Date",
                          "Button Url",
                          "Status",
                          "Emails",
                        ],
                        [
                          "title",
                          "content",
                          "sentAt",
                          "ctaUrl",
                          "sent",
                          "emails",
                        ]
                      )
                    }
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Export to Excel
                  </button>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">title</th>
                      <th className="border-b pb-1">Subject</th>
                      <th className="border-b pb-1">Send Date</th>
                      <th className="border-b pb-1">Button Url</th>
                      <th className="border-b pb-1">Status</th>
                      <th className="border-b pb-1">Emails</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletterData.map((item: any) => (
                      <tr key={item._id}>
                        <td className="py-1">{item.title}</td>
                        <td className="py-1">{item.content}</td>
                        <td className="py-1">
                          {new Date(item.sentAt).toLocaleDateString()}
                        </td>
                        <td className="py-1">{item.ctaUrl}</td>
                        <td className="py-1">{item.sent}</td>
                        <td className="py-1">{item.emails}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activePanel === "Email Subscribers" && (
              <section className="bg-white p-4 rounded shadow mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold mb-2">
                    Email Subscribers
                  </h2>
                  <button
                    onClick={() =>
                      exportToExcel(
                        "Email Subscribers",
                        popupLeads,
                        ["Email", "Subscribed"],
                        ["email", "createdAt"]
                      )
                    }
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Export to Excel
                  </button>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">Email</th>
                      <th className="border-b pb-1">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailSubscribers.map((sub: any) => (
                      <tr key={sub._id}>
                        <td className="py-1">{sub.email}</td>
                        <td className="py-1">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activePanel === "Popup Leads" && (
              <section className="bg-white p-4 rounded shadow mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold mb-2">Popup Leads</h2>
                  <button
                    onClick={() =>
                      exportToExcel(
                        "Popup Leads",
                        popupLeads,
                        ["Name", "Email", "Phone", "Date"],
                        ["fullName", "email", "phone", "createdAt"]
                      )
                    }
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Export to Excel
                  </button>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">Name</th>
                      <th className="border-b pb-1">Email</th>
                      <th className="border-b pb-1">Phone</th>
                      <th className="border-b pb-1">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {popupLeads.map((lead: any) => (
                      <tr key={lead._id}>
                        <td className="py-1">{lead.fullName}</td>
                        <td className="py-1">{lead.email}</td>
                        <td className="py-1">{lead.phone}</td>
                        <td className="py-1">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activePanel === "Emailer Data" && (
              <section className="bg-white p-4 rounded shadow mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold mb-2">Emailer Data</h2>
                  <button
                    onClick={() =>
                      exportToExcel(
                        "Emailer Data",
                        emailerData,
                        [
                          "Title",
                          "Subject",
                          "CTA Text",
                          "CTA URL",
                          "Recipients",
                          "Created At",
                        ],
                        [
                          "title",
                          "subject",
                          "ctaText",
                          "ctaUrl",
                          "recipients",
                          "createdAt",
                        ]
                      )
                    }
                    className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Export to Excel
                  </button>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">Title</th>
                      <th className="border-b pb-1">Subject</th>
                      <th className="border-b pb-1">CTA</th>
                      <th className="border-b pb-1">Recipients</th>
                      <th className="border-b pb-1">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailerData.map((item: any) => (
                      <tr key={item._id}>
                        <td className="py-1">{item.title}</td>
                        <td className="py-1">{item.subject}</td>
                        <td className="py-1">
                          <a
                            href={item.ctaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                          >
                            {item.ctaText}
                          </a>
                        </td>
                        <td className="py-1">{item.recipients.join(", ")}</td>
                        <td className="py-1">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activePanel === "Chatbot Data" && (
              <section className="bg-white p-4 rounded shadow mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold mb-2">
                    Chatbot Conversations
                  </h2>
                  <button
                    onClick={() =>
                      exportToDocx(
                        "Chatbot Data",
                        chatbotData,
                        ["User Message", "Bot Reply", "Timestamp"],
                        ["userMessage", "botReply", "timestamp"]
                      )
                    }
                    className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Export to DOCX
                  </button>
                </div>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">User Message</th>
                      <th className="border-b pb-1">Bot Reply</th>
                      <th className="border-b pb-1">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatbotData.map((chat: any) => (
                      <tr key={chat._id}>
                        <td className="py-1 max-w-xs break-words">
                          {chat.userMessage}
                        </td>
                        <td className="py-1 max-w-md break-words">
                          {chat.botReply}
                        </td>
                        <td className="py-1">
                          {new Date(chat.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
