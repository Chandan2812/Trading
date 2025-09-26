import { useState } from "react";
import ProfileImage from "./ProfileImage";
import axios from "axios";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function SecurityForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [touched, setTouched] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const [loading, setLoading] = useState(false);

  const email = JSON.parse(localStorage.getItem("user") || "{}").email;

  const passwordRules = {
    length: form.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(form.newPassword),
    lowercase: /[a-z]/.test(form.newPassword),
    digit: /\d/.test(form.newPassword),
    special: /[^A-Za-z0-9]/.test(form.newPassword),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);
  const isMatching = form.newPassword === form.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "newPassword") {
      setTouched((prev) => ({ ...prev, newPassword: true }));
    }
    if (e.target.name === "confirmPassword") {
      setTouched((prev) => ({ ...prev, confirmPassword: true }));
    }
  };

  const toggleShow = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert("User email not found.");
      return;
    }

    if (!isPasswordValid) {
      alert("Please meet all password requirements.");
      return;
    }

    if (!isMatching) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${baseURL}/api/auth/change-password/${email}`, {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      });

      alert("Password updated successfully!");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTouched({ newPassword: false, confirmPassword: false });
      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message || "Failed to update password.";
        alert(message);
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const Rule = ({ label, valid }: { label: string; valid: boolean }) => (
    <p
      className={`flex items-center gap-2 text-sm ${
        valid ? "text-green-400" : "text-red-500"
      }`}
    >
      {valid ? <CheckCircle size={16} /> : <XCircle size={16} />}
      {label}
    </p>
  );

  const renderPasswordInput = (
    name: keyof typeof form,
    label: string,
    show: boolean,
    toggle: () => void,
    touchedField?: boolean
  ) => (
    <div className="space-y-1">
      <label className="text-white font-medium">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full bg-transparent border border-gray-700 px-4 py-2 rounded-md text-white pr-10"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Password Rules */}
      {name === "newPassword" && touchedField && (
        <div className="mt-2 space-y-1">
          <Rule label="Minimum 8 characters" valid={passwordRules.length} />
          <Rule
            label="At least one uppercase letter"
            valid={passwordRules.uppercase}
          />
          <Rule
            label="At least one lowercase letter"
            valid={passwordRules.lowercase}
          />
          <Rule label="At least one number" valid={passwordRules.digit} />
          <Rule
            label="At least one special character"
            valid={passwordRules.special}
          />
          {isPasswordValid && (
            <p className="text-green-400 text-sm mt-1">
              ✅ Your password looks strong.
            </p>
          )}
        </div>
      )}

      {/* Confirm Password Match */}
      {name === "confirmPassword" &&
        touchedField &&
        form.confirmPassword.length > 0 && (
          <p
            className={`text-sm mt-1 ${
              isMatching ? "text-green-400" : "text-red-500"
            }`}
          >
            {isMatching
              ? "✅ Passwords match perfectly!"
              : "❌ Passwords do not match."}
          </p>
        )}
    </div>
  );

  return (
    <div className="space-y-6">
      <ProfileImage />
      <form
        className="bg-[#121a2a] border border-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold mb-1 text-white">Security</h2>
        <hr className="border-gray-700" />

        {renderPasswordInput(
          "oldPassword",
          "Old Password",
          showPassword.old,
          () => toggleShow("old")
        )}

        {renderPasswordInput(
          "newPassword",
          "New Password",
          showPassword.new,
          () => toggleShow("new"),
          touched.newPassword
        )}

        {renderPasswordInput(
          "confirmPassword",
          "Confirm Password",
          showPassword.confirm,
          () => toggleShow("confirm"),
          touched.confirmPassword
        )}

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={!isPasswordValid || !isMatching || loading}
            className="bg-[var(--primary)] text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
