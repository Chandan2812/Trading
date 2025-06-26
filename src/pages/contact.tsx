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

function Contact() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <div className="mb-16">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-6">
          {/* Left Content */}
          <div
            className="flex-1"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h2 className="text-4xl font-bold mb-6">Reach Out to Us</h2>
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
          </div>
        </div>
      </section>

      {/* Support Features */}
      <section className="bg-gray-100 dark:bg-[#0a0a0d] py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h3 className="text-3xl font-bold mb-14" data-aos="zoom-in">
            Always-On Support You Can Trust
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {supportFeatures.map((feature, i) => (
              <div
                key={i}
                data-aos="flip-left"
                data-aos-delay={i * 200}
                className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-[var(--primary-color)] shadow-md"
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
        className="py-20 px-6 text-center bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300"
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
    desc: "Keep abreast on market sentiment and expert-backed insights. Our experts can help you navigate important news, trends, and tactics.",
    icon: <Headphones className="w-6 h-6" />,
  },
  {
    title: "Direct Human Assistance",
    desc: "For both trading and non-trading inquiries, get in touch with actual agents—not chatbots. Our staff is prepared to assist both novices and experts.",
    icon: <ShieldCheck className="w-6 h-6" />,
  },
  {
    title: "Technical Issue Resolution",
    desc: "Our tech support is always available to help with anything from platform setup to order difficulties. Seamless technology is the foundation of smooth trading, and we've got you covered.",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
];

export default Contact;
