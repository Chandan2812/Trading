import defaultImage from "../assets/earth.jpg";

interface PageBannerProps {
  title: string;
  image?: string;
  subtitle?: string;
}

const PageBanner = ({ title, image, subtitle }: PageBannerProps) => {
  const bannerImage = image || defaultImage;

  return (
    <div
      className="px-5 w-full h-52 md:h-72 flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bannerImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      {/* Text wrapper for title + subtitle */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="max-w-5xl text-white text-sm md:text-lg mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
