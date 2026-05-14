// import { useEffect, useState } from "react";

// function Loader({ onFinish }) {
//   const [text, setText] = useState("");
// //   const fullText = "Initializing Experience...";
//     const fullText = "Welcome, human. Initializing Lochan...";

//   useEffect(() => {
//     let i = 0;

//     const typing = setInterval(() => {
//       setText(fullText.slice(0, i));
//       i++;

//       if (i > fullText.length) {
//         clearInterval(typing);

//         setTimeout(() => {
//           onFinish();
//         }, 800);
//       }
//     }, 50);

//     return () => clearInterval(typing);
//   }, []);

//   return (
//     <div className="fixed inset-0 z-[999] bg-[#0B0F19] flex flex-col items-center justify-center text-white">
      
//       {/* Glow orb */}
//       <div className="w-24 h-24 rounded-full bg-[#00ADB5] blur-3xl opacity-40 animate-pulse absolute"></div>

//       {/* AI rotating ring */}
//       <div className="w-20 h-20 border-2 border-t-[#00ADB5] border-white/10 rounded-full animate-spin mb-6"></div>

//       {/* Typing text */}
//       <p className="text-lg tracking-widest text-gray-300">
//         {text}
//         <span className="animate-pulse">|</span>
//       </p>
//     </div>
//   );
// }

// export default Loader;


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
        <div className="absolute w-40 h-40 bg-[#00ADB5] blur-3xl opacity-40 animate-pulse rounded-full"></div>

        {/* Rotating Ring */}
        <div className="w-24 h-24 border-2 border-t-[#00ADB5] border-white/10 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="mt-6 text-gray-300 tracking-widest animate-pulse">
          {text}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default Loader;