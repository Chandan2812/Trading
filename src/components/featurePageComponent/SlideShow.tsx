import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import slide1 from "../../assets/Slider 1 BG.jpg";
import slide2 from "../../assets/Slider 2 BG.jpg";
import slide3 from "../../assets/Slider 3 BG.png";
import slide4 from "../../assets/Slider 4 BG.jpg";
import { usePopup } from "../../components/PopupContext";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { img: slide1 },
  { img: slide2 },
  { img: slide3 },
  { img: slide4 },
];

const features = [
  {
    title: "Zero Commission",
    desc: "Trade freely with 0% commission on all orders.",
  },
  {
    title: "500x Margin",
    desc: "Boost your trades with up to 500x intraday leverage.",
  },
  {
    title: "Live Dashboard",
    desc: "Track trades, revenue, and performance in real time.",
  },
  {
    title: "One-Click Order Execution",
    desc: "Place trades instantly with quick execution.",
  },
  {
    title: "Smart Risk Controls",
    desc: "Set stop-loss, capital locks, and daily limits.",
  },
  {
    title: "Top Stock Insights",
    desc: "See which stocks and assets are trending daily.",
  },
  {
    title: "Trade & Learn Hub",
    desc: "Access tutorials & insights within the dashboard.",
  },
  {
    title: "Fast Withdrawals & Support",
    desc: "Quick payouts with 24x7 customer assistance.",
  },
];

export default function SwipeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countRef = useRef<HTMLSpanElement>(null);
  const { openPopup } = usePopup();

  useEffect(() => {
    const ctx = gsap.context(() => {
      slideRefs.current.forEach((slide, i) => {
        if (i !== 0 && slide) {
          gsap.set(slide, { xPercent: 100 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${slides.length * 150}vh`,
          pin: true,
          scrub: 1,
        },
      });

      slides.forEach((_, i) => {
        const current = slideRefs.current[i];
        if (!current) return;

        tl.to(countRef.current, {
          textContent: i + 1,
          duration: 0.3,
          snap: { textContent: 1 },
        });

        if (i !== 0) {
          tl.to(
            current,
            {
              xPercent: 0,
              duration: 1,
              ease: "power2.out",
            },
            "<"
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Slides */}
      {slides.map((slide, i) => {
        const feature1 = features[i * 2];
        const feature2 = features[i * 2 + 1];

        return (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.img})`,
              zIndex: 10 + i,
            }}
          >
            <div className="absolute inset-0 bg-black/60 z-0" />
            <div className="max-w-6xl px-6 w-full flex flex-col items-center text-white text-center space-y-10">
              {/* Slide Heading */}
              <h2 className="hidden md:block text-3xl font-semibold tracking-widest uppercase text-white/90 drop-shadow-md">
                Faster trades. Smarter insights. Laser-sharp accuracy. Welcome
                to Close Friends Traders.
              </h2>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 md:px-0">
                {[feature1, feature2].map((f, idx) => (
                  <div
                    key={idx}
                    className="relative group p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl transition-transform duration-300 transform hover:scale-105 hover:border-white/40"
                  >
                    <div className="space-y-2 mt-6">
                      <h3 className="text-2xl font-semibold text-white/90 tracking-wide">
                        {f.title}
                      </h3>
                      <p className="text-sm text-white/80 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                    <button
                      onClick={openPopup}
                      className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
                    >
                      Start Trading Now
                    </button>

                    {/* Animated pulse border ring */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/30 animate-pulse pointer-events-none"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
