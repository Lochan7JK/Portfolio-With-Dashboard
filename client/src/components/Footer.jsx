// src/components/Footer.jsx

// import x from "../assets/images/x.png";
// import linkedin from "../assets/images/linkedin.png";
// import github from "../assets/images/github.png";

// function Footer() {
//   return (
//     <footer className="relative z-10 py-6">
//       {/* bg-gradient-to-r from-[#EEEEEE] to-[#00AD85] */}

//       {/* Icons */}
//       <div className="flex justify-center items-center gap-4 mb-4">
//         <a
//           href="https://x.com/LochanSing13646"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={x} alt="twitter" className="h-8 hover:scale-110 transition duration-300" />
//         </a>

//         <a
//           href="https://www.linkedin.com/in/lochan-singoria-503347243/"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={linkedin} alt="linkedin" className="h-8 hover:scale-110 transition duration-300" />
//         </a>

//         <a
//           href="https://github.com/Lochan7JK"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <img src={github} alt="github" className="h-8 hover:scale-110 transition duration-300" />
//         </a>
//       </div>

//       {/* Text */}
//       <p className="text-center text-[#EEEEEE] text-sm">
//         © Lochan Singoria. All rights reserved.
//       </p>
//     </footer>
//   );
// }

// export default Footer;




import { FaGithub, FaLinkedinIn, FaTwitter, FaArrowUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function Footer() {
  const [socials, setSocials] = useState([]);

//🔹 Fetch footer 
    useEffect(() => {
        const fetchSocials = async () => {
            try {
            const res = await axios.get(
                // "http://localhost:5000/social-links"
                `${import.meta.env.VITE_API_URL}/social-links`
            );

            setSocials(res.data);

            } catch (err) {
            console.log(err);
            }
        };

        fetchSocials();

    }, []);

    
    const icons = {
        github: <FaGithub size={30} />,
        linkedin: <FaLinkedinIn size={30} />,
        twitter: <FaTwitter size={30} />,
    };



  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const reset = () => {
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  // if (window.innerWidth < 768) return;

  return (
  // <footer className="relative z-10 px-6 py-9 text-gray-400 border-t border-white/10 backdrop-blur-md bg-white/5">
  <footer className="relative z-10 px-6 py-9 text-gray-400 border-t border-white/10">

    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      {/* 🌊 Wave */}
    {/* <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
      <div className="w-[200%] animate-wave">
        <svg
          className="relative block w-full h-[80px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#00ADB5"
            fillOpacity="0.15"
            d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,176C1120,160,1280,160,1360,160L1440,160L1440,0L0,0Z"
          />
        </svg>
      </div>
    </div> */}


    {/* 🌊 Dual Waves */}
    <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">

      {/* Back Wave (slower) */}
      <div className="w-[200%] animate-waveSlow opacity-40">
        <svg
          className="block w-full h-[90px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00ADB5" />
              <stop offset="50%" stopColor="#AFFFFF" />
              <stop offset="100%" stopColor="#00ADB5" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient1)"
            fillOpacity="0.2"
            d="M0,160L80,176C160,192,320,224,480,224C640,224,800,192,960,176C1120,160,1280,160,1360,160L1440,160L1440,0L0,0Z"
          />
        </svg>
      </div>

      {/* Front Wave (faster) */}
      <div className="w-[200%] animate-waveFast -mt-[70px]">
        <svg
          className="block w-full h-[90px]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AFFFFF" />
              <stop offset="50%" stopColor="#00ADB5" />
              <stop offset="100%" stopColor="#AFFFFF" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient2)"
            fillOpacity="0.25"
            d="M0,180L80,170C160,160,320,200,480,210C640,220,800,200,960,180C1120,160,1280,170,1440,180L1440,0L0,0Z"
          />
        </svg>
      </div>

    </div>


      
    {/* Glow background */} 
    {/* <div className="absolute inset-0 bg-[#00ADB5]/5 blur-3xl z-10"> */}

      <div className="flex flex-col pt-6 text-center text-sm">


         {/* ⬆️Back to top button */}
        {/* <div className="flex justify-center mb-6">
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="group flex flex-col items-center text-gray-400 hover:text-white transition animate-pulse hover:animate-none"
          > */}
            {/* Outer circle */}
            {/* <div className="w-14 h-14 flex items-center justify-center rounded-full backdrop-blur-md border border-white/10 bg-[#0f172a]/10  group-hover:shadow-[0_0_15px_#00ADB5] transition duration-300"> */}
              
              {/* Arrow */}
              {/* <span className="text-lg group-hover:text-[#AFFFFF] group-hover:-translate-y-1 transition duration-300"> */}
                {/* ↑ */}
                {/* <FaArrowUp className="group-hover:-translate-y-1 group-hover:scale-110 transition duration-300" />
              </span>
            </div> */}

            {/* Text */}
            {/* <span className="text-xs mt-2 tracking-widest opacity-70 group-hover:opacity-100">
              BACK TO TOP
            </span> */}

            {/* <span className="text-xs mt-2 tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
              BACK TO TOP
            </span> */}
          {/* </button>
        </div> */}



        <div className="flex justify-center mb-6">
          <button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="group flex flex-col items-center text-gray-400 hover:text-white transition animate-pulse hover:animate-none"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-full border border-white/10 bg-[#0f172a]/10 backdrop-blur-md group-hover:text-[#AFFFFF] group-hover:shadow-[0_0_20px_#00ADB5] transition duration-300">
              <FaArrowUp className="group-hover:-translate-y-1 group-hover:scale-110 transition duration-300" />
            </div>

            <span className="text-xs mt-2 tracking-widest opacity-70 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
              BACK TO TOP
            </span>
          </button>
        </div>


        {/* Social buttons */}
        {/* <div className="flex gap-4 justify-center mb-3">
          <a href="https://github.com/Lochan7JK" target="_blank" className="hover:text-white hover:scale-125 transition">
            <FaGithub size={30}/>
          </a>
          <a href="https://www.linkedin.com/in/lochan-singoria-503347243/" target="_blank" className="hover:text-white hover:scale-125 transition">
            <FaLinkedinIn size={30}/>
          </a>
          <a href="https://x.com/LochanSing13646" target="_blank" className="hover:text-white hover:scale-125 transition">
            <FaTwitter size={30}/>
          </a>
        </div> */}

        <div className="flex gap-4 justify-center mb-3">

            {socials
                .filter((s) => s.enabled)
                .map((s) => (

                <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white hover:scale-125 transition"
                >
                    {icons[s.platform]}
                </a>
            ))}
        </div>

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()} Lochan. All rights reserved.
        </p>

        {/* Extra line */}
        <p className="text-xs text-gray-500">
          Designed & Built with ❤️ 
        </p>

      </div>

    {/* </div> */}

    </footer>
  );
}

export default Footer;
