import { useEffect, useState } from "react";

function ScrollIndicator() {
  const [scrollY, setScrollY] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;

      const currentScroll = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // % scroll
      const progress = currentScroll / totalHeight;

      setScrollY(progress);

      // 👇 hide in hero section
      setShow(currentScroll > heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`hidden md:block fixed left-3 top-0 h-full w-[2px] z-50 transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background line */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/10" />

      {/* Progress line */}
      <div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          height: `${scrollY * 100}%`,
          background: "linear-gradient(to bottom, #AFFFFF, #00ADB5, #8B5CF6)",
            // background: "linear-gradient(to bottom, #00ADB5, #AFFFFF)",
        //   boxShadow: "0 0 10px #00ADB5",
        boxShadow: "0 0 12px #00ADB5, 0 0 20px #00ADB5"
        }}
      />

      {/* Little angled segment (the stylish kink) */}
      <div
        className="absolute w-[2px] h-10"
        style={{
          top: `${scrollY * 100}%`,
          left: "0px",
          transform: "translateY(-50%) rotate(25deg)",
          background: "linear-gradient(to bottom, #8B5CF6, #00ADB5 #AFFFFF)",
        }}
      />
    </div>
  );
}

export default ScrollIndicator;