// components/ScrollingIcons.tsx
import Slider from "react-slick";
import nifty from "../assets/trading/1ST-ICON-1-80x80.webp";
import gold from "../assets/trading/3RD-ICON-1-80x80.webp";
import oil from "../assets/trading/4TH-ICON-1-80x80.webp";
import amazon from "../assets/trading/6TH-ICON-1-80x80 (1).webp";
// import img from "../assets/trading/ALUMINIUIM-80x80.webp";
import img2 from "../assets/trading/Hero_MotoCorp-Logo.wine.png";
import img3 from "../assets/trading/Adani_2012_logo.png";
// import img4 from "../assets/trading/META@2x@2x-80x80.webp";
import img5 from "../assets/trading/BSE_logo.svg.png";
import img6 from "../assets/trading/Indian_Oil_Corporation-Logo.wine.png";
import img7 from "../assets/trading/MRF.png";
import img9 from "../assets/trading/NVIDIA@2x@2x-80x80.webp";
import img10 from "../assets/trading/tata-logo-png_seeklogo-135877.png";
import img11 from "../assets/trading/GAIL.png";
// import img12 from "../assets/trading/ZINC-80x80.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const icons = [
  { src: nifty, alt: "Nifty", glow: "#007bff" },
  { src: gold, alt: "Gold", glow: "#ffc107" },
  { src: oil, alt: "Oil", glow: "#ff9800" },
  { src: amazon, alt: "Amazon", glow: "#007bff" },
  // { src: img, alt: "Oil", glow: "#ff9800" },
  { src: img2, alt: "Copper", glow: "#ff5722" },
  { src: img3, alt: "Amazon", glow: "#007bff" },
  // { src: img4, alt: "Oil", glow: "#ff9800" },
  { src: img5, alt: "Copper", glow: "#ff5722" },
  { src: img6, alt: "Amazon", glow: "#007bff" },
  { src: img7, alt: "Oil", glow: "#ff9800" },
  { src: img9, alt: "Amazon", glow: "#007bff" },
  { src: img10, alt: "Oil", glow: "#ff9800" },
  { src: img11, alt: "Copper", glow: "#ff5722" },
  // { src: img12, alt: "Amazon", glow: "#007bff" },
];

const ScrollingIcons = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="w-full py-10 bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white  overflow-hidden">
      <Slider {...settings}>
        {icons.map((icon, index) => (
          <div key={index} className="flex items-center justify-center px-4">
            <img
              src={icon.src}
              alt={icon.alt}
              className="h-24 w-auto object-contain"
              // style={{ filter: `drop-shadow(0 0 8px ${icon.glow})` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScrollingIcons;
