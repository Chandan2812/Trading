import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Headphones,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { usePopup } from "../components/PopupContext";

function Contact() {
  const { openPopup } = usePopup();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white transition-colors duration-300">
      <div className="mb-24">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="relative z-10 w-11/12 md:w-5/6 mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
          {/* Left Content */}
          <div
            className="flex-1"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2 className="text-4xl font-bold mb-6">
              Got Questions? We’ve Got You 24x7
            </h2>
            <p className="italic mb-5 text-gray-700 dark:text-gray-400">
              No matter what, we're always here.
            </p>
            <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-300">
              Do you have a query? Do you require assistance with trading? Do
              you want to quickly connect with a genuine person and not a
              chatbot? Your experience counts at{" "}
              <span className="text-[var(--primary-color)] font-semibold">
                Close Friends Traders
              </span>
              . Don’t hesitate to reach out about trades, payments, technical
              problems, and everything else in between. Our professional staff
              is at your service 24x7!
            </p>
            <button
              onClick={openPopup}
              className="mt-6 inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              Start Trading Now
            </button>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex-1 space-y-6">
            <div data-aos="zoom-in" data-aos-delay="100">
              <ContactItem
                icon={<Phone />}
                label="Call Us"
                content="+91 83682 84948"
                href="tel:+918368284948"
              />
            </div>
            <div data-aos="zoom-in" data-aos-delay="300">
              <ContactItem
                icon={<Mail />}
                label="Email Us"
                content="info@closefriendtrader.in"
                href="mailto:info@closefriendtrader.in"
              />
            </div>
            <div data-aos="zoom-in" data-aos-delay="500">
              <ContactItem
                icon={<MapPin />}
                label="Head Office"
                content="India"
              />
            </div>
            <div data-aos="zoom-in" data-aos-delay="700">
              <ContactItem
                icon={<Clock />}
                label="Working Hours"
                content="Our operations run 24×7, so no matter when you trade, we’re right here with you."
              />
            </div>
            {/* WhatsApp Contact Buttons */}
            <div className="mt-10 text-white w-full max-w-4xl md:mx-auto flex justify-start">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center w-full">
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
          </div>
        </div>
      </section>

      {/* Support Features */}
      <section className="bg-gray-100 dark:bg-[--bg-color1] py-12 transition-colors duration-300">
        <div className="w-11/12 md:w-5/6 mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-14" data-aos="zoom-in">
            Always-On Support You Can Trust
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {supportFeatures.map((feature, i) => (
              <div
                key={i}
                data-aos="flip-left"
                data-aos-delay={i * 200}
                className="p-6 rounded-xl  bg-white dark:bg-[var(--bg-color1)] shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_70px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_25px_70px_rgba(255,255,255,0.1)]"
              >
                <div className="text-[var(--primary-color)] mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-12 px-6 text-center bg-white dark:bg-[var(--bg-color1)] transition-colors duration-300"
        data-aos="fade-up"
      >
        <h3 className="text-3xl font-bold mb-6">Let’s Connect Today</h3>
        <p className="text-gray-700 dark:text-gray-400 max-w-2xl mx-auto mb-6">
          Want a walkthrough? Need help? Or just curious? We’re just a click or
          call away—reach out now and experience the difference of Close Friends
          Traders.
        </p>
        <a
          href="tel:+918368284948"
          className="inline-block mt-4 px-8 py-3 bg-[var(--primary-color)] text-white dark:text-black font-semibold rounded-full hover:shadow-[0_0_15px_var(--primary-color)] transition duration-300"
        >
          Talk to Support
        </a>
      </section>

      <Footer />
    </div>
  );
}

type ContactItemProps = {
  icon: React.ReactNode;
  label: string;
  content: string;
  href?: string;
};

const ContactItem = ({ icon, label, content, href }: ContactItemProps) => {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="flex items-center gap-4 group"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="p-3 bg-[var(--primary-color)] text-black dark:text-white rounded-full group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-black dark:text-white">
          {content}
        </p>
      </div>
    </Wrapper>
  );
};

const supportFeatures = [
  {
    title: "24/7 Multilingual Support",
    desc: "Since your comfort is important, we are available 24/7 in Telugu, Gujarati, Hindi, English, and Marathi.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    title: "Instant Market Support",
    desc: "Stay updated on market sentiment and expert-backed insights. Our experts can help you with trends and tactics.",
    icon: <Headphones className="w-6 h-6" />,
  },
  {
    title: "Direct Human Assistance",
    desc: "Have any trading or non-trading inquiries? Our staff is prepared to assist both novices and experts.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "Technical Issue Resolution",
    desc: "Our tech support is available 24x7. Seamless technology is the foundation of smooth trading, and we've got you covered.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
];

export default Contact;
