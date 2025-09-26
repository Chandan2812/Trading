import { useEffect, useState } from "react";
import axios from "axios";
import ProfileImage from "./ProfileImage";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function ProfileForm() {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    accountType: "",
    address: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  // Fetch user from localStorage & backend
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const userEmail = parsedUser.email;
        setEmail(userEmail);

        // Fetch full profile from backend
        axios
          .get(`${baseURL}/api/auth/user/${userEmail}`)
          .then((res) => {
            const user = res.data;

            console.log(user);
            if (user) {
              setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                phone: user.phone || "",
                gender: user.gender || "",
                accountType: user.accountType || "",
                address: user.address || "",
                country: user.country || "",
                state: user.state || "",
                city: user.city || "",
                postalCode: user.postalCode || "",
              });
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user profile", err);
          });
      } catch (err) {
        console.error("Error parsing user from localStorage", err);
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${baseURL}/api/auth/update-profile/${email}`,
        formData
      );

      if (res.data?.success && res.data?.user) {
        alert("Profile updated successfully");

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="space-y-6">
      <ProfileImage />

      <form
        onSubmit={handleUpdate}
        className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold mb-1">Profile Info</h2>
        <hr className="border-gray-700 mb-4" />

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            name="fullName"
            required
            onChange={handleInputChange}
            value={formData.fullName}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Male", "Female", "Prefer Not to Say"].map((g) => (
              <label
                key={g}
                className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition ${
                  formData.gender === g
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : "bg-[#10151f] border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleInputChange}
                  className="hidden"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            readOnly
            value={formData.email}
            className="w-full p-2 rounded-md bg-gray-800 text-gray-400 border border-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            required
            onChange={handleInputChange}
            value={formData.phone}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Account Type */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Account Type <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4 flex-wrap">
            {["Individual", "Corporate"].map((type) => (
              <label
                key={type}
                className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition ${
                  formData.accountType === type
                    ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                    : "bg-[#10151f] border-gray-700 text-gray-300 hover:border-gray-500"
                }`}
              >
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  checked={formData.accountType === type}
                  onChange={handleInputChange}
                  className="hidden"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            required
            onChange={handleInputChange}
            value={formData.address}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
            rows={2}
          />
        </div>

        {/* Country, State, City */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["country", "state", "city"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1 capitalize">
                {field} <span className="text-red-500">*</span>
              </label>
              <input
                name={field}
                required
                onChange={handleInputChange}
                value={formData[field as keyof typeof formData]}
                className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          ))}
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Postal Code <span className="text-red-500">*</span>
          </label>
          <input
            name="postalCode"
            required
            onChange={handleInputChange}
            value={formData.postalCode}
            className="w-full p-2 rounded-md bg-[#10151f] border border-gray-700 text-white focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-[var(--primary)] hover:bg-opacity-80 transition text-white font-semibold px-6 py-2 rounded-md"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
