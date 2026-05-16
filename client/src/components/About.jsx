// src/components/About.jsx

import SkillCard from "./SkillCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";

function About() {

  const [about, setAbout] = useState(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/about");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/about`);
        setAbout(res.data);
      } catch (err) {
        console.log("Error fetching about:", err);
      }
    };

    fetchAbout();
  }, []);

  if (!about) return null;

  return (
    <div className="relative z-10 min-h-screen py-10 px-5" id="about-section">
      
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold font-inter text-white relative inline-block">
        About

        {/* underline */}
        <span className="absolute left-4 top-6 w-full h-4 -z-5 bg-primary"></span>
        
      </h1>
    </div>

      {/* Main Grid */}
      <motion.div
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        initial="hidden"
        whileInView="visible" //on scrolling it'll trigger animation 
        // animate="visible" //on loading/refreshing it'll trigger animation 
        className="grid md:grid-cols-2 gap-10 items-center"
      >
      
        <motion.div
          variants={{
            hidden: { x: -120, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                duration: 0.8,
                ease: "easeOut",
              },
            },
          }}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex flex-col items-center text-center gap-4 mt-10"
        >
          
          <svg
            width="180"
            height="180"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-0 transition duration-500 hover:scale-110 hover:rotate-2"
          >
            <defs>
              <linearGradient id="gradientStroke" x1="0" y1="0" x2="200" y2="200">
                <stop offset="0%" stopColor="#00ADB5" />
                <stop offset="100%" stopColor="#AFFFFF" />
              </linearGradient>
            </defs>

            {/* Head */}
            <circle
              cx="100"
              cy="60"
              r="30"
              stroke="url(#gradientStroke)"
              strokeWidth="3"
            />

            {/* Body */}
            <path
              d="M40 160C40 120 70 100 100 100C130 100 160 120 160 160"
              stroke="url(#gradientStroke)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

          {/* Text before: font-chakra*/}
          <p className="text-light text-sm md:text-base font-poppins max-w-md">
            {/* I’m a full-stack developer skilled in MERN and PERN stacks, passionate about building responsive and efficient web applications. */}
            {about.intro}
          </p>

          {about.description.split("\n").map((line, i) => (
            <p key={i} className="text-light text-sm md:text-base font-poppins max-w-md">
              {line}
            </p>
          ))}

          {/* Button */}
          <a
            // href="/resume.pdf"   // or your hosted resume link
            href={about.resume_url}
            target="_blank"
            rel="noopener noreferrer"
            >
            <button className="bg-primary text-white/90 rounded-md hover:opacity-80 px-5 py-3 mt-1">
                View Resume
            </button>
            </a>
        </motion.div>

        <motion.div
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3, // 👈 starts after left finishes
              },
            },
          }}
          className="flex justify-center items-start gap-6 mt-15"
        >
        
            {/* Column 1 (gap-4 w-1/4) */}
            <div className="flex flex-col gap-6 w-30 mt-27">
              {/* image={html} */}
                <SkillCard image="/images/html.png" name="HTML"  delay={0.2}/>
                <SkillCard image="/images/css.png" name="CSS" delay={0.8}/>
                <SkillCard image="/images/js.png" name="JAVASCRIPT" delay={0.4}/>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 w-30 mt-14">
                <SkillCard image="/images/mongodb.png" name="MONGODB" delay={0.6}/>
                <SkillCard image="/images/espressjs.png" name="EXPRESS.JS" delay={1.0}/>
                <SkillCard image="/images/react.png" name="REACT" delay={0.3}/>
                <SkillCard image="/images/nodejs.png" name="NODE.JS" delay={0.9}/>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 w-30 mt-27">
                <SkillCard image="/images/cpp.png" name="C++" delay={0.5}/>
                <SkillCard image="/images/java.png" name="JAVA" delay={1.1}/>
                <SkillCard image="/images/postgresql.png" name="POSTGRESQL" delay={0.7}/>
            </div>

        </motion.div>


      </motion.div>
    </div>
  );
}

export default About;
