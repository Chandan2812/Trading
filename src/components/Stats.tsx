import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const stats = [
    { title: "Evolving", subtitle: "In The market", value: null },
    { title: "Awards", value: 4, suffix: "+" },
    { title: "Countries Covered", value: 105, suffix: "+" },
    { title: "Trading Instruments", value: 300, suffix: "+" },
  ];

  return (
    <section
      ref={ref}
      className="py-12 bg-white dark:bg-black text-black dark:text-white"
    >
      <div className="container max-w-7xl px-5 mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-6 text-center">
          Elevate Your Trading with{" "}
          <span className="text-[var(--primary-color)]">
            Close Friends Traders
          </span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-gray-100 dark:bg-neutral-900 backdrop-blur-sm"
            >
              {stat.value !== null ? (
                <>
                  <div className="text-4xl font-bold mb-2 text-[var(--primary-color)]">
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
                  <h3 className="text-xl font-semibold ">{stat.title}</h3>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-2 ">{stat.title}</h3>
                  <p className="text-lg opacity-80">{stat.subtitle}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
