import { useState, useEffect } from "react";
import ProfileImage from "./ProfileImage";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
const baseURL = import.meta.env.VITE_API_BASE_URL;

type BankDetailsFormFields = {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  iban: string;
  bankName: string;
  bankAddress: string;
};

type FieldConfig = {
  label: string;
  name: keyof BankDetailsFormFields;
  required: boolean;
  placeholder: string;
  description?: string;
};

export default function BankDetailsForm() {
  const [form, setForm] = useState<BankDetailsFormFields>({
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    iban: "",
    bankName: "",
    bankAddress: "",
  });

  const [originalForm, setOriginalForm] = useState<BankDetailsFormFields>(form); // To restore on cancel
  const [loading, setLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<string>("pending");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const email = JSON.parse(localStorage.getItem("user") || "{}").email;
      if (!email) return;

      try {
        const res = await axios.get(`${baseURL}/api/auth/user/${email}`);
        const userData = res.data;

        const userForm: BankDetailsFormFields = {
          accountHolderName: userData.accountHolderName || "",
          accountNumber: userData.accountNumber || "",
          ifscCode: userData.ifscCode || "",
          iban: userData.iban || "",
          bankName: userData.bankName || "",
          bankAddress: userData.bankAddress || "",
        };

        setForm(userForm);
        setOriginalForm(userForm); // Keep original
        setApprovalStatus(userData.bankApprovalStatus || "pending");

        // Enable edit if no data
        const hasData = Object.values(userForm).some((val) => val);
        setIsEditing(!hasData);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setOriginalForm(form); // Save current state
    setIsEditing(true);
  };

  const handleCancel = () => {
    setForm(originalForm); // Restore original values
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof BankDetailsFormFields)[] = [
      "accountHolderName",
      "accountNumber",
      "ifscCode",
      "bankName",
      "bankAddress",
    ];

    for (const field of requiredFields) {
      if (!form[field]) {
        alert("Please fill in all required fields.");
        return;
      }
    }

    const email = JSON.parse(localStorage.getItem("user") || "{}").email;
    if (!email) {
      alert("User email not found.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${baseURL}/api/auth/bank/${email}`, form);
      alert("Bank details saved successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fields: FieldConfig[] = [
    {
      label: "Account Holder Name",
      name: "accountHolderName",
      required: true,
      placeholder: "Enter account holder's name",
      description:
        "Enter your full legal name as it appears on your official identification.",
    },
    {
      label: "Account Number",
      name: "accountNumber",
      required: true,
      placeholder: "Enter account number",
    },
    {
      label: "IFSC/SWIFT Code",
      name: "ifscCode",
      required: true,
      placeholder: "Enter IFSC/SWIFT code",
    },
    { label: "IBAN", name: "iban", required: false, placeholder: "Enter IBAN" },
    {
      label: "Bank Name",
      name: "bankName",
      required: true,
      placeholder: "Enter bank name",
    },
    {
      label: "Bank Address",
      name: "bankAddress",
      required: true,
      placeholder: "Enter bank address",
    },
  ];

  return (
    <div className="space-y-6">
      <ProfileImage />

      <form
        className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg space-y-6 relative"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-1 text-white">
            Bank Details
          </h2>

          <div className="flex items-center space-x-3">
            {/* Bank Approval Status */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                approvalStatus === "approved"
                  ? "text-green-600 bg-green-600/20"
                  : "text-yellow-600 bg-yellow-600/20"
              }`}
            >
              {approvalStatus === "approved" ? "Bank Approved" : "Pending"}
            </span>

            {/* Edit / Cancel buttons */}
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="text-blue-400 hover:text-blue-700"
              >
                <FiEdit size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-400 hover:text-red-600 font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <hr className="border-gray-700" />

        {fields.map((field) => (
          <div
            key={field.name}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
          >
            <div className="space-y-1 md:col-span-1">
              <label className="text-white font-medium">
                {field.label}
                <span className="ml-1 text-xs bg-gray-700 text-white px-2 py-0.5 rounded">
                  {field.required ? "Required" : "Optional"}
                </span>
              </label>
              {field.description && (
                <p className="text-gray-400 text-sm">{field.description}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                name={field.name}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full bg-transparent border border-gray-700 px-4 py-2 rounded-md text-white ${
                  !isEditing ? "opacity-60 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
        ))}

        {isEditing && (
          <div className="flex justify-end mt-6 space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--primary)] cursor-pointer text-white px-6 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Bank Details"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
