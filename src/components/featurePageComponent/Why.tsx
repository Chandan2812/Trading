import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Unified Interface",
    subtitle: "Everything from signals to insights in one clean dashboard",
  },
  {
    title: "Automation First",
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
      className="relative py-12 bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white transition-colors duration-500"
    >
      <div className="w-11/12 md:w-5/6 mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-20">
          Real Reasons Traders Are Switching to{" "}
          <span className="text-[var(--primary-color)] italic">
            Close Friends Traders
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-[var(--bg-color1)] h-[170px] border border-gray-300 dark:border-gray-700 rounded-2xl p-6 text-center transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] dark:shadow-[0_10px_30px_-5px_rgba(255,255,255,0.05)] relative"
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
              }
            >
              <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                {stat.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whychoose;
