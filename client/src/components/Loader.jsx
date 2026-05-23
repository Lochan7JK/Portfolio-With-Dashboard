// src/components/Loader.jsx

import { motion } from "framer-motion";

function Loader({ text }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.2,   // 🔥 expands like morph
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[999] bg-[#191919] flex items-center justify-center"
    >
      {/* Center Orb */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col items-center"
      >
        {/* Glow */}
        <div className="absolute w-24 h-24 sm:w-40 sm:h-40 bg-primary blur-3xl opacity-40 animate-pulse rounded-full"></div>

        {/* Rotating Ring */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 border-2 border-t-primary border-white/10 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="mt-6 text-gray-300 tracking-widest animate-pulse text-sm md:text-base">
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Loader;
