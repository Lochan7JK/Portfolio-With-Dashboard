// src/components/About.jsx

import SkillCard from "./SkillCard";

// import images
import html from "../assets/images/html.png";
import css from "../assets/images/css.png";
import js from "../assets/images/js.png";
import mongodb from "../assets/images/mongodb.png";
import express from "../assets/images/espressjs.png";
import react from "../assets/images/react.png";
import node from "../assets/images/nodejs.png";
import c from "../assets/images/c.png";
import cpp from "../assets/images/cpp.png";
import java from "../assets/images/java.png";
import postgresql from "../assets/images/postgresql.png";
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
      {/* bg-[#222831] */}

    {/* // <motion.div
    //   id="about-section"
    //   initial={{ opacity: 0, y: 80 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6 }}
    //   viewport={{ once: true }}
    //   className="bg-[#222831] min-h-screen py-10 px-5"
    // > */}
      
      {/* Heading */}
      {/* <h1 className="text-[#EEEEEE] text-3xl text-center mt-10 mb-10 font-poppins">
        About
      </h1> */}
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold font-inter text-white relative inline-block">
        About

        {/* underline */}
        <span className="absolute left-4 top-6 w-full h-4 -z-5 bg-primary"></span>
        
      </h1>
    </div>

      {/* Main Grid */}
      {/* <div className="grid md:grid-cols-2 gap-10 items-center"> */}
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

        {/* Left: About Me */}
        {/* <div className="flex flex-col items-center text-center gap-4 mt-10"> */}

        {/* <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col items-center text-center gap-4 mt-10"
        > */}

        {/* <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-4 mt-10"
        > */}

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
          
          {/* Icon */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#EEEEEE] w-32 h-32"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg> */}

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

          {/* <p className="text-[#EEEEEE] text-sm md:text-base font-poppins max-w-md">
            // My core strengths lie in Java, OOPs, and Data Structures & Algorithms, which help me write optimized and maintainable code. I also have experience with MySQL, Postman, and foundational knowledge of C and C++.
            {about.description}
          </p> */}

          {/* <p className="text-[#EEEEEE] text-sm md:text-base font-poppins max-w-md"> */}
            {/* Beyond coding, I’m a lifelong learner, a problem solver and always a curious mind.  */}
            {/* Always learning. Always building. Always improving. */}
            {/* So yeah, let's connect and build something cool together! */}
          {/* </p> */}


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

        {/* Right: Skills */}
        {/* <div className="flex justify-center items-start gap-6 mt-15"> */}

        {/* <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-start gap-6 mt-15"
        > */}

        {/* <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center items-start gap-6 mt-15"
        > */}

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
            <div className="flex flex-col gap-6 w-30 mt-14">
                <SkillCard image={html} name="HTML"  delay={0.2}/>
                <SkillCard image={css} name="CSS" delay={0.8}/>
                <SkillCard image={js} name="JAVASCRIPT" delay={0.4}/>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6 w-30 mt-14">
                <SkillCard image={mongodb} name="MONGODB" delay={0.6}/>
                <SkillCard image={express} name="EXPRESS.JS" delay={1.0}/>
                <SkillCard image={react} name="REACT" delay={0.3}/>
                <SkillCard image={node} name="NODE.JS" delay={0.9}/>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6 w-30 mt-14">
                <SkillCard image={cpp} name="C++" delay={0.5}/>
                <SkillCard image={java} name="JAVA" delay={1.1}/>
                <SkillCard image={postgresql} name="POSTGRESQL" delay={0.7}/>
            </div>

        </motion.div>


      </motion.div>
    </div>
  );
}

export default About;
