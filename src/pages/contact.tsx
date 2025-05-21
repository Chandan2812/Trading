import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Navbar from "../components/Nav";
import Footer from "../components/Footer";
import bull from "../assets/Bitcoin Growth Chart Background Design - Edited.png";

function Contact() {
  return (
    <div>
      <Navbar />
      <section
        className="relative bg-black text-white py-24 px-6 mt-16"
        style={{
          backgroundImage:
            "url('https://www.arrowtradefx.com/assets/images/png/regulationss.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="relative z-10 w-11/12 mx-auto flex flex-col lg:flex-row gap-12 items-center font-raleway font-light">
          {/* Left: Contact Info */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 relative inline-block after:content-[''] after:block after:h-1 after:w-20 after:mt-2 after:bg-[var(--primary-color)]">
              Let's Connect
            </h2>
            <p className="text-base md:text-lg text-gray-300 mb-10">
              We’d love to hear from you. Reach out and let’s start a
              conversation.
            </p>

            <div className="space-y-6 hover:">
              <ContactItem
                icon={<Phone />}
                label="Call us"
                content="123456789"
                href="tel:02071250421"
              />
              <ContactItem
                icon={<Mail />}
                label="Email us"
                content="Closefriendstraders@gmail.com"
                href="mailto:Closefriendstraders"
              />
              <ContactItem
                icon={<MapPin />}
                label="Office"
                content="INDIA"
                // href="https://www.google.com/maps/place/1+Bell+St,+London+NW1+5BY"
              />
              <ContactItem
                icon={<Clock />}
                label="Working Hours"
                content="Mon - Fri: 9:00 AM - 6:00 PM"
              />
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex-1 flex justify-center">
            <img
              src={bull}
              alt="Contact Us"
              className="w-full max-w-sm h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
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
      className={`flex items-center gap-4 ${href ? "cursor-pointer" : ""}`}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      <div className="p-4 bg-[var(--primary-color)] text-white rounded-full hover:shadow-[0_0_10px_var(--primary-color)]">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-300">{label}</p>
        <p className="text-lg font-medium text-white">{content}</p>
      </div>
    </Wrapper>
  );
};

export default Contact;
