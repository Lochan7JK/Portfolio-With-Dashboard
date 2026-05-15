// src/components/Hero.jsx

// function Hero() {
//   return (
//     <div
//       className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat relative"
//       style={{ backgroundImage: "url('src/assets/images/IxHq7M.gif')" }}
//       id="home"
//     >
//       <div className="text-center px-4">
//         <h4 className="text-[#FBF8EF] text-2xl py-2 md:text-3xl">
//           Hello, I'm
//         </h4>

//         <h1 className="text-[#AFFFFF] text-3xl md:text-4xl font-silkscreen">
//           Lochan Singoria
//         </h1>

//         <h4 className="text-[#FBF8EF] text-lg md:text-xl">
//           A Full Stack Web Developer
//         </h4>

//         <p className="text-[#FBF8EF] mt-3 text-base md:text-lg font-chakra max-w-xl mx-auto">
//           Welcome to my digital world! I design websites, write code, and spend
//           90% of my time Googling error messages.
//         </p>
//       </div>
//     </div>
//   );
// }
// 
// export default Hero;



// import { useState } from "react";
// import { motion } from "framer-motion";

// function Hero() {
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const { innerWidth, innerHeight } = window;
//     const x = (e.clientX / innerWidth - 0.5) * 30;
//     const y = (e.clientY / innerHeight - 0.5) * 30;
//     setMouse({ x, y });
//   };

//   return (
//     <div
//       id="home"
//       onMouseMove={handleMouseMove}
//       className="relative flex justify-center items-center h-screen overflow-hidden bg-[#0f172a]"
//     >
      
//       {/* 🔥 Moving Background */}
//       <motion.div
//         animate={{ x: mouse.x, y: mouse.y }}
//         transition={{ type: "spring", stiffness: 50 }}
//         className="absolute inset-0 opacity-10 bg-[url('/images/noise.png')]"
//         style={{
//           backgroundImage: "url('/images/IxHq7M.gif')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           opacity: 0.25,
//         }}
//       />

//       {/* 🔥 Glow Effect */}
//       <div
//         className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
//         style={{
//           background: "#00ADB5",
//           left: `${mouse.x * 5 + 200}px`,
//           top: `${mouse.y * 5 + 200}px`,
//           opacity: 0.2,
//         }}
//       />

//       {/* 🔥 Content */}
//       <div className="relative text-center px-4 z-10">
//         <h4 className="text-[#FBF8EF] text-lg">Hello, I'm</h4>

//         <h1 className="text-[#AFFFFF] text-4xl md:text-6xl font-silkscreen">
//           Lochan Singoria
//         </h1>

//         <h4 className="text-[#FBF8EF] text-lg mt-2">
//           Full Stack Developer
//         </h4>

//         <p className="text-[#FBF8EF] mt-5 text-base md:text-lg max-w-xl mx-auto">
//           I design, build, and debug things until they work… or I cry.
//         </p>
//       </div>

//     </div>
//   );
// }

// export default Hero;



import ParticlesBg from "./ParticlesBg";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

