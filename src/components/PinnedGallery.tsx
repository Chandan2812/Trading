import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  [
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  ],
  [
    "https://images.unsplash.com/photo-1536323760109-ca8c07450053",
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    "https://images.unsplash.com/photo-1602526219535-336ad9f5f1ca",
  ],
  [
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1526045478516-99145907023c",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
  ],
];

export default function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<(HTMLUListElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const totalScroll = container.scrollHeight;

      wrapperRefs.current.forEach((wrapper, i) => {
        if (!wrapper) return;

        const direction = i % 2 === 0 ? -1 : 1;
        const distance = wrapper.scrollWidth - window.innerWidth;

        gsap.fromTo(
          wrapper,
          { x: direction === -1 ? distance : 0 },
          {
            x: direction === -1 ? 0 : -distance,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: `+=${totalScroll}`,
              scrub: true,
              pin: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black py-20">
      {rows.map((imgs, i) => (
        <section key={i} className="overflow-hidden py-8">
          <ul
            ref={(el) => (wrapperRefs.current[i] = el)}
            className="flex gap-6 px-4"
          >
            {imgs.map((src, j) => (
              <li key={j} className="flex-shrink-0 w-[clamp(300px,40vw,600px)]">
                <img
                  src={src}
                  alt={`img-${i}-${j}`}
                  className="rounded-xl shadow-xl w-full h-auto"
                />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
