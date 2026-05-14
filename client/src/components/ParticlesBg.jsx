// import Particles from "@tsparticles/react";

// function ParticlesBg() {
//   return (
//     <Particles
//       options={{
//         fullScreen: { enable: false },

//         background: {
//           color: "#0d0d0d",
//         },

//         fpsLimit: 60,

//         particles: {
//           number: {
//             value: 80, // density like Ben's
//             density: {
//               enable: true,
//               area: 800,
//             },
//           },

//           color: {
//             value: "#4FC3F7", // bluish like screenshot
//           },

//           shape: {
//             type: "circle",
//           },

//           opacity: {
//             value: 0.5,
//           },

//           size: {
//             value: { min: 1, max: 3 },
//           },

//           links: {
//             enable: true,
//             distance: 130,
//             color: "#4FC3F7",
//             opacity: 0.4,
//             width: 1,
//           },

//           move: {
//             enable: true,
//             speed: 1,
//             direction: "none",
//             random: false,
//             straight: false,
//             outModes: {
//               default: "out",
//             },
//           },
//         },

//         interactivity: {
//           events: {
//             onHover: {
//               enable: true,
//               mode: "grab", // ⭐ THIS IS KEY (Ben effect)
//             },
//             onClick: {
//               enable: true,
//               mode: "push",
//             },
//           },

//           modes: {
//             grab: {
//               distance: 180,
//               links: {
//                 opacity: 1, // lines become stronger near cursor
//               },
//             },

//             push: {
//               quantity: 4,
//             },
//           },
//         },

//         detectRetina: true,
//       }}
//       className="absolute inset-0 -z-10"
//     />
//   );
// }

// export default ParticlesBg;


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
    // <Particles
    //   id="tsparticles"
    //   className="fixed inset-0 z-0 pointer-events-none"
    //   options={options}
    // />

    // <Particles
    //     id="tsparticles"
    //     className={`${
    //         fullScreen
    //         ? "fixed inset-0 z-0 pointer-events-none"
    //         : "absolute inset-0 z-0 pointer-events-none"
    //     }`}
    //     options={options}
    // />

    // <Particles
    //     id="tsparticles"
    //     style={
    //         fullScreen
    //         ? { position: "fixed", top: 0, left: 0 }
    //         : { position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }
    //     }
    //     className={`${
    //         fullScreen
    //         ? "fixed inset-0 z-0 pointer-events-none"
    //         : "absolute inset-0 z-0 pointer-events-none"
    //     }`}
    //     options={options}
    // />


    // <Particles
    //     id="tsparticles-hero"   // ✅ unique id
    //     style={{
    //         position: "absolute",
    //         top: 0,
    //         left: 0,
    //         width: "100%",
    //         height: "100%",
    //     }}
    // />

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

