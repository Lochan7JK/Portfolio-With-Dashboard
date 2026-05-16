// src/components/ProjectCard.jsx

import { motion } from "framer-motion";

function ProjectCard({ img, title, description, live }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative bg-[#1e1e2f] w-[300px] rounded-xl overflow-hidden shadow-lg group"
    >
      {/* Image */}
      <img
        src={img}
        alt={title}
        className="w-full h-60 object-cover transition duration-300 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center text-center p-4">
        
        <h5 className="text-white text-lg font-semibold mb-2">
          {title}
        </h5>

        <p className="text-gray-300 text-sm mb-3">
          {/* Built with logic & caffeine ☕ */}
          {description}
        </p>

        <a href={live} target="_blank" rel="noopener noreferrer">
          <button className="bg-primary px-4 py-2 rounded-md text-white hover:scale-105 transition">
            View Project
          </button>
        </a>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
