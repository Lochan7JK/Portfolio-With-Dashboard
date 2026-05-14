// src/components/SkillCard.jsx

import { motion } from "framer-motion";

function SkillCard({ image, name, delay }) {
  return (
    // <motion.div
    //   variants={{
    //     hidden: { opacity: 0, y: 40, scale: 0.9 },
    //     visible: {
    //       opacity: 1,
    //       y: 0,
    //       scale: 1,
    //       transition: { duration: 0.4, ease: "easeOut" },
    //     },
    //   }}

    //   // whileHover={{ scale: 1.1 }}
    //   whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px #00ADB5" }}

    //   className="h-[90px] w-full rounded-md border-2 border-transparent 
    //              bg-gradient-to-r from-[#EEEEEE] via-[#00ADB5] to-[#393E46] 
    //              p-[2px] transition duration-300"
    // >

    // <motion.div
    //   variants={{
    //     hidden: { opacity: 0, scale: 0.92 },
    //     visible: {
    //       opacity: 1,
    //       scale: 1,
    //       transition: {
    //         duration: 0.5,
    //         ease: [0.25, 0.1, 0.25, 1], // smooth cubic-bezier
    //       },
    //     },
    //   }}
    //   whileHover={{
    //     scale: 1.08,
    //     boxShadow: "0px 0px 15px #00ADB5",
    //   }}
    //   className="h-[90px] w-full rounded-md border-2 border-transparent 
    //             bg-gradient-to-r from-[#EEEEEE] via-[#00ADB5] to-[#393E46] 
    //             p-[2px] transition duration-300"
    // >

     <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: "0px 0px 15px #00ADB5",
        }}
        
        className="h-[90px] w-full rounded-md border-2 border-transparent 
                  bg-gradient-to-r from-[#EEEEEE] via-[#00ADB5] to-[#393E46] 
                  p-[2px]"
      >

      

      <div className="bg-[#222831] h-full flex flex-col items-center justify-center rounded-md">
        <img src={image} alt={name} className="h-[40px] mb-1" />
        <p className="text-[#EEEEEE] text-sm">{name}</p>
      </div>
    </motion.div>
  );
}

export default SkillCard;
