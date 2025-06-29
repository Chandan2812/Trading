import { motion } from "framer-motion";

const flipCard = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 1,
      delay: i * 1.0,
      ease: "easeInOut",
    },
  }),
};

export default function FeaturesSplit() {
  return (
    <section className="relative bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white py-10  overflow-hidden transition-colors duration-500">
      {/* Section Heading */}
      <motion.div
        className="w-11/12 md:w-5/6 mx-auto text-center mb-20 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-4xl  font-bold leading-tight">
          <span className="text-[var(--primary-color)]">
            Close Friends Traders{" "}
          </span>{" "}
          System Features
        </h2>
      </motion.div>

      {/* Glowing Divider Line */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-1 bg-gradient-to-r from-transparent via-[var(--primary-color)] to-transparent rotate-[-2deg] -translate-x-1/2 -translate-y-1/2 blur-sm opacity-40 pointer-events-none" />

      {/* Feature Cards */}
      <div className="w-11/12 md:w-5/6 grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto relative z-10 ">
        {/* Card 1 */}
        <motion.div
          className="backdrop-blur-md bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-8 shadow-md dark:shadow-[0_1px_3px_var(--primary-color)] hover:shadow-lg dark:hover:shadow-[0_6px_16px_var(--primary-color)] transition-shadow duration-500"
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={flipCard}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-5">
            Manage Functions
          </h3>
          <ul className="space-y-4">
            {[
              "Real-time performance alerts",
              "Actionable insights when trading drops",
              "Smart triggers for stop-loss, exit, and rebalance",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="text-[var(--primary-color)] text-lg mt-1">
                  ✔
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="backdrop-blur-md bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-8 shadow-md dark:shadow-[0_1px_3px_var(--primary-color)] hover:shadow-lg dark:hover:shadow-[0_6px_16px_var(--primary-color)] transition-shadow duration-500"
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={flipCard}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h3 className="text-xl font-semibold text-[var(--primary-color)] mb-5">
            Support Functions
          </h3>
          <ul className="space-y-4">
            {[
              "Automated risk control",
              "Abnormal activity alerts",
              "Portfolio performance diagnostics",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
              >
                <span className="text-[var(--primary-color)] text-lg mt-1">
                  ✔
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
