import React, { useEffect, useState } from "react";
import home from "../assets/Home.jpg";
import axios from "axios";
import { usePopup } from "../components/PopupContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

type Offer = {
  _id: string;
  title: string;
  subtitle?: string;
  bannerImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
};

const HeroSection: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openPopup } = usePopup();

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get<Offer[]>(`${baseURL}/api/offer/view`);
        if (res.data && res.data.length > 0) {
          setOffers(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch offers", err);
      }
    };

    fetchOffer();
  }, []);

  useEffect(() => {
    if (offers.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [offers]);

  return (
    <section className="relative min-h-[80vh] md:h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={home}
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-0" />

      {/* Main Content */}
      <div className="relative z-10  w-11/12 md:w-5/6 mx-auto  flex flex-col md:flex-row justify-between items-center gap-10 py-12 md:py-0">
        {/* Left Content */}
        <div className="max-w-xl text-white space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-start md:mt-10 mt-28">
            India’s #1 Trusted Trading Hub
          </h1>
          <h1 className="text-2xl font-semibold leading-tight text-start">
            <span className="block mb-2">
              500× Leverage{" "}
              <span className="text-[var(--primary-color)]">|</span> Zero Tax{" "}
              <span className="text-[var(--primary-color)]">| </span>
              No Commission
            </span>
          </h1>

          <button
            onClick={openPopup}
            className="mt-5 bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:bg-white shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit"
          >
            Start Trading Now
          </button>
          {/* Contact Info in Flex Row */}
          <div className="mt-10 text-white w-full max-w-4xl md:mx-auto flex justify-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {/* Pay-in */}
              <div>
                <p className="font-semibold mb-2">Pay-in Number</p>
                <a
                  href="https://wa.link/v6tmxe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--primary-color)] hover:bg-[#5bb7b8] px-4 py-2 rounded-full text-black font-semibold transition"
                >
                  +1 (236) 305-9090‬
                </a>
              </div>

              {/* Withdrawal */}
              <div>
                <p className="font-semibold mb-2">Withdrawal Number</p>
                <a
                  href="https://wa.link/tre4j4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--primary-color)] hover:bg-[#5bb7b8] px-4 py-2 rounded-full text-black font-semibold transition"
                >
                  +1 (236) 305-9092‬
                </a>
              </div>

              {/* Technical Support */}
              <div>
                <p className="font-semibold mb-2">Customer Support</p>
                <a
                  href="https://wa.link/ehhw8j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[var(--primary-color)] hover:bg-[#5bb7b8] px-4 py-2 rounded-full text-black font-semibold transition"
                >
                  +917230941008‬
                </a>
              </div>
            </div>
          </div>

          {/* Features Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 text-sm sm:text-base font-medium">
            <div className="flex items-center gap-4">
              <span className="text-center sm:text-left leading-snug">
                Trusted by <br className="hidden sm:block" />
                50,000+ Local Traders
              </span>
              <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)]" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-center sm:text-left leading-snug">
                Instant Execution.
                <br className="hidden sm:block" />
                Zero Delays
              </span>
              <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)] opacity-60" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-center sm:text-left leading-snug">
                Lightning <br className="hidden sm:block" />
                Fast Payouts
              </span>
            </div>
          </div>
        </div>

        {offers.length > 0 && (
          <div className=" backdrop-blur-md bg-transparent border border-white/30 rounded-2xl shadow-2xl overflow-hidden w-full max-w-sm animate-fade-in transition-all duration-500">
            <img
              src={offers[currentIndex].bannerImage}
              alt={offers[currentIndex].title}
              className="w-full object-cover max-h-64 rounded-t-2xl"
            />
            <div className="p-5 text-center text-white">
              <h3 className="text-lg font-bold">
                {offers[currentIndex].title}
              </h3>
              {offers[currentIndex].subtitle && (
                <p className="text-sm text-gray-100/80 mt-1">
                  {offers[currentIndex].subtitle}
                </p>
              )}
              {offers[currentIndex].ctaLabel &&
                offers[currentIndex].ctaLink && (
                  <a
                    href={offers[currentIndex].ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-4 py-2 bg-[var(--primary-color)] text-black rounded-full font-medium hover:bg-white hover:text-black transition"
                  >
                    {offers[currentIndex].ctaLabel}
                  </a>
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
