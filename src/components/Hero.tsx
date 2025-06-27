import React, { useEffect, useState } from "react";
import videoBg from "../assets/WhatsApp Video 2025-06-11 at 20.07.38_9ca513e6.mp4";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
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
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-10 py-12 md:py-0">
        {/* Left Content */}
        <div className="max-w-xl text-white space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-start mt-10">
            Most Trusted Trading Platform
          </h1>
          <h1 className="text-3xl font-semibold leading-tight text-start">
            <span className="block mb-2">
              500× Leverage{" "}
              <span className="text-[var(--primary-color)]">|</span> Zero Tax{" "}
              <span className="text-[var(--primary-color)]">| </span>
              No Brokerage Just Pure Trading
            </span>
            <span className="block text-[var(--primary-color)]">
              <Typewriter
                words={["NSE (F&O)", "MCX (F&O)", "Comex Future"]}
                loop={0}
                cursor
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>

          <button className="bg-[var(--primary-color)] text-black px-8 py-3 rounded-full font-semibold hover:bg-white shadow-[0_0_25px_var(--primary-color)] transition duration-300 w-fit">
            Start Trading
          </button>

          {/* Features Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 text-sm sm:text-base font-medium pt-4">
            <div className="flex items-center gap-4">
              <span className="text-center sm:text-left leading-snug">
                Competitive Spreads <br className="hidden sm:block" />& Low
                Commissions
              </span>
              <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)]" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-center sm:text-left leading-snug">
                Trade on MT5 <br className="hidden sm:block" />
                with Real-Time Execution
              </span>
              <div className="hidden sm:block h-10 w-[1.5px] bg-[var(--primary-color)] opacity-60" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-center sm:text-left leading-snug">
                Fast Withdrawal <br className="hidden sm:block" />
                Processing
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
