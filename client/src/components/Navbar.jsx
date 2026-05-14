import { useState, useEffect } from "react";
import { motion } from "framer-motion";


function Navbar() {
  const [active, setActive] = useState("home");

  const sections = ["home", "about-section", "project-section", "contact-section"];

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll function
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
    });
  };

  const navItems = [
    { id: "home", label: "// home" },
    { id: "about-section", label: "// about" },
    { id: "project-section", label: "// project" },
    { id: "contact-section", label: "// contact" },
  ];

  return (
    <div className="w-full sticky top-0 z-35 backdrop-blur-md py-4 border-b border-black/20 shadow-lg
        bg-gradient-to-r from-[#0f172a]/80 via-[#111827]/70 to-[#272B31]/92">
    {/* <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full sticky top-0 z-50 backdrop-blur-md py-4 border-b border-black/20 shadow-lg
        bg-gradient-to-r from-[#0f172a]/80 via-[#111827]/70 to-[#272B31]/92" 
        // [#0f172a]
    > */}

        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: {},
                visible: {
                transition: {
                    staggerChildren: 0.1,
                },
                },
            }}
            className="flex justify-center md:justify-end px-6 md:px-16 gap-8 md:gap-10 text-md md:text-lg font-semibold"
        >

        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            onClick={() => scrollToSection(item.id)}

            variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0 },
            }}

            whileHover={{ scale: 1.0 }}
            whileTap={{ scale: 0.95 }}

            className={`relative cursor-pointer transition-all duration-300 
              ${
                active === item.id
                  ? "text-[#00ADB5]"
                  : "text-white hover:text-[#00ADB5]"
              }
            `}

            // className={`relative cursor-pointer transition-all duration-300 
            //     ${
            //         active === item.id
            //         ? "text-[#00ADB5]"
            //         : "text-gray-400 hover:text-[#00ADB5]"
            //     }
            // `}
          >
            <span className="absolute right-3 bottom-0 w-0 h-[2px] text-xs bg-[#00ADB5] transition-all duration-300 group-hover:w-full">
                {String(index + 1).padStart(2, "0")}
            </span>

            {/* <span className="mr-2 text-sm text-gray-500">
              {String(index + 1).padStart(2, "0")}
            </span> */}

            {item.label}

            {/* Underline */}
            <span
                className={`absolute left-0 h-[2px] bg-[#00ADB5] transition-all duration-300 ${
                active === item.id
                    ? "w-full shadow-[0_0_10px_#00ADB5]"
                    : "w-0 group-hover:w-full"
                }`}
            ></span>

            
          </motion.div>

          
        ))}

      </motion.div>
    </div>
  );
}

export default Navbar;