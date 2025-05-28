import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [popupLeads, setPopupLeads] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email !== "admin@example.com") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://cft-b87k.onrender.com/api/auth/allUser")
      .then((res) => setUsers(res.data));
    axios
      .get("https://cft-b87k.onrender.com/newsletter")
      .then((res) => setNewsletterData(res.data));
    axios
      .get("https://cft-b87k.onrender.com/subscribers")
      .then((res) => setEmailSubscribers(res.data));
    axios
      .get("https://cft-b87k.onrender.com/api/popup-lead")
      .then((res) => setPopupLeads(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <nav className="space-x-6">
          <a href="#" className="text-gray-700 hover:underline">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:underline">
            Settings
          </a>
          <a href="#" className="text-gray-700 hover:underline">
            Profile
          </a>
        </nav>
      </div>
      <div className="flex gap-6">
        <aside className="w-1/4 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Access Panel</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block px-2 py-1 bg-gray-200 rounded">
                Users
              </a>
            </li>
            <li>
              <a href="#" className="block px-2 py-1 hover:bg-gray-100 rounded">
                Newsletter Data
              </a>
            </li>
            <li>
              <a href="#" className="block px-2 py-1 hover:bg-gray-100 rounded">
                Email Subscribers
              </a>
            </li>
            <li>
              <a href="#" className="block px-2 py-1 hover:bg-gray-100 rounded">
                Popup Leads
              </a>
            </li>
          </ul>
        </aside>
        <main className="flex-1 grid grid-cols-2 gap-6">
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">User Logins</h2>
            <table className="w-full text-left">
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
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Newsletter Data</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b pb-1">Subject</th>
                  <th className="border-b pb-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {newsletterData.map((item: any) => (
                  <tr key={item._id}>
                    <td className="py-1">{item.subject}</td>
                    <td className="py-1">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Email Subscribers</h2>
            <table className="w-full text-left">
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
                      {new Date(sub.subscribed).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Popup Leads</h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b pb-1">Name</th>
                  <th className="border-b pb-1">Email</th>
                  <th className="border-b pb-1">Date</th>
                </tr>
              </thead>
              <tbody>
                {popupLeads.map((lead: any) => (
                  <tr key={lead._id}>
                    <td className="py-1">{lead.name}</td>
                    <td className="py-1">{lead.email}</td>
                    <td className="py-1">
                      {new Date(lead.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}
