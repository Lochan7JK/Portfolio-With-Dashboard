// src/components/ParticlesBg.jsx

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";


function ParticlesBg({ options, fullScreen = false }) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    async function initParticles() {
      const { tsParticles } = await import("@tsparticles/engine");
      await loadSlim(tsParticles);   // ✅ THIS IS THE FIX
      setInit(true);
    }

    initParticles();
  }, []);

  if (!init) return null;

  return (
    <Particles
        id={fullScreen ? "tsparticles-global" : "tsparticles-hero"}
        style={{
            position: fullScreen ? "fixed" : "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        }}
       className={`${
            fullScreen
            ? "fixed inset-0 z-0 pointer-events-none"
            : "absolute inset-0 z-0 pointer-events-none"
        }`}
        options={options}
    />
    
  );
}

export default ParticlesBg;

