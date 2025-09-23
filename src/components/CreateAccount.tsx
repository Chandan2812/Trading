import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function RegisterModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    mobile: "",
    Password: "",
    curr: "USD",
    actype: "LIVE",
    Utype: "CLIENT",
    Ref: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);

      const [first, ...rest] = user.fullName.split(" ");
      const last = rest.join(" ");

      setFormData((prev) => ({
        ...prev,
        Fname: first,
        Lname: last,
        email: user.email || "",
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResponseMsg("");

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(formData.Password)) {
      setResponseMsg(
        "❌ Password must include uppercase, lowercase, number, special character, and be 8+ characters long."
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/moneyplant/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (result) {
        setResponseMsg(`✅ ${result.message}`);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setResponseMsg(`❌ ${result.message || "Registration failed"}`);
      }
    } catch (error) {
      setResponseMsg("❌ API Error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white  text-black  rounded-xl shadow-lg p-6 w-full max-w-md transition-colors duration-300">
          <Dialog.Title className="text-xl font-bold mb-4">
            Create Account
          </Dialog.Title>

          <div className="grid grid-cols-1 gap-4 text-sm">
            {/* First Name & Last Name */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  name="Fname"
                  value={formData.Fname}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  name="Lname"
                  value={formData.Lname}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Email & Password */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <PhoneInput
                country={"us"}
                value={formData.mobile}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, mobile: value }))
                }
                inputStyle={{ width: "100%" }}
                containerStyle={{ width: "100%" }}
                inputClass="text-sm"
              />
            </div>

            {/* Currency & Account Type */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Currency</label>
                <input
                  type="text"
                  name="curr"
                  value={formData.curr}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Account Type</label>
                <input
                  type="text"
                  name="actype"
                  value={formData.actype}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            {/* User Type & Referral */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block mb-1 font-medium">User Type</label>
                <input
                  type="text"
                  name="Utype"
                  value={formData.Utype}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Referral Code</label>
                <input
                  type="text"
                  name="Ref"
                  value={formData.Ref}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-4 w-full bg-[var(--primary)] text-white py-2 rounded hover:brightness-110 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {responseMsg && (
            <p className="mt-2 text-sm text-center">{responseMsg}</p>
          )}

          <button
            onClick={onClose}
            className="mt-3 text-sm text-[var(--primary)] underline block mx-auto hover:opacity-80"
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