function Hero() {
  // const isMobile = window.innerWidth < 768;

const [isMobile, setIsMobile] = useState(false);
const [hero, setHero] = useState(null);

// console.log(hero?.roles); // (6) ['A Full Stack Web Developer', 'A Problem Solver', 'A Lifelong Learner', 'An Optimist', 'A Melophile and Zoophile', 'A Swimmer']
// console.log(typeof hero?.roles); // object

useEffect(() => {

  const fetchHero = async () => {

    try {

      const res = await axios.get(
        // "http://localhost:5000/hero"
        `${import.meta.env.VITE_API_URL}/hero`
      );

      setHero(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchHero();

}, []);


useEffect(() => {
  const checkScreen = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkScreen(); // initial
  window.addEventListener("resize", checkScreen);

  return () => window.removeEventListener("resize", checkScreen);
}, []);

  const heroParticles = {
        background: {
          color: "#1a1a1a",
        },
        fullScreen: {
          enable: false,
        },
        particles: {
          number: {
            value: 700,
            density: { enable: true },
          },
          color: {
            value: ["#00ADB5", "#AFFFFF"], // 🔥 multi-color 
          },
          links: {
            enable: false, // ❌ disable default connections
            distance: 120, // closer = more connections
            color: "#00ADB5",
            opacity: 0.5, // 🔥 increase visibility
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5, // less = smoother
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 2 }, // 🔥 smaller dots
          },
        },
        interactivity: {
          detectsOn: "canvas", // ✅ VERY IMPORTANT FIX
          events: {
            onHover: {
                // enable: true,
                enable: !isMobile, // ❌ disable on mobile
                // mode: "grab",
                mode: "connect", // 🔥 ONLY on hover
                parallax: { enable: true, smooth: 1000 }, // 🔥 smooth motion feel
            },
          },
          modes: {
            // grab: {
            //   distance: 180,
            //   links: {
            //     opacity: 1,
            //   },
            // },

            connect: {
                distance: 100,
                links: {
                    opacity: 0.15, // 🔥 faded edges (your requirement)
                },
                radius: 350,
            },

          },
        },
        detectRetina: true,
  };


  const sequence =
  hero?.roles?.flatMap((role) => [
    role,
    2000,
  ]) || [];


  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden isolate" id="home">
     
     {/* ONLY HERO PARTICLES */}
      <ParticlesBg options={heroParticles} />

      {/* Content */}
      <div className="text-center z-10 relative px-4">
        <h1 className="text-white text-4xl md:text-6xl">
          Hello, I'm 
          <span className="text-accent glow-text">
            {/* Lochan */}
            {hero?.name}
          </span>
        {/* </h1> */}
        <span className="text-gray-500 text-sm md:text-lg mt-2 block">
          {/* And I'm Not a Wizard or Chinese (I wish I were...) */}
          {hero?.tagline1}
        </span>
        <span className="text-gray-500 text-sm md:text-lg block">
          {/* But Definitely I'm */}
          {hero?.tagline2}
        </span>
        </h1>


        {/* <p className="text-gray-400 mt-4 text-lg font-poppins">
          I'm a full stack web developer.
        </p> */}


        {/* {hero?.roles?.length > 0 && ( */}
        {sequence.length > 0 && (

            <TypeAnimation
            // WORKING BUT STATIC ✅
            // sequence={[
            //   "A Full Stack Web Developer",
            //   2000,
            //   "A Problem Solver",
            //   2000,
            //   "An Optimist",
            //   2000,
            //   "A Melophile and Zoophile",
            //   2000,
            //   "A Swimmer",
            //   2000,
            //   "A Lifelong Learner",
            //   2000,
            // ]} 

            //FAILED ❌
            // sequence={
            //   hero?.roles
            //     ? hero.roles.flatMap((role) => [role, 2000])
            //     : []
            // } 

            // sequence={typeSequence} //FAILED ❌

            // WORKING AND DYNAMIC✅ 
            // sequence={hero.roles.flatMap((role) => [
            //     role,
            //     2000,
            // ])}

            // OPTIMIZED ABOVE WORKING CODE ✅
            sequence={sequence}

            wrapper="span"
            speed={40}
            deletionSpeed={60}
            repeat={Infinity}
            className="text-white mt-4 text-xl block font-silkscreen hover:text-accent"
          />

        )}

        {/* <button className="mt-6 border border-[#AFFFFF] text-[#AFFFFF] px-6 py-2 rounded-md hover:bg-[#AFFFFF]-500 hover:text-white transition">
          View my work ↓
        </button> */}

        {/* className="mt-6 px-6 py-3 rounded-md border border-white/10 text-[#00ADB5] 
                    hover:bg-[#00ADB5] hover:text-white transition 
                    shadow-[0_0_10px_#00ADB5] hover:shadow-[0_0_4px_#00ADB5]" */}
        
        <button
          className="mt-6 px-6 py-3 border border-accent/70 hover:border-primary text-white/90 rounded-md relative overflow-hidden group"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.style.setProperty("--x", `${x}px`);
            e.currentTarget.style.setProperty("--y", `${y}px`);
          }}
          onClick={() => {
            document
              .getElementById("contact-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="relative z-10 group-hover:text-white transition">
            {/* Summon Me */}
            {hero?.cta_text}
          </span>

          {/* Magnetic glow */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
            <span
              className="absolute w-40 h-40 bg-primary/30 rounded-full blur-2xl"
              style={{
                left: "var(--x)",
                top: "var(--y)",
                transform: "translate(-50%, -50%)",
              }}
            />
          </span>
        </button>

      </div>


      <a href="#about-section">
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer transition-all duration-300 hover:scale-110">
  
          {/* Mouse shape */}
          <div className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center items-start p-1 backdrop-blur-sm hover:border-accent">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll hover:border-accent"></div>
          </div>

          {/* Arrow */}
          <div className="text-primary text-xl animate-bounce">
            ↓
          </div>

        </div>
      </a>

    </div>
  );
}

export default Hero;
