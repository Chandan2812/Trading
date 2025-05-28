import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [popupLeads, setPopupLeads] = useState([]);
  const [activePanel, setActivePanel] = useState("Users");

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
                <h2 className="text-xl font-semibold mb-2">User Logins</h2>
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
              <section className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Newsletter Data</h2>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b pb-1">Subject</th>
                      <th className="border-b pb-1">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsletterData.map((item: any) => (
                      <tr key={item._id}>
                        <td className="py-1">{item.content}</td>
                        <td className="py-1">
                          {new Date(item.sentAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {activePanel === "Email Subscribers" && (
              <section className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">
                  Email Subscribers
                </h2>
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
                <h2 className="text-xl font-semibold mb-2">Popup Leads</h2>
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
          </main>
        </div>
      </div>
    </div>
  );
}
