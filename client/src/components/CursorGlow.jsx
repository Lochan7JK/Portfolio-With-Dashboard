// src/components/CursorGlow.jsx

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
      <div className="w-40 h-40 bg-primary opacity-20 rounded-full blur-3xl" />
    </div>
  );
}

export default CursorGlow;
