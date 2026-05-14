import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";


function MusicToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Optional: try autoplay (may be blocked)
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.3;

    // autoplay attempt (browser may block)
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src="/music/calm-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Button */}
      <motion.button
        onClick={toggleMusic}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}

        animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1.5 }}

        className="fixed bottom-6 right-6 z-50 
                   bg-[#0f172a]/10 backdrop-blur-md 
                   border border-white/10 
                   text-white p-4 rounded-full shadow-lg 
                   hover:shadow-[0_0_15px_#00ADB5] 
                   transition"
      >
        {/* {isPlaying ? "🔊" : "🔇"} */}
        {isPlaying ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
      </motion.button>
    </>
  );
}

export default MusicToggle;