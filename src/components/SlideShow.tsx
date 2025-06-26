import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { bg: "#6d597a" },
  { bg: "#355070" },
  { bg: "#b56576" },
  { bg: "#9a8c98" },
];

const features = [
  {
    title: "Zero Brokerage",
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
    title: "CRM & Ads Sync",
    desc: "Auto-sync leads and ad data for better decisions.",
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
    title: "Lead Funnel Tracking",
    desc: "Monitor users from first touch to loyal trader.",
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
      className="relative w-full min-h-screen overflow-hidden py-16"
    >
      {/* Slide Counter */}
      <div className="absolute top-32 right-12 z-50 text-white text-5xl font-bold border-b-4 border-white">
        0<span ref={countRef}>1</span>
      </div>

      {/* Slides */}
      {slides.map((slide, i) => {
        const feature1 = features[i * 2];
        const feature2 = features[i * 2 + 1];

        return (
          <div
            key={i}
            ref={(el) => (slideRefs.current[i] = el)}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              backgroundColor: slide.bg,
              zIndex: 10 + i,
            }}
          >
            <div className="max-w-6xl px-6 w-full flex flex-col items-center text-white text-center space-y-10">
              {/* Slide Heading */}
              <h2 className="hidden md:block text-3xl font-semibold tracking-widest uppercase text-white/90 drop-shadow-md">
                Faster trades. Smarter insights. Laser-sharp accuracy. Welcome
                to Close Friends Trading.
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
