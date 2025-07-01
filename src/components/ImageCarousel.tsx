import image1 from "../assets/S1.jpg";
import image2 from "../assets/S2.jpg";
import image3 from "../assets/S3.jpg";
import image4 from "../assets/S4.png";
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
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white transition-colors duration-500">
      <div className="w-11/12 md:w-5/6 mx-auto py-6">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="p-2">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full object-cover rounded-lg border border-gray-300 dark:border-gray-700"
                draggable="false"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
