import { useEffect, useState } from "react";
import axios from "axios";

type Offer = {
  _id: string;
  title: string;
  subtitle?: string;
  popupImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
};

const OfferPopup: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("popupOfferSeen");
    if (seen === "true") return;

    const timer = setTimeout(() => {
      const fetchOffers = async () => {
        try {
          const res = await axios.get<Offer[]>(
            "https://cft-b87k.onrender.com/api/offer/view"
          );
          if (res.data.length > 0) {
            setOffers(res.data);
            setShow(true);
          }
        } catch (err) {
          console.error("Error fetching offers", err);
        }
      };

      fetchOffers();
    }, 8000); // 8 seconds delay

    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (offers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers]);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem("popupOfferSeen", "true");
  };

  if (!show || offers.length === 0) return null;

  const offer = offers[currentIndex];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-black text-xl"
        >
          &times;
        </button>

        {offer.popupImage && (
          <img
            src={offer.popupImage}
            alt={offer.title}
            className="rounded-t-2xl w-full max-h-64 object-cover"
            draggable="false"
          />
        )}

        <div className="p-6 text-center">
          <h2 className="text-xl font-bold text-black">{offer.title}</h2>
          {offer.subtitle && (
            <p className="mt-2 text-black text-sm">{offer.subtitle}</p>
          )}
          {offer.ctaLink && offer.ctaLabel && (
            <a
              href={offer.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              {offer.ctaLabel}
            </a>
          )}
        </div>

        {/* Optional: offer counter */}
        {offers.length > 1 && (
          <div className="absolute bottom-3 right-4 text-xs text-gray-500">
            {currentIndex + 1} / {offers.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferPopup;
