import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Unified Interface",
    subtitle: "Everything from signals to insights in one clean dashboard",
  },
  {
    title: "Automation First", // ← This one will float up/down
    subtitle: "Auto-analyze trades, auto-flag risks, auto-improve strategies",
  },
  {
    title: "Visual Reporting",
    subtitle: "Easy charts, intuitive stats, no spreadsheets needed",
  },
  {
    title: "Security & Transparency",
    subtitle:
      "All data encrypted and strictly protected. Full control. Always.",
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const floatAnimation = {
  y: [0, -12, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const Whychoose = () => {
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-[#0a0a0d] text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-20">
          Why Choose{" "}
          <span className="text-[var(--primary-color)] italic">
            Close Friends Traders
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-b from-[#1f1f27] to-[#0e0e12] border border-gray-700 shadow-xl rounded-2xl p-6 text-center w-[260px] sm:w-[280px]"
              style={{
                transformStyle: "preserve-3d",
                rotateX: "15deg",
                rotateY: "-10deg",
              }}
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInVariants}
              whileInView={
                index === 1 || index === 3 ? floatAnimation : undefined
              } // Only 2nd box floats
            >
              <h3 className="text-xl font-bold mb-3 text-white">
                {stat.title}
              </h3>
              <p className="text-sm text-gray-300">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whychoose;
