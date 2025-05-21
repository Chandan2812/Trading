import image1 from "../assets/Banner-scaled.webp";
import image2 from "../assets/Banner-2-scaled.webp";
import image3 from "../assets/Banner-3-scaled.webp";
import image4 from "../assets/Banner-4-scaled.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";

const images = [image1, image2, image3, image4];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, // Show 2 at a time
    slidesToScroll: 1, // Scroll 1 at a time
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // set to true if you want arrows
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // On mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black">
      <div className="max-w-7xl mx-auto px-5 py-12">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="p-2">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
