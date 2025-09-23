import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import axios from "axios";

interface AddBalanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountNo: number;
  mode: "deposit" | "withdraw"; // ✅ Add mode
  onSuccess?: () => void;
}

export default function AddBalanceModal({
  isOpen,
  onClose,
  accountNo,
  mode,
  onSuccess,
}: AddBalanceModalProps) {
  const [amount, setAmount] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const id = Math.random().toString(36).substring(2, 18);
      setOrderId(id);
      setAmount(""); // reset amount
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Enter a valid amount");
      return;
    }

    setLoading(true); // ⬅️ Start loading
    const formattedAmount =
      mode === "withdraw"
        ? `-${parseFloat(amount).toFixed(2)}`
        : parseFloat(amount).toFixed(2);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/moneyplant/add-balance`,
        {
          accountno: accountNo.toString(),
          amount: formattedAmount,
          orderid: orderId,
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { type: "SNDPAddBalance" },
        }
      );

      if (res.data.success === true) {
        alert(`${mode === "deposit" ? "Deposit" : "Withdrawal"} Successful`);
        onSuccess?.(); // ✅ Fetch balance first
        onClose(); // ✅ Close modal after that
      } else {
        alert(
          res.data.message ||
            `${mode === "deposit" ? "Deposit" : "Withdrawal"} Failed`
        );
      }
    } catch (err) {
      console.error(
        `${mode === "deposit" ? "Deposit" : "Withdraw"} error:`,
        err
      );
      alert("Something went wrong");
    } finally {
      setLoading(false); // ⬅️ Stop loading
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-[#121a2a] border border-gray-700 rounded-xl shadow-xl w-full max-w-md p-6 relative text-white">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-[var(--primary)] mb-4">
          {mode === "deposit" ? "Deposit Funds" : "Withdraw Funds"}
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Account Number
            </label>
            <input
              type="text"
              readOnly
              value={accountNo}
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Order ID</label>
            <input
              type="text"
              readOnly
              value={orderId}
              className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button
              text={
                loading
                  ? "Processing..."
                  : mode === "deposit"
                  ? "Deposit"
                  : "Withdraw"
              }
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
