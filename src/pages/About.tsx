import worldGraph from "../assets/newabout.webp"; // background image
import CustomerSupport from "../components/CustomerSupport";
import Footer from "../components/Footer";
import Navbar from "../components/Nav";

const AboutUsSection = () => {
  return (
    <div>
      <Navbar />
      <section className="bg-black text-white">
        {/* Section 1: Image + About */}
        <div className="flex flex-col lg:flex-row items-center justify-center mx-auto gap-5">
          <div className="w-full lg:w-1/2 hidden md:block">
            <img
              src={worldGraph}
              alt="Trading Graph"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 mt-36 px-5">
            <h2 className="text-3xl font-bold mb-4">
              About <span className="text-[var(--primary-color)]">Us</span>
            </h2>
            <p className="mb-4 text-gray-300 md:max-w-xl ">
              Our trading journey began with a tight-knit group of close friends
              who shared a passion for the markets. What started as casual
              strategy sessions has grown into a trusted circle where ideas,
              trades, and experiences are openly shared.
            </p>
            <p className="mb-6 text-gray-400 md:max-w-xl">
              We believe in growing together—leveraging each other’s strengths,
              tools, and insights to thrive in the ever-changing market. This
              space is built on trust, transparency, and mutual success. Whether
              you're a beginner or a seasoned trader, you're not alone—we’re all
              in this together.
            </p>
          </div>
        </div>

        {/* Section 2: Three Office Images */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto px-6 mt-12">
          <img
            src="https://media.istockphoto.com/id/1827291486/photo/a-dedicated-mentor-is-explaining-mentees-importance-of-project-while-sitting-at-the-boardroom.jpg?s=612x612&w=0&k=20&c=whMTmOCyOUfNqoNBe8GPlmcNUM-aCfqD-0whdFPQpO4="
            alt="Office 1"
            className="rounded-lg w-full h-64 object-cover"
          />
          <img
            src="https://img.freepik.com/photos-premium/interieur-bureau-moderne_52137-8465.jpg?semt=ais_hybrid&w=740"
            alt="Office 2"
            className="rounded-lg w-full h-64 object-cover"
          />
          <img
            src="https://media.istockphoto.com/id/1372834292/photo/empty-workdesk-in-modern-office.jpg?s=170667a&w=0&k=20&c=db0VaxqtBqBwI_IyAPpCoZN_AOkGIRUBtkiSXuYGO08="
            alt="Office 3"
            className="rounded-lg w-full h-64 object-cover"
          />
        </div>

        <CustomerSupport />

        {/* Section 3: Call-to-Action Box */}
        <div className="max-w-4xl mx-auto py-20 px-6">
          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-[var(--primary-color)] rounded-2xl text-center py-16 px-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              UNLOCK YOUR TRADING <br /> POTENTIAL WITH{" "}
              <span className="text-[var(--primary-color)]">
                Close Friends Traders
              </span>
            </h3>
            <button className="mt-6 bg-[var(--primary-color)] text-black px-6 py-3 rounded-full font-semibold transition hover:opacity-90">
              Free Trial
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUsSection;
