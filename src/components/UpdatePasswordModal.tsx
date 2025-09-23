import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  accountNo: number;
}

const UpdatePasswordModal = ({ isOpen, onClose, accountNo }: Props) => {
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const validatePassword = (pwd: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return regex.test(pwd);
  };

  const handleSubmit = async () => {
    setResponse(null);
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain uppercase, lowercase, and a special character."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/moneyplant/updatePassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountno: accountNo.toString(),
            newpassword: password,
          }),
        }
      );

      const data = await res.json();
      setResponse(data.message);
    } catch (error) {
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#121a2a] p-6 rounded-lg border border-gray-700 w-[90%] max-w-sm text-white">
        <h2 className="text-lg font-semibold mb-4">Update Password</h2>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            className={`w-full p-2 pr-10 rounded bg-[#0d1b2a] border ${
              error ? "border-red-500" : "border-gray-600"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-2.5 text-gray-400"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <button
          className="bg-blue-600 w-full py-2 mt-3 rounded text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        {response && (
          <p className="text-sm mt-3 text-center text-gray-300">{response}</p>
        )}

        <button
          className="text-sm text-gray-400 underline mt-4 block mx-auto"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
