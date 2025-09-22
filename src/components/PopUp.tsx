import { useEffect, useState } from "react";
import "../index.css";
import { usePopup } from "../components/PopupContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Popup = () => {
  const { showPopup, openPopup, closePopup } = usePopup();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [marketSegment, setMarketSegment] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("bonusPopupShown");
    if (!hasShown) {
      const timer = setTimeout(() => {
        sessionStorage.setItem("bonusPopupShown", "true");
        openPopup();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [openPopup]);

  const handleClose = () => {
    closePopup();
    setStep("form");
    setFullName("");
    setPhone("");
    setCity("");
    setMarketSegment("");
    setEmail("");
    setOtp("");
    setError("");
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !city || !email || !marketSegment) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/api/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, city, email, marketSegment }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("otp");
      } else {
        setError(data.error || "Failed to send OTP.");
      }
    } catch {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseURL}/api/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("done");
      } else {
        setError(data.error || "Invalid OTP.");
      }
    } catch {
      setError("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 px-4">
      <div className="bg-black text-white p-6 max-w-md w-full rounded shadow-lg relative border border-[#71ced0] sm:max-w-md sm:w-auto">
        <button
          className="absolute top-2 right-2 text-white hover:text-[#71ced0] text-xl"
          onClick={handleClose}
        >
          &times;
        </button>

        {step === "done" ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3 text-[#71ced0]">
              Thank you!
            </h2>
            <p className="text-sm text-white">
              Your account is verified. We’ll contact you shortly.
            </p>
          </div>
        ) : step === "form" ? (
          <>
            <p className="text-center mb-4 text-sm text-white">
              0% Commission & Upto 500x Margin
            </p>
            <form className="space-y-3" onSubmit={handleSubmitForm}>
              <input
                type="text"
                placeholder="Full Name*"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder="Phone*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="City*"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
              />
              <input
                type="text"
                placeholder="Market Segment?"
                value={marketSegment}
                onChange={(e) => setMarketSegment(e.target.value)}
                className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
              />
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#71ced0] hover:bg-[#5bb7b8] text-black font-semibold py-2 text-sm sm:text-base"
              >
                {loading ? "Sending OTP..." : "SUBMIT"}
              </button>
            </form>
          </>
        ) : (
          <form className="space-y-3" onSubmit={handleVerifyOtp}>
            <h3 className="text-lg font-semibold text-center text-[#71ced0]">
              Enter the OTP sent to your Watsapp
            </h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#71ced0] hover:bg-[#5bb7b8] text-black font-semibold py-2 text-sm sm:text-base"
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Popup;
