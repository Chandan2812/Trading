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
    { title: "Established In", subtitle: "2010", value: null },
    { title: "Prestigious Awards", value: 14, suffix: "+" },
    { title: "Countries Covered", value: 79, suffix: "+" },
    { title: "Trading Instruments", value: 259, suffix: "+" },

    { title: "Global Loyal Traders", value: 5, suffix: "M+" },
  ];

  return (
    <section
      ref={ref}
      className="py-10 bg-white dark:bg-[var(--bg-color1)] text-black dark:text-white overflow-hidden"
    >
      <div className="w-11/12 md:w-5/6 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          Upgrade Your Trading Experience with{" "}
          <span className="text-[var(--primary-color)] italic">
            Close Friends Traders
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative   text-center p-8 rounded-3xl"
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
                    <p className="text-5xl font-extrabold mb-2 text-[var(--primary-color)]">
                      {stat.subtitle}
                      {stat.suffix}
                    </p>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                      {stat.title}
                    </h3>
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
