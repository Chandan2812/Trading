import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import { exportToDocx } from "../utils/exportDoc";
import { exportToExcel } from "../utils/exportToExcel";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [popupLeads, setPopupLeads] = useState([]);
  const [activePanel, setActivePanel] = useState("Users");
  const [emailerData, setEmailerData] = useState([]);
  const [chatbotData, setChatbotData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      .get("https://cft-b87k.onrender.com/emailer")
      .then((res) => {
        console.log("Emailer:", res.data);
        setEmailerData(res.data);
      })
      .catch((err) => console.error("Emailer error:", err));

    // Fetch Chatbot Data
    axios
      .get("https://cft-b87k.onrender.com/api/enquiry/chatbot")
      .then((res) => {
        console.log("Chatbot:", res.data);
        setChatbotData(res.data);
      })
      .catch((err) => console.error("Chatbot error:", err));
  }, []);

  const menuItems = [
    "Users",

    "Email Subscribers",
    "Popup Leads",
    "Chatbot Data",
    "Emailer Data",
    "Newsletter Data",
  ];

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 mt-32">
        <div className="flex flex-col md:flex-row gap-6">
          {/* SIDEBAR (Desktop Only) */}

          <aside className="w-full md:w-1/4 bg-white p-4 rounded shadow hidden md:block">
            <h2 className="text-xl font-semibold mb-4">Access Panel</h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
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

          {/* MAIN CONTENT */}
          <div className="w-full md:w-3/4">
            {/* MOBILE HEADER */}
            <div className="flex items-center justify-between md:hidden bg-white p-4 rounded shadow mb-4">
              <h2 className="text-xl font-semibold">Access Panel</h2>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center font-semibold"
              >
                {activePanel} {mobileMenuOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
              <ul className="mb-4 bg-white rounded shadow divide-y md:hidden">
                {menuItems.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        setActivePanel(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 ${
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
            )}

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
                          ["Name", "Email"],
                          ["fullName", "email"]
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
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: any) => (
                        <tr key={user._id}>
                          <td className="py-1">{user.fullName}</td>
                          <td className="py-1">{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {activePanel === "Newsletter Data" && (
                <section className="bg-white p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Newsletter Data</h2>
                    <div className="flex gap-4">
                      <a href="/newsletter">
                        <button className="border border-green-700 p-2 text-green-700 rounded-md hover:bg-green-700 hover:text-white">
                          Send Newsletter
                        </button>
                      </a>
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
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/6 break-words">Title</th>
                          <th className="pb-2 px-2 w-1/6 break-words">
                            Subject
                          </th>
                          <th className="pb-2 px-2 w-1/6 break-words">
                            Send Date
                          </th>
                          <th className="pb-2 px-2 w-1/6 break-words">
                            Button URL
                          </th>

                          <th className="pb-2 px-2 w-1/6 break-words">
                            Emails
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsletterData.map((item: any) => (
                          <tr key={item._id} className="border-b align-top">
                            <td className="py-2 px-2 break-words">
                              {item.title}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.content}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {new Date(item.sentAt).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.ctaUrl}
                            </td>

                            <td className="py-2 px-2 break-words">
                              {item.emails}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {newsletterData.map((item: any) => (
                      <div
                        key={item._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Title:</span>{" "}
                          {item.title}
                        </p>
                        <p>
                          <span className="font-semibold">Subject:</span>{" "}
                          {item.content}
                        </p>
                        <p>
                          <span className="font-semibold">Send Date:</span>{" "}
                          {new Date(item.sentAt).toLocaleDateString()}
                        </p>
                        <p>
                          <span className="font-semibold">Button URL:</span>{" "}
                          {item.ctaUrl}
                        </p>

                        <p>
                          <span className="font-semibold">Emails:</span>{" "}
                          {item.emails}
                        </p>
                      </div>
                    ))}
                  </div>
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
                <section className="bg-white p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Popup Leads</h2>
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

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/4 break-words">Name</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Email</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Phone</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {popupLeads.map((lead: any) => (
                          <tr key={lead._id} className="border-b align-top">
                            <td className="py-2 px-2 break-words">
                              {lead.fullName}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {lead.email}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {lead.phone}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {popupLeads.map((lead: any) => (
                      <div
                        key={lead._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {lead.fullName}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {lead.email}
                        </p>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {lead.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activePanel === "Emailer Data" && (
                <section className="bg-white p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Emailer Data</h2>
                    <div className="flex gap-4">
                      <a href="/emailer">
                        <button className="border border-green-700 p-2 text-green-700 rounded-md hover:bg-green-700 hover:text-white">
                          Send Emailer
                        </button>
                      </a>
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
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/5 break-words">Title</th>
                          <th className="pb-2 px-2 w-1/5 break-words">
                            Subject
                          </th>
                          <th className="pb-2 px-2 w-1/5 break-words">CTA</th>
                          <th className="pb-2 px-2 w-1/5 break-words">
                            Recipients
                          </th>
                          <th className="pb-2 px-2 w-1/5 break-words">
                            Created At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {emailerData.map((item: any) => (
                          <tr key={item._id} className="border-b align-top">
                            <td className="py-2 px-2 break-words">
                              {item.title}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.subject}
                            </td>
                            <td className="py-2 px-2 break-words">
                              <a
                                href={item.ctaUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 underline"
                              >
                                {item.ctaText}
                              </a>
                            </td>
                            <td className="py-2 px-2 break-words">
                              {item.recipients.join(", ")}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card Format */}
                  <div className="md:hidden space-y-4">
                    {emailerData.map((item: any) => (
                      <div
                        key={item._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p>
                          <span className="font-semibold">Title:</span>{" "}
                          {item.title}
                        </p>
                        <p>
                          <span className="font-semibold">Subject:</span>{" "}
                          {item.subject}
                        </p>
                        <p>
                          <span className="font-semibold">CTA:</span>{" "}
                          <a
                            href={item.ctaUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500 underline"
                          >
                            {item.ctaText}
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Recipients:</span>{" "}
                          {item.recipients.join(", ")}
                        </p>
                        <p>
                          <span className="font-semibold">Created At:</span>{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activePanel === "Chatbot Data" && (
                <section className="bg-white p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
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
                      className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Export to DOCX
                    </button>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/3">User Message</th>
                          <th className="pb-2 px-2 w-1/3">Bot Reply</th>
                          <th className="pb-2 px-2 w-1/3">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chatbotData.map((chat: any) => (
                          <tr key={chat._id} className="border-b align-top">
                            <td className="py-2 px-2 break-words">
                              {chat.userMessage}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {chat.botReply}
                            </td>
                            <td className="py-2 px-2 break-words">
                              {new Date(chat.timestamp).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card Format */}
                  <div className="md:hidden space-y-4">
                    {chatbotData.map((chat: any) => (
                      <div
                        key={chat._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p className="mb-1">
                          <span className="font-semibold">User:</span>{" "}
                          {chat.userMessage}
                        </p>
                        <p className="mb-1">
                          <span className="font-semibold">Bot:</span>{" "}
                          {chat.botReply}
                        </p>
                        <p>
                          <span className="font-semibold">Time:</span>{" "}
                          {new Date(chat.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
