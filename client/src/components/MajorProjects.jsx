import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { useEffect, useState } from "react";
import axios from "axios";

// const projects = [
//   {
//     title: "Book Notes App",
//     desc: "Developed a scalable and user-centric PERN stack application for tracking and managing book notes, featuring CRUD operations, structured PostgreSQL storage, and a responsive React UI for seamless user interaction.",
//     tech_stack: ["PostgreSQL", "Express", "React", "Node"],
//     image_url: "src/assets/image_urls/book-notes.png",
//     live_url: "https://book-notes-app-render-frontend.onrender.com/",
//     github_url: "https://github_url.com/Lochan7JK/Book-Notes-App",
//   },
//   {
//     title: "Personal Portfolio",
//     desc: "Engineered a dynamic portfolio platform with React and Tailwind CSS, featuring advanced UI interactions and developed a scalable dashboard system for content management and analytics.",
//     impact: "Architecting a custom admin dashboard to enable dynamic content management, project updates, and analytics without code changes.",
//     tech_stack: ["React", "Node", "Express", "PostgreSQL"],
//     image_url: "src/assets/image_urls/portfolio.png",
//     live_url: "#",
//     github_url: "#",
//   },
//   {
//     title: "Event Planning Website",
//     desc: "Contributed to the development of a scalable full-stack event management platform using MongoDB, Express, React, and Node.js, enabling users to browse, create, and manage events with real-time data handling.",
//     impact: "Reduced operational complexity by centralizing event management processes into a single, scalable system.",
//     tech_stack: ["MERN Stack"],
//     image_url: "src/assets/image_urls/be.png",
//     live_url: "https://blessedevents.netlify.app/",
//     github_url: "",
//   }
// ];


function MajorProjects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/projects");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
        setProjects(res.data);
      } catch (err) {
        console.log("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative z-10 py-16 md:py-24 px-4 md:px-10 ml-5 mr-5">
      
      {/* <h1 className="text-white text-3xl text-center mb-20">
        Major Projects
      </h1> */}
      

      {projects.map((project, index) => (
        <div
          key={index}
          
          className={`min-h-screen grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-10 md:mb-12 bg-gradient-to-r from-black/70 to-transparent ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >

        {/* LEFT SIDE */}
            <div className="md:sticky md:top-32 self-start pl-20 pb-20">
                {/* text-center md:text-left flex flex-wrap justify-center md:justify-start gap-2 */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl text-white/80 mb-4 pt-15 font-silkscreen glow-text-2"
            >
              {project.title}
            </motion.h2>

            <p className="text-gray-400 mb-4 pl-7 pt-1 font-poppins">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6 pl-7 pt-1">
              {project.tech_stack?.map((t, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/10 text-white/50 font-silkscreen"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pl-7 pt-1">
              <a
                href={project.live_url}
                className="px-4 py-2 bg-primary text-white/90 rounded-md hover:opacity-80 font-poppins"
                target="_blank"
              >
                live_url
              </a>

              <a
                href={project.github_url}
                className="px-4 py-2 border border-white/20 rounded-md bg-white/15 hover:bg-white/10 text-white/50 font-poppins"
                target="_blank"
              >
                github_url
              </a>
            </div>
          </div>


        {/* RIGHT SIDE */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start gap-2"
           > */}
            {/* <img
              src={project.image_url}
              alt={project.title}
              className="rounded-xl shadow-[0_0_40px_rgba(0,173,181,0.3)] hover:scale-105 transition duration-500"
            /> */}
            {/* <img
                src={project.image_url}
                alt={project.title}
                className="w-full max-w-[500px] mx-auto md:max-w-[600px] rounded-xl shadow-[0_0_40px_rgba(0,173,181,0.3)] hover:scale-105 transition duration-500"
            />
          </motion.div> */}

        <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            scale={1.03}
            transitionSpeed={1000}
            glareEnable={true}
            glareMaxOpacity={0.2}
            className="mx-auto w-full max-w-[500px] md:max-w-[600px]"
        >
            <img
                src={project.image_url}
                alt={project.title}
                className="rounded-xl shadow-[0_0_40px_rgba(0,173,181,0.3)]"
            />
        </Tilt>

        </div>
      ))}
    </section>
  );
}

export default MajorProjects;
