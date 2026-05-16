
// src/components/FloatingSocials.jsx

import { FaLinkedinIn, FaTwitter, FaInstagram, FaEnvelope, FaGithub} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function FloatingSocials() {
  const [socials, setSocials] = useState([]);

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
    linkedin: <FaLinkedinIn />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    email: <MdEmail />,
    github: <FaGithub />,
  };
  

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-6 text-gray-400">

      {socials
        .filter((s) => s.enabled)
        .map((s) => (

          <a
            key={s.id}
            href={s.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="text-2xl hover:text-white hover:scale-125 transition duration-300 hover:drop-shadow-[0_0_10px_#00ADB5]">
              {icons[s.platform]}
            </div>
          </a>
      ))}
    </div>

  );
}

export default FloatingSocials;

