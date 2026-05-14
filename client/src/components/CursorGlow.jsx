// import { useEffect, useState } from "react";

// function CursorGlow() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const move = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", move);

//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   return (
//     <div
//       className="pointer-events-none fixed z-10 hidden md:block"
//       style={{
//         left: position.x,
//         top: position.y,
//         transform: "translate(-50%, -50%)",
//       }}
//     >
//       <div className="w-40 h-40 bg-[#00ADB5] opacity-20 rounded-full blur-3xl" />
//     </div>
//   );
// }

// export default CursorGlow;




import { useEffect, useState } from "react";

function CursorGlow() {
  const [isMobile, setIsMobile] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [showGlow, setShowGlow] = useState(true);

  // detect screen
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  // track mouse
  useEffect(() => {
    if (isMobile) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const hero = document.getElementById("home");

      if (hero) {
        const rect = hero.getBoundingClientRect();

        const insideHero =
          e.clientY >= rect.top && e.clientY <= rect.bottom;

        setShowGlow(!insideHero); // ❌ disable inside hero
      }
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile]);

  if (isMobile || !showGlow) return null; // ✅ hidden in hero

  return (
    <div
      className="pointer-events-none fixed z-10 hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-40 h-40 bg-[#00ADB5] opacity-20 rounded-full blur-3xl" />
    </div>
  );
}

export default CursorGlow;






// import { useEffect, useState } from "react";

// function CursorGlow() {
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [smooth, setSmooth] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const move = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", move);
//     return () => window.removeEventListener("mousemove", move);
//   }, []);

//   useEffect(() => {
//     const animate = () => {
//       setSmooth((prev) => ({
//         x: prev.x + (position.x - prev.x) * 0.1,
//         y: prev.y + (position.y - prev.y) * 0.1,
//       }));
//       requestAnimationFrame(animate);
//     };

//     animate();
//   }, [position]);

//   return (
//     <div
//       className="pointer-events-none fixed z-10 hidden md:block"
//       style={{
//         left: smooth.x,
//         top: smooth.y,
//         transform: "translate(-50%, -50%)",
//       }}
//     >
//       <div className="w-40 h-40 bg-[#00ADB5] opacity-20 rounded-full blur-3xl" />
//     </div>
//   );
// }

// export default CursorGlow;