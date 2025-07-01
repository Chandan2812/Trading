import { useState } from "react";
import { ChevronDown } from "lucide-react";
import faq_img from "../assets/FAQ with Text.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { CustomEase } from "gsap/CustomEase";
// CustomBounce requires CustomEase
import { CustomBounce } from "gsap/CustomBounce";
// CustomWiggle requires CustomEase
import { CustomWiggle } from "gsap/CustomWiggle";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/EasePack";

import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { Flip } from "gsap/Flip";
import { GSDevTools } from "gsap/GSDevTools";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { MotionPathHelper } from "gsap/MotionPathHelper";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Observer } from "gsap/Observer";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { PhysicsPropsPlugin } from "gsap/PhysicsPropsPlugin";
import { PixiPlugin } from "gsap/PixiPlugin";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { TextPlugin } from "gsap/TextPlugin";
import { usePopup } from "../components/PopupContext";

gsap.registerPlugin(
  useGSAP,
  Draggable,
  DrawSVGPlugin,
  EaselPlugin,
  Flip,
  GSDevTools,
  InertiaPlugin,
  MotionPathHelper,
  MotionPathPlugin,
  MorphSVGPlugin,
  Observer,
  Physics2DPlugin,
  PhysicsPropsPlugin,
  PixiPlugin,
  ScrambleTextPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase,
  CustomBounce,
  CustomWiggle
);

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "Is Close Friends Traders suitable for beginners?",
    answer:
      "Indeed, Close Friends Traders is made for both novice and seasoned traders. With round-the-clock assistance and a demo account for practice, the site is user-friendly.",
  },
  {
    question: "Can I trade using a mobile device?",
    answer:
      "Indeed, Close Friends Traders is completely mobile-friendly. You can easily trade at any time and from any location.",
  },
  {
    question: "Does Close Friends Traders protect my money?",
    answer:
      "Secure payment methods and cutting-edge encryption safeguard your money. Your safety is always Close Friends Traders’ top priority.",
  },
  {
    question: "Do I need any paperwork to sign up?",
    answer:
      "There is no need for extensive paperwork. Simply enter your mobile number to get started right away.",
  },
];

const ToggleFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { openPopup } = usePopup();

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white text-black dark:bg-[var(--bg-color1)] dark:text-white py-12 transition-colors duration-500">
      <div className="w-11/12 md:w-5/6 mx-auto ">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly py-3 items-start">
          <div className="md:flex items-start hidden mt-10">
            <img
              src={faq_img}
              alt="FAQ Illustration"
              className="w-72 max-w-sm"
              draggable="false"
            />
          </div>
          <div className="space-y-5 pt-10 max-w-xl w-full">
            {faqs.map((faq, index) => (
              <div key={index} className="relative">
                {/* FAQ Box */}
                <div className="bg-gray-50 dark:bg-[var(--bg-color1)] border border-gray-300 dark:border-gray-700 rounded-lg pl-12 pr-6 py-3 relative w-full transition-colors duration-300">
                  {/* Number Badge */}
                  <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-black text-primary-light dark:text-primary-dark rounded-full flex items-center justify-center text-xl font-bold border-2 border-primary-light dark:border-primary-dark">
                    {index + 1}
                  </div>

                  <button
                    className="w-full text-left flex items-center justify-between focus:outline-none"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-lg font-medium">{faq.question}</span>
                    <ChevronDown
                      className={`transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === index && (
                    <div
                      id={`faq-answer-${index}`}
                      className="pt-2 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* ✅ Add the button below the FAQ list */}
            <div className="flex justify-center pt-6">
              <button
                onClick={openPopup}
                className="inline-block bg-[var(--primary-color)] text-black hover:shadow-[0_0_25px_var(--primary-color)] font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition duration-300"
              >
                Start Trading Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToggleFAQ;
