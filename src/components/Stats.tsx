import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const stats = [
    { title: "Evolving", subtitle: "In The Market", value: null },
    { title: "Awards", value: 4, suffix: "+" },
    { title: "Countries Covered", value: 105, suffix: "+" },
    { title: "Trading Instruments", value: 300, suffix: "+" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 bg-white dark:bg-black text-black dark:text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Elevate Your Trading with{" "}
          <span className="text-[var(--primary-color)] italic">
            Close Friends Traders
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative bg-gray-100 dark:bg-neutral-900  text-center p-8 rounded-3xl shadow-lg"
              animate={{
                y: [0, index % 2 === 0 ? -20 : 20, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            >
              <div className="z-10 relative">
                {stat.value !== null ? (
                  <>
                    <div className="text-5xl font-extrabold mb-2 text-[var(--primary-color)]">
                      {hasAnimated ? (
                        <CountUp
                          start={0}
                          end={stat.value}
                          duration={2}
                          suffix={stat.suffix}
                        />
                      ) : (
                        `0${stat.suffix || ""}`
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {stat.title}
                    </h3>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-200">
                      {stat.subtitle}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
