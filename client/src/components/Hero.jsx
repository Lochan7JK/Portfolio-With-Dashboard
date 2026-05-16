// src/components/Hero.jsx

import ParticlesBg from "./ParticlesBg";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

function Hero() {
  // const isMobile = window.innerWidth < 768;

const [isMobile, setIsMobile] = useState(false);
const [hero, setHero] = useState(null);

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
            value: ["#00ADB5", "#AFFFFF"], //  multi-color 
          },
          links: {
            enable: false, // ❌ disable default connections
            distance: 120, // closer = more connections
            color: "#00ADB5",
            opacity: 0.5, //  increase visibility
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
            value: { min: 1, max: 2 }, //  smaller dots
          },
        },
        interactivity: {
          detectsOn: "canvas", // ✅ VERY IMPORTANT FIX
          events: {
            onHover: {
                // enable: true,
                enable: !isMobile, // ❌ disable on mobile
                // mode: "grab",
                mode: "connect", //  ONLY on hover
                parallax: { enable: true, smooth: 1000 }, //  smooth motion feel
            },
          },
          modes: {
            connect: {
                distance: 100,
                links: {
                    opacity: 0.15, //  faded edges 
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
          <span className="text-[#AFFFFF] glow-text">
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

        {sequence.length > 0 && (

            <TypeAnimation
            sequence={sequence}

            wrapper="span"
            speed={40}
            deletionSpeed={60}
            repeat={Infinity}
            className="text-white mt-4 text-xl block font-silkscreen hover:text-[#AFFFFF]"
          />

        )}
        
        <button
          className="mt-6 px-6 py-3 border border-[#AFFFFF]/70 hover:border-[#00ADB5] text-white/90 rounded-md relative overflow-hidden group"
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
              className="absolute w-40 h-40 bg-[#00ADB5]/30 rounded-full blur-2xl"
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
          <div className="w-8 h-14 border-2 border-white/60 rounded-full flex justify-center items-start p-1 backdrop-blur-sm hover:border-[#AFFFFF] transition duration-300">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-scroll hover:border-[#AFFFFF]"></div>
          </div>

          {/* Arrow */}
          <div className="text-[#00ADB5] text-xl animate-bounce">
            ↓
          </div>

        </div>
      </a>

    </div>
  );
}

export default Hero;
