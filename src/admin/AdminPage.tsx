import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Nav";
import { exportToExcel } from "../utils/exportToExcel";
import { ChevronDown, ChevronUp, Code, ImageIcon, Trash2 } from "lucide-react";
import { Edit, Trash } from "lucide-react";
import AddBlog from "../components/AddBlogs"; // adjust path if needed
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../index.css";
import YourOfferModalComponent from "../components/AddOffer"; // adjust path if needed
import { formatHtml } from "../utils/formatHtml";
import LeadsGraph from "../components/LeadsGraph";
import { FaBlog, FaEnvelope, FaUsers } from "react-icons/fa";
import Fuse from "fuse.js";
import "../App.css";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [newsletterData, setNewsletterData] = useState([]);
  const [emailSubscribers, setEmailSubscribers] = useState([]);
  const [popupLeads, setPopupLeads] = useState([]);
  const [activePanel, setActivePanel] = useState("Dashboard");
  const [emailerData, setEmailerData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showContentEditor, setShowContentEditor] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [subscriberFilterDate, setSubscriberFilterDate] = useState("");
  const [emailerFilterDate, setEmailerFilterDate] = useState("");
  const [blogSearchTerm, setBlogSearchTerm] = useState("");
  const [blogFilterDate, setBlogFilterDate] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [currentLeads, setCurrentLeads] = useState([]);

  const [currentLeadPage, setCurrentLeadPage] = useState(1);
  const leadsPerPage = 20;

  const totalLeadsPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const [expandedEmails, setExpandedEmails] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const indexOfLastLead = currentLeadPage * leadsPerPage;
    const indexOfFirstLead = indexOfLastLead - leadsPerPage;
    const sliced = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
    setCurrentLeads(sliced);
  }, [filteredLeads, currentLeadPage]);

  const postsPerPage = 20;

  const fuse = new Fuse(blogs, {
    keys: ["title", "author"],
    threshold: 0.4, // Adjust this for more/less fuzzy
  });

  const filteredFuseResults =
    blogSearchTerm.trim() === ""
      ? blogs
      : fuse.search(blogSearchTerm).map((result) => result.item);

  const filteredBlogs = filteredFuseResults.filter((blog: BlogPost) => {
    if (!blogFilterDate) return true;
    const publishedDate = new Date(blog.datePublished)
      .toISOString()
      .split("T")[0];
    return publishedDate === blogFilterDate;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [blogSearchTerm, blogFilterDate]);

  const navigate = useNavigate();

  interface BlogPost {
    _id: string;
    title: string;
    excerpt: string;
    author: string;
    datePublished: string;
    slug: string;
    content: string; // ✅ Add this line
  }

  interface Offer {
    _id: string;
    title: string;
    subtitle?: string;
    popupImage?: string;
    bannerImage?: string;
    ctaLabel?: string;
    ctaLink?: string;
    startDate?: string;
    endDate?: string;
    isActive: boolean;
  }

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["link", "image"],
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.email !== "admin@gmail.com") {
      navigate("/login");
    }
  }, []);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/auth/allUser`)
      .then((res) => {
        // console.log("Users:", res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error("Users error:", err));

    axios
      .get(`${baseURL}/newsletter`)
      .then((res) => {
        // console.log("Newsletter:", res.data);
        setNewsletterData(res.data);
      })
      .catch((err) => console.error("Newsletter error:", err));

    axios
      .get(`${baseURL}/subscribers`)
      .then((res) => {
        // console.log("Subscribers:", res.data);
        setEmailSubscribers(res.data);
      })
      .catch((err) => console.error("Subscribers error:", err));

    axios
      .get(`${baseURL}/api/popup-lead`)
      .then((res) => {
        // Filter only verified leads
        const verifiedLeads = res.data.filter(
          (lead: { isVerified: boolean }) => lead.isVerified === true
        );
        setPopupLeads(verifiedLeads);
        // console.log("Verified Leads:", verifiedLeads);
      })
      .catch((err) => console.error("Leads error:", err));

    // Fetch Emailer Data
    axios
      .get(`${baseURL}/emailer`)
      .then((res) => {
        // console.log("Emailer:", res.data);
        setEmailerData(res.data);
      })
      .catch((err) => console.error("Emailer error:", err));

    axios
      .get(`${baseURL}/api/blogs/viewblog`)
      .then((res) => {
        // console.log("Blogs:", res.data);
        setBlogs(res.data);
      })
      .catch((err) => console.error("Blogs error:", err));

    axios
      .get(`${baseURL}/api/offer/view`)
      .then((res) => setOffers(res.data))
      .catch((err) => console.error("Offers error:", err));
  }, []);

  const menuItems = [
    // "Users",

    "Dashboard",
    "Email Subscribers",
    "Popup Leads",
    "Emailer Data",
    "Newsletter Data",
    "Blog Data",
    "Offer Data",
  ];

  const fetchBlogs = () => {
    axios
      .get(`${baseURL}/api/blogs/viewblog`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Blogs error:", err));
  };

  const handleEdit = (slug: string) => {
    const blogToEdit = blogs.find((b: any) => b.slug === slug);
    if (blogToEdit) {
      setEditingBlog(blogToEdit);
      setShowAddModal(true);
    }
  };

  const handleUpdateImage = async () => {
    if (!selectedImage) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("coverImage", selectedImage);

    try {
      const res = await fetch(`${baseURL}/api/blogs/${editingSlug}/image`, {
        method: "PATCH",
        body: formData,
        // ❗ Don't set Content-Type manually for FormData, fetch handles it
      });

      if (!res.ok) {
        throw new Error("Failed to update image");
      }

      alert("Image updated successfully!");
      setShowImageModal(false);
      setSelectedImage(null);
      fetchBlogs(); // Refresh the blog list
    } catch (err) {
      console.error(err);
      alert("Failed to update image");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await axios.delete(`${baseURL}/api/blogs/${slug}`);
      alert(res.data.msg || "Deleted");
      fetchBlogs();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingBlog(null);
  };

  useEffect(() => {
    if (!filterDate) {
      setFilteredLeads(popupLeads);
      setCurrentLeadPage(1); // reset pagination
      return;
    }

    const selectedDate = new Date(filterDate).toDateString();

    const filtered = popupLeads.filter((lead: any) => {
      const leadDate = new Date(lead.createdAt).toDateString();
      return leadDate === selectedDate;
    });

    setFilteredLeads(filtered);
    setCurrentLeadPage(1); // reset pagination
  }, [filterDate, popupLeads]);

  const filteredSubscribers = subscriberFilterDate
    ? emailSubscribers.filter((sub: any) => {
        const subDate = new Date(sub.createdAt).toISOString().split("T")[0];
        return subDate === subscriberFilterDate;
      })
    : emailSubscribers;

  const filteredEmailerData = emailerFilterDate
    ? emailerData.filter(
        (item: any) =>
          new Date(item.createdAt).toLocaleDateString() ===
          new Date(emailerFilterDate).toLocaleDateString()
      )
    : emailerData;

  return (
    <div className="text-black dark:text-white">
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-black py-6 mt-20">
        <div className="flex flex-col md:flex-row gap-6">
          {/* SIDEBAR (Desktop Only) */}

          <aside className="fixed top-40 left-10 h-fit mt-2 w-64 bg-gray-100 dark:bg-neutral-900 p-4 shadow z-40 hidden md:block overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-[var(--primary-color)]">
              Access Panel
            </h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => setActivePanel(item)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      activePanel === item
                        ? "bg-neutral-200 dark:bg-neutral-800 font-semibold"
                        : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* MAIN CONTENT */}
          <div className="w-full mt-16 md:mt-12 md:ml-80 p-4 md:w-3/4">
            {/* MOBILE HEADER */}
            <div className="flex fixed top-20 left-0 w-full px-5  items-center justify-between md:hidden bg-gray-100  dark:bg-neutral-900 py-4 rounded shadow mb-4">
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
              <ul className="mb-4 bg-white text-black rounded shadow divide-y md:hidden">
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
              {activePanel === "Dashboard" && (
                <div className="p-6 text-white font-raleway">
                  {/* Top Stats Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Leads */}
                    <div className="bg-gradient-to-r from-purple-700 to-purple-500 rounded-xl p-6 shadow-lg flex items-center gap-4 hover:scale-[1.02] transition">
                      <div className="text-4xl text-white/80">
                        <FaUsers />
                      </div>
                      <div>
                        <p className="text-sm uppercase text-white/80">
                          Total Leads
                        </p>
                        <p className="text-3xl font-bold">
                          {popupLeads.length}
                        </p>
                      </div>
                    </div>

                    {/* Email Subscribers */}
                    <div className="bg-gradient-to-r from-pink-600 to-rose-400 rounded-xl p-6 shadow-lg flex items-center gap-4 hover:scale-[1.02] transition">
                      <div className="text-4xl text-white/80">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="text-sm uppercase text-white/80">
                          Subscribers
                        </p>
                        <p className="text-3xl font-bold">
                          {emailSubscribers.length}
                        </p>
                      </div>
                    </div>

                    {/* Blogs */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl p-6 shadow-lg flex items-center gap-4 hover:scale-[1.02] transition">
                      <div className="text-4xl text-white/80">
                        <FaBlog />
                      </div>
                      <div>
                        <p className="text-sm uppercase text-white/80">
                          Total Blogs
                        </p>
                        <p className="text-3xl font-bold">{blogs.length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Graph Section */}
                  <LeadsGraph />
                </div>
              )}

              {activePanel === "Users" && (
                <section className="bg-gray-100 dark:bg-neutral-900  p-4 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">User Logins</h2>
                    <button
                      onClick={() =>
                        exportToExcel(
                          "User Logins",
                          users,
                          ["Name", "Email", "Phone"],
                          ["fullName", "email", "Phone"]
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
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user: any) => (
                        <tr key={user._id}>
                          <td className="py-1">{user.fullName}</td>
                          <td className="py-1">{user.email}</td>
                          <td className="py-1">{user.Phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              {activePanel === "Newsletter Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
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
                          <tr key={item._id} className=" align-top">
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
                              {item.emails?.length > 0 && (
                                <>
                                  {(expandedEmails[item._id]
                                    ? item.emails
                                    : item.emails.slice(0, 4)
                                  ).join(", ")}
                                  {item.emails.length > 4 && (
                                    <button
                                      onClick={() =>
                                        setExpandedEmails((prev) => ({
                                          ...prev,
                                          [item._id]: !prev[item._id],
                                        }))
                                      }
                                      className="ml-2 text-blue-400 underline text-xs"
                                    >
                                      {expandedEmails[item._id]
                                        ? "Show Less"
                                        : "Show More"}
                                    </button>
                                  )}
                                </>
                              )}
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
                          {item.emails?.length > 0 && (
                            <>
                              {(expandedEmails[item._id]
                                ? item.emails
                                : item.emails.slice(0, 4)
                              ).join(", ")}
                              {item.emails.length > 4 && (
                                <button
                                  onClick={() =>
                                    setExpandedEmails((prev) => ({
                                      ...prev,
                                      [item._id]: !prev[item._id],
                                    }))
                                  }
                                  className="ml-2 text-blue-500 underline text-xs"
                                >
                                  {expandedEmails[item._id]
                                    ? "Show Less"
                                    : "Show More"}
                                </button>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activePanel === "Email Subscribers" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold mb-2">
                      Email Subscribers
                    </h2>
                    <button
                      onClick={() =>
                        exportToExcel(
                          `Email Subscribers${
                            subscriberFilterDate
                              ? ` ${subscriberFilterDate}`
                              : ""
                          }`,
                          filteredSubscribers,
                          ["Email", "Subscribed"],
                          ["email", "createdAt"]
                        )
                      }
                      className="p-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Export to Excel
                    </button>
                  </div>

                  {/* Filter by Date Input */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="flex-1">
                        <label className="text-sm block">Filter by Date</label>
                        <input
                          type="date"
                          value={subscriberFilterDate}
                          onChange={(e) =>
                            setSubscriberFilterDate(e.target.value)
                          }
                          className="border px-3 py-2 rounded w-full text-black"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          onClick={() => setSubscriberFilterDate("")}
                          className="px-3 py-2  bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Clear Filter
                        </button>
                      </div>
                    </div>
                  </div>

                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr>
                        <th className="border-b pb-1">Email</th>
                        <th className="border-b pb-1">Subscribed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubscribers.map((sub: any) => (
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
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center ">
                    <h2 className="text-xl font-semibold">Popup Leads</h2>
                    <button
                      onClick={() =>
                        exportToExcel(
                          `Popup Leads${filterDate ? ` ${filterDate}` : ""}`,
                          filteredLeads,
                          ["Name", "Email", "City", "Phone", "Segment", "Date"],
                          [
                            "fullName",
                            "email",
                            "city",
                            "phone",
                            "marketSegment",
                            "createdAt",
                          ]
                        )
                      }
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Export to Excel
                    </button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium py-2">
                        Filter by Date
                      </label>
                      <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="border px-3 py-2 rounded w-full text-black cursor-pointer"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => setFilterDate("")}
                        className=" px-3 py-2  bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Clear Filter
                      </button>
                    </div>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-fixed border-separate border-spacing-y-3">
                      <thead>
                        <tr className="border-b">
                          <th className="pb-2 px-2 w-1/4 break-words">Name</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Email</th>
                          <th className="pb-2 px-2 w-1/4 break-words">Phone</th>
                          <th className="pb-2 px-2 w-1/4 break-words">City</th>
                          <th className="pb-2 px-2 w-1/4 break-words">
                            Segment
                          </th>
                          <th className="pb-2 px-2 w-1/4 break-words">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentLeads.map((lead: any) => (
                          <tr key={lead._id}>
                            <td className="py-2 px-2">{lead.fullName}</td>
                            <td className="py-2 px-2 break-words truncate max-w-[200px]">
                              {lead.email}
                            </td>
                            <td className="py-2 px-2">{lead.phone}</td>
                            <td className="py-2 px-2">{lead.city}</td>
                            <td className="py-2 px-2">{lead.marketSegment}</td>
                            <td className="py-2 px-2">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {currentLeads.map((lead: any) => (
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
                          <span className="font-semibold">City:</span>{" "}
                          {lead.city}
                        </p>
                        <p>
                          <span className="font-semibold">Segment:</span>{" "}
                          {lead.marketSegment}
                        </p>
                        <p>
                          <span className="font-semibold">Date:</span>{" "}
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  {totalLeadsPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-6">
                      {/* Prev Button */}
                      <button
                        onClick={() =>
                          setCurrentLeadPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentLeadPage === 1}
                        className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
                      >
                        Prev
                      </button>

                      {/* First Page */}
                      {currentLeadPage > 2 && (
                        <>
                          <button
                            onClick={() => setCurrentLeadPage(1)}
                            className={`px-3 py-1 rounded ${
                              currentLeadPage === 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                            }`}
                          >
                            1
                          </button>
                          {currentLeadPage > 3 && (
                            <span className="px-2">...</span>
                          )}
                        </>
                      )}

                      {/* Current, Previous and Next */}
                      {[
                        currentLeadPage - 1,
                        currentLeadPage,
                        currentLeadPage + 1,
                      ].map((page) => {
                        if (page < 1 || page > totalLeadsPages) return null;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentLeadPage(page)}
                            className={`px-3 py-1 rounded ${
                              page === currentLeadPage
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      {/* Last Page */}
                      {currentLeadPage < totalLeadsPages - 1 && (
                        <>
                          {currentLeadPage < totalLeadsPages - 2 && (
                            <span className="px-2">...</span>
                          )}
                          <button
                            onClick={() => setCurrentLeadPage(totalLeadsPages)}
                            className={`px-3 py-1 rounded ${
                              currentLeadPage === totalLeadsPages
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                            }`}
                          >
                            {totalLeadsPages}
                          </button>
                        </>
                      )}

                      {/* Next Button */}
                      <button
                        onClick={() =>
                          setCurrentLeadPage((prev) =>
                            Math.min(prev + 1, totalLeadsPages)
                          )
                        }
                        disabled={currentLeadPage === totalLeadsPages}
                        className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 text-black dark:text-white disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </section>
              )}

              {activePanel === "Emailer Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
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
                            filteredEmailerData,
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

                  {/* Date Filter UI */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Filter by Date
                      </label>
                      <input
                        type="date"
                        value={emailerFilterDate}
                        onChange={(e) => setEmailerFilterDate(e.target.value)}
                        className="border px-3 py-2 rounded w-full text-black"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={() => setEmailerFilterDate("")}
                        className="px-3 py-2  bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Clear Filter
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
                        {filteredEmailerData.map((item: any) => (
                          <tr key={item._id} className="align-top">
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

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {filteredEmailerData.map((item: any) => (
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

              {activePanel === "Blog Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold ">Blogs</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      <input
                        type="text"
                        placeholder="Search by title, author or content"
                        value={blogSearchTerm}
                        onChange={(e) => setBlogSearchTerm(e.target.value)}
                        className="p-2 border rounded w-full  bg-transparent text-black dark:text-white"
                      />
                      <div className="relative">
                        <input
                          type="date"
                          value={blogFilterDate}
                          onChange={(e) => setBlogFilterDate(e.target.value)}
                          className="p-2 border rounded w-full  text-black bg-transparent dark:text-white"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-white pointer-events-none">
                          📅
                        </span>
                      </div>
                    </div>

                    <button
                      className="p-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => {
                        setEditingBlog(null);
                        setShowAddModal(true);
                      }}
                    >
                      Add Blog
                    </button>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-auto">
                    <table className="w-full text-left text-sm table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 whitespace-nowrap">Title</th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Content
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Author
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Published On
                          </th>
                          <th className="px-4 py-2 whitespace-nowrap">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentBlogs.map((blog: any) => (
                          <tr key={blog._id} className=" align-top">
                            <td className="px-4 py-2 w-1/5">{blog.title}</td>
                            <td
                              className="px-4 py-2 break-words max-w-[250px] cursor-pointer"
                              onClick={() => {
                                setSelectedBlog(blog);
                                setEditorContent(blog.content);
                                setShowContentEditor(true);
                              }}
                              dangerouslySetInnerHTML={{
                                __html:
                                  blog.content.length > 150
                                    ? blog.content.slice(0, 140) + "..."
                                    : blog.content,
                              }}
                            />

                            <td className="px-4 py-2 whitespace-nowrap">
                              {blog.author}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {new Date(blog.datePublished).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap space-x-2">
                              <button
                                onClick={() => handleEdit(blog.slug)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDelete(blog.slug)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                              <button
                                onClick={async () => {
                                  const formatted = formatHtml(blog.content);
                                  setHtmlContent(await formatted);
                                  setEditingSlug(blog.slug);
                                  setShowHtmlEditor(true);
                                }}
                                className="text-yellow-500 hover:text-yellow-600"
                              >
                                <Code size={16} />
                              </button>
                              <button
                                onClick={() => {
                                  setEditingSlug(blog.slug); // Store slug of the blog to update
                                  setShowImageModal(true); // Show modal
                                }}
                                className="text-purple-600 hover:text-purple-700"
                              >
                                <ImageIcon size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {blogs.map((blog: any) => (
                      <div
                        key={blog._id}
                        className="border rounded p-4 shadow-sm"
                      >
                        <p className="mb-1">
                          <strong>Title:</strong> {blog.title}
                        </p>
                        <p
                          className="mb-1 cursor-pointer"
                          onClick={() => {
                            setSelectedBlog(blog);
                            setEditorContent(blog.content);
                            setShowContentEditor(true);
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.content.length > 150
                                ? blog.content.slice(0, 140) + "..."
                                : blog.content,
                          }}
                        />

                        <p className="mb-1">
                          <strong>Author:</strong> {blog.author}
                        </p>
                        <p className="mb-1">
                          <strong>Published:</strong>{" "}
                          {new Date(blog.datePublished).toLocaleString()}
                        </p>
                        <div className="flex gap-4 mt-2">
                          <button
                            onClick={() => handleEdit(blog.slug)}
                            className="text-blue-600"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(blog.slug)}
                            className="text-red-600"
                          >
                            <Trash size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setHtmlContent(blog.content);
                              setEditingSlug(blog.slug);
                              setShowHtmlEditor(true);
                            }}
                            className="text-yellow-500 hover:text-yellow-600"
                          >
                            <Code size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingSlug(blog.slug); // Store slug of the blog to update
                              setShowImageModal(true); // Show modal
                            }}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <ImageIcon size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal */}
                  {showAddModal && (
                    <AddBlog
                      onClose={handleModalClose}
                      onSuccess={fetchBlogs}
                      existingBlog={editingBlog}
                    />
                  )}

                  {showContentEditor && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-auto">
                      <div className="relative bg-white text-black w-full max-w-3xl mx-4 my-12 p-6 rounded shadow">
                        <h3 className="text-lg font-semibold mb-4">
                          Edit Blog Content
                        </h3>

                        <ReactQuill
                          value={editorContent}
                          onChange={setEditorContent}
                          theme="snow"
                          className="mb-4 h-64 overflow-y-auto"
                          modules={{ toolbar: toolbarOptions }}
                        />

                        <div className="flex justify-end gap-3 mt-4">
                          <button
                            onClick={() => setShowContentEditor(false)}
                            className="px-4 py-2 bg-gray-300 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch(
                                  `${baseURL}/api/blogs/${selectedBlog?.slug}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      content: editorContent,
                                    }),
                                  }
                                );

                                if (!res.ok)
                                  throw new Error(
                                    "Failed to update blog content"
                                  );

                                setShowContentEditor(false);
                                fetchBlogs();
                              } catch (error) {
                                console.error(error);
                              }
                            }}
                            className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showHtmlEditor && (
                    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                      <div className="bg-white text-black rounded-lg p-6 w-full max-w-3xl shadow-xl relative">
                        <h2 className="text-xl font-bold mb-4">Edit Blog </h2>

                        <textarea
                          value={htmlContent}
                          onChange={(e) => setHtmlContent(e.target.value)}
                          className="w-full h-64 p-3 border border-gray-300 rounded resize-none font-mono text-sm"
                        />

                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => {
                              setShowHtmlEditor(false);
                              setHtmlContent("");
                              setEditingSlug(null);
                            }}
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={async () => {
                              if (!editingSlug) return;
                              try {
                                const res = await fetch(
                                  `${baseURL}/api/blogs/${editingSlug}`,
                                  {
                                    method: "PUT",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      content: htmlContent,
                                    }),
                                  }
                                );

                                if (!res.ok)
                                  throw new Error("Failed to update content");
                                alert("Blog updated successfully");
                                setShowHtmlEditor(false);
                                setHtmlContent("");
                                setEditingSlug(null);
                                fetchBlogs();
                              } catch (err) {
                                alert("Failed to save changes");
                                console.error(err);
                              }
                            }}
                            className="bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:opacity-90"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {showImageModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">
                          Update Cover Image
                        </h2>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setSelectedImage(e.target.files[0]);
                            }
                          }}
                          className="mb-4"
                        />

                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setShowImageModal(false)}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            disabled={loading}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpdateImage}
                            className={`px-4 py-2 text-white rounded ${
                              loading
                                ? "bg-blue-400"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                            disabled={loading}
                          >
                            {loading ? "Updating..." : "Update"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2 flex-wrap">
                      {[
                        1,
                        currentPage > 3 ? "..." : null,
                        currentPage > 2 ? currentPage - 1 : null,
                        currentPage !== 1 && currentPage !== totalPages
                          ? currentPage
                          : null,
                        currentPage < totalPages - 1 ? currentPage + 1 : null,
                        currentPage < totalPages - 2 ? "..." : null,
                        totalPages,
                      ]
                        .filter(
                          (item, i, self) =>
                            item !== null && self.indexOf(item) === i
                        )
                        .map((item, idx) =>
                          item === "..." ? (
                            <span
                              key={`ellipsis-${idx}`}
                              className="px-2 py-1 text-gray-500 select-none"
                            >
                              ...
                            </span>
                          ) : (
                            <button
                              key={item}
                              onClick={() => setCurrentPage(item as number)}
                              className={`px-3 py-1 rounded border ${
                                currentPage === item
                                  ? "bg-[var(--primary-color)] text-white"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            >
                              {item}
                            </button>
                          )
                        )}
                    </div>
                  )}
                </section>
              )}

              {activePanel === "Offer Data" && (
                <section className="bg-gray-100 dark:bg-neutral-900 p-4 md:p-6 rounded shadow mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Offers</h2>
                    <button
                      className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                      onClick={() => {
                        setEditingOffer(null);
                        setShowOfferModal(true);
                      }}
                    >
                      Add Offer
                    </button>
                  </div>

                  <div className="overflow-auto">
                    <table className="w-full text-left text-sm table-auto">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2">Title</th>
                          <th className="px-4 py-2">Subtitle</th>
                          <th className="px-4 py-2">Active</th>
                          <th className="px-4 py-2">Start</th>
                          <th className="px-4 py-2">End</th>
                          <th className="px-4 py-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {offers.map((offer) => (
                          <tr key={offer._id} className="border-t align-top">
                            <td className="px-4 py-2">{offer.title}</td>
                            <td className="px-4 py-2">{offer.subtitle}</td>
                            <td className="px-4 py-2">
                              {offer.isActive ? "Yes" : "No"}
                            </td>
                            <td className="px-4 py-2">
                              {offer.startDate?.slice(0, 10)}
                            </td>
                            <td className="px-4 py-2">
                              {offer.endDate?.slice(0, 10)}
                            </td>
                            <td className="px-4 py-2 space-x-2">
                              <button
                                onClick={() => {
                                  setEditingOffer(offer);
                                  setShowOfferModal(true);
                                }}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm("Delete this offer?")) {
                                    try {
                                      await axios.delete(
                                        `${baseURL}/api/offer/${offer._id}`
                                      );
                                      setOffers((prev) =>
                                        prev.filter((o) => o._id !== offer._id)
                                      );
                                    } catch (err) {
                                      alert("Delete failed");
                                    }
                                  }
                                }}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {showOfferModal && (
                    <YourOfferModalComponent
                      existingOffer={editingOffer}
                      onClose={() => {
                        setShowOfferModal(false);
                        setEditingOffer(null);
                      }}
                      onSuccess={() => {
                        axios
                          .get(`${baseURL}/api/offer/view`)
                          .then((res) => setOffers(res.data));
                      }}
                    />
                  )}
                </section>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
