import { motion } from "framer-motion";

const features = [
  {
    title: "Unified Interface",
    desc: "Everything from signals to insights in one clean dashboard",
  },
  {
    title: "Automation First",
    desc: "Auto-analyze trades, auto-flag risks, auto-improve strategies",
  },
  {
    title: "Visual Reporting",
    desc: "Easy charts, intuitive stats, no spreadsheets needed",
  },
  {
    title: "Security & Transparency",
    desc: "All data encrypted and strictly protected. Full control. Always.",
  },
];

const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function WhyChooseCFT() {
  return (
    <section className="relative min-h-screen bg-[#0b0b0e] text-white flex items-center justify-center overflow-hidden">
      {/* Center Text */}
      <div className="absolute z-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Why Choose CFT?
        </h2>
      </div>

      {/* Feature Cards */}
      <div className="relative w-full max-w-6xl h-[600px] perspective-3d">
        {features.map((feature, i) => {
          const positionClasses = [
            "top-0 left-1/2 -translate-x-1/2",
            "top-1/2 left-0 -translate-y-1/2",
            "bottom-0 left-1/2 -translate-x-1/2",
            "top-1/2 right-0 -translate-y-1/2",
          ];

          return (
            <motion.div
              key={i}
              variants={floatVariants}
              animate="animate"
              className={`absolute ${positionClasses[i]} w-48 h-64 group`}
            >
              {/* 3D Block */}
              <div className="relative w-full h-full transform-gpu transition-transform duration-300 group-hover:scale-105">
                {/* Top Face */}
                <div className="absolute top-0 w-full h-12 bg-gray-100 rounded-t-xl shadow-md z-10" />

                {/* Body */}
                <div className="absolute top-12 w-full h-[200px] bg-[#1a1a1e] text-white p-4 rounded-b-xl border-t border-gray-700 z-0">
                  <h3 className="text-lg font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">{feature.desc}</p>
                </div>

                {/* Shadow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-black/30 blur-md rounded-full" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
