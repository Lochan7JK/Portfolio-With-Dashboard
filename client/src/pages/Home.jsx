// src/pages/Home.jsx

import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import MusicToggle from "../components/MusicToggle";
import ParticlesBg from "../components/ParticlesBg";
import CursorGlow from "../components/CursorGlow";
import FloatingSocials from "../components/FloatingSocials";
import ScrollIndicator from "../components/ScrollIndicator";

import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AnimatePresence, motion } from "framer-motion";


function Home() {
  
  const globalParticles = {
        background: {
          color: "#1a1a1a",
        },
        fullScreen: {
          enable: true, // stays global
        },
        particles: {
          number: {
            value: 270,
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
            speed: 0.3, // less = smoother
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 1, max: 2 }, // 🔥 smaller dots
          },
        },

        // ❌ IMPORTANT: completely disable interactivity
        interactivity: {
          detectsOn: "canvas", // 👈 IMPORTANT (not window)
          events: {
            onHover: {
              enable: false,
            },
            onClick: {
              enable: false,
            },
          },
        },
};


  const [loading, setLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");

    if (!visited) {
      // FIRST VISIT
      sessionStorage.setItem("visited", "true");

      setFirstVisit(true);

      // show welcome message for 2 sec
      setTimeout(() => {
        setFirstVisit(false);
      }, 2000);

    } else {
      // REVISIT
      setLoading(true);

      const messages = [
        "Connecting...",
        "Welcome back 👀",
        "Take a deeeeep breath",
        "Booting again...",
        "Summoning Lochan...",
      ];

      setLoaderText(messages[Math.floor(Math.random() * messages.length)]);

      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  }, []);



  return (

      <AnimatePresence mode="wait">
        {firstVisit ? (

          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-[#191919] flex items-center justify-center"
          >
            <h1 className="text-white text-xl md:text-4xl tracking-widest text-center">
              <span className="text-[#00ADB5]">Welcome creature</span>, <br />
              mucho gusto 👀
            </h1>
          </motion.div>


        ) : loading ? (
          <Loader key="loader" text={loaderText} />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >

            <div className="relative">
              <FloatingSocials />
              <CursorGlow />

              {/* GLOBAL FLOATING PARTICLES */}
              <ParticlesBg options={globalParticles} fullScreen={true} />

              <ScrollIndicator />
              <Hero />
              <Navbar />
              <About />
              <Projects />
              <Contact />
              <MusicToggle /> {/* 👈 floating button */}
              <Footer /> 

            </div>


          </motion.div>
        )}
      </AnimatePresence>

  );
}

export default Home;
