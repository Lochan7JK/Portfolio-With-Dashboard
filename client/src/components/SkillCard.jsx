// src/components/SkillCard.jsx

import { motion } from "framer-motion";

function SkillCard({ image, name, delay }) {
  return (
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
                  bg-gradient-to-r from-light via-primary to-[#393E46] 
                  p-[2px]"
      >

      

      <div className="bg-dark h-full flex flex-col items-center justify-center rounded-md">
        <img src={image} alt={name} className="h-[40px] mb-1" />
        <p className="text-light text-sm">{name}</p>
      </div>
    </motion.div>
  );
}

export default SkillCard;
