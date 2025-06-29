import { useEffect, useState } from "react";
import "../index.css";
import { usePopup } from "../components/PopupContext"; // adjust path as needed

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Popup = () => {
  const { showPopup, openPopup, closePopup } = usePopup();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketSegment, setMarketSegment] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(false);
    setFullName("");
    setPhone("");
    setMarketSegment("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !marketSegment.trim()) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/api/popup-lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, marketSegment, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Failed to submit. Please try again.");
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

        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3 text-[#71ced0]">
              Thank you!
            </h2>
            <p className="text-sm text-white">
              Your request has been received. We’ll contact you shortly.
            </p>
          </div>
        ) : (
          <>
            <p className="text-center mb-4 text-sm text-white">
              100K Customers Worldwide <br />
              0% Brokerage & Upto 500x Margin
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
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
                {loading ? "Submitting..." : "REQUEST A CALL BACK"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
