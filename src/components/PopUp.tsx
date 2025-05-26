import { useEffect, useState } from "react";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketSegment, setMarketSegment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const hasShownPopup = sessionStorage.getItem("bonusPopupShown");

    if (!hasShownPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("bonusPopupShown", "true");
      }, 7000); // Show after 7 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  // Form submit handler
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Simple validation: check all fields filled
    if (!fullName.trim() || !phone.trim() || !marketSegment.trim()) {
      setError("Please fill all fields.");
      return;
    }

    setError("");

    // For now, just log the data
    console.log({
      fullName,
      phone,
      marketSegment,
    });

    // You can add backend API call here later

    // Optionally, close popup after submission
    setShowPopup(false);
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
        <h2 className="text-2xl font-bold mb-2 text-center text-[#71ced0] sm:text-2xl">
          Get 10% Bonus
        </h2>
        <p className="text-center mb-4 text-sm text-white">
          100K Customers Worldwide <br />0 Brokerage & Upto 500X Margin
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
            type="text"
            placeholder="Phone*"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
          />
          <input
            type="text"
            placeholder="Market Segment?"
            value={marketSegment}
            onChange={(e) => setMarketSegment(e.target.value)}
            className="w-full border border-white bg-transparent text-white p-2 placeholder-gray-400 outline-none text-sm sm:text-base"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#71ced0] hover:bg-[#5bb7b8] text-black font-semibold py-2 text-sm sm:text-base"
          >
            REQUEST A CALL BACK
          </button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
