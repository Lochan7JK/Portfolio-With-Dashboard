// src/components/Projects.jsx

import snake from "../assets/images/snake-game.png";
import sudoku from "../assets/images/sudoku.png";
import rps1 from "../assets/images/rock-paper-scissors-1.png";
import weather from "../assets/images/weather-app.png";
import mole from "../assets/images/whack-a-mole.png";
import simon from "../assets/images/simon-game.png";
import drum from "../assets/images/drum-kit.png";
import dice from "../assets/images/dice-game.png";
import calc from "../assets/images/calculator.png";
import rps from "../assets/images/rock-paper-scissors.png";
import ttt from "../assets/images/tic-tac-toe.png";
import quiz from "../assets/images/quiz-app.png";
import ProjectCard from "./ProjectCard";
import MajorProjects from "./MajorProjects";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import { EffectCoverflow, Pagination, Navigation } from 'swiper'; // deprecated
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import { useEffect, useState } from "react";
import axios from "axios";


function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          // "http://localhost:5000/minor-projects"
          `${import.meta.env.VITE_API_URL}/projects`
        );

        setProjects(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  //   const projects = [
  //   {
  //     image_url: snake,
  //     title: "Snake Game",
  //     live_url: "https://lochan7jk.github.io/Snake-Game/",
  //   },
  //   {
  //     image_url: sudoku,
  //     title: "Sudoku",
  //     live_url: "https://lochan7jk.github.io/Sudoku/",
  //   },
  //   {
  //     image_url: rps1,
  //     title: "Rock Paper Scissors - 1",
  //     live_url: "https://lochan7jk.github.io/Rock-Paper-Scissor-minus-1/",
  //   },
  //   {
  //     image_url: weather,
  //     title: "Weather App",
  //     live_url: "https://lochan7jk.github.io/Weather-App/",
  //   },
  //   {
  //     image_url: mole,
  //     title: "Whack A Mole",
  //     live_url: "https://lochan7jk.github.io/Whack-a-Mole/",
  //   },
  //   {
  //     image_url: simon,
  //     title: "Simon Game",
  //     live_url: "https://lochan7jk.github.io/Simon-Game/",
  //   },
  //   {
  //     image_url: drum,
  //     title: "Drum Kit",
  //     live_url: "https://lochan7jk.github.io/Drum-Kit/",
  //   },
  //   {
  //     image_url: dice,
  //     title: "Dice Game",
  //     live_url: "https://lochan7jk.github.io/Dice-Game/",
  //   },
  //   {
  //     image_url: calc,
  //     title: "Calculator",
  //     live_url: "https://lochan7jk.github.io/Calc/",
  //   },
  //   {
  //     image_url: rps,
  //     title: "Rock Paper Scissors",
  //     live_url: "https://lochan7jk.github.io/Rock-Paper-Scissor/",
  //   },
  //   {
  //     image_url: ttt,
  //     title: "Tic-Tac-Toe",
  //     live_url: "https://lochan7jk.github.io/Tic-Tac-Toe/",
  //   },
  //   {
  //     image_url: quiz,
  //     title: "Random Quiz App",
  //     live_url: "https://lochan7jk.github.io/A-Random-Quiz/",
  //   }
  // ];


  return (
    
    // <div className="bg-[#222831] py-10 px-5" id="project-section">
    <motion.div
      // id="project-section"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative z-10 py-10 px-5" id="project-section"
    >
      {/* bg-[#222831] */}


      {/* Heading */}
      {/* <h1 className="text-[#EEEEEE] text-3xl text-center mt-10 mb-10 font-poppins">
        Projects
      </h1> */}

      <div className="text-center mb-8 mt-10">
        {/* <h1 className="text-[#EEEEEE] text-3xl font-poppins">Get in Touch ✈️</h1> */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-inter text-white relative inline-block">
            Projects

            {/* underline */}
            <span className="absolute left-4 top-6 w-full h-[16px] -z-5 bg-primary"></span>
            
          </h1>
        </div>
      </div>

      {/* Grid */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-10 my-10">

        <ProjectCard image_url={snake} title="Snake Game" live_url="https://lochan7jk.github.io/Snake-Game/" />
        <ProjectCard image_url={sudoku} title="Sudoku" live_url="https://lochan7jk.github.io/Sudoku/" />
        <ProjectCard image_url={rps1} title="Rock Paper Scissors - 1" live_url="https://lochan7jk.github.io/Rock-Paper-Scissor-minus-1/" />
        <ProjectCard image_url={weather} title="Weather App" live_url="https://lochan7jk.github.io/Weather-App/" />
        <ProjectCard image_url={mole} title="Whack A Mole" live_url="https://lochan7jk.github.io/Whack-a-Mole/" />
        <ProjectCard image_url={simon} title="Simon Game" live_url="https://lochan7jk.github.io/Simon-Game/" />
        <ProjectCard image_url={drum} title="Drum Kit" live_url="https://lochan7jk.github.io/Drum-Kit/" />
        <ProjectCard image_url={dice} title="Dice Game" live_url="https://lochan7jk.github.io/Dice-Game/" />
        <ProjectCard image_url={calc} title="Calculator" live_url="https://lochan7jk.github.io/Calc/" />
        <ProjectCard image_url={rps} title="Rock Paper Scissors" live_url="https://lochan7jk.github.io/Rock-Paper-Scissor/" />
        <ProjectCard image_url={ttt} title="Tic-Tac-Toe" live_url="https://lochan7jk.github.io/Tic-Tac-Toe/" />
        <ProjectCard image_url={quiz} title="Random Quiz App" live_url="https://lochan7jk.github.io/A-Random-Quiz/" />

      </div> */}
      

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-10 my-10">
        {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
        ))}
      </div>  */}


      {/* COOL */}
      {/* <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <ProjectCard {...project} />
          </SwiperSlide>
        ))}
      </Swiper> */}



      {/* COOLER */}
      <div className="max-w-6xl mx-auto px-4 py-4 text-center">
            {/* <h1 className="text-lg text-left text-white mb-1">Minor Projects</h1> */}
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                // slidesPerView={'auto'}
                slidesPerView={3}
                spaceBetween={30}
                speed={800}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                // responsiveness
                breakpoints={{
                  0: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                  clickable: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="swiper_container"
            >
                {/* <SwiperSlide>
                <image_url src={slide_image_1} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                <image_url src={slide_image_2} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                <image_url src={slide_image_3} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                <image_url src={slide_image_4} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                <image_url src={slide_image_5} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                <image_url src={slide_image_6} alt="slide_image" />
                </SwiperSlide>
                <SwiperSlide>
                <image_url src={slide_image_7} alt="slide_image" />
                </SwiperSlide> */}

                {projects.map((project, index) => (
                <SwiperSlide key={index}>
                    {/* <ProjectCard {...project} /> */}
                    <ProjectCard
                      img={project.image_url}
                      title={project.title}
                      description={project.description}
                      link={project.live_url}
                    />
                </SwiperSlide>
                ))}

                <div className="slider-controler">
                    
                {/* <div className="swiper-button-prev slider-arrow">
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </div>
                <div className="swiper-button-next slider-arrow">
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </div> */}

                {/* <div className="swiper-button-prev slider-arrow text-white text-xl">
                    <FaArrowLeft />
                    </div>

                    <div className="swiper-button-next slider-arrow text-white text-xl">
                    <FaArrowRight />
                </div> */}

                <div className="swiper-button-prev !left-0 !text-white">
                  <div className="bg-primary/20 backdrop-blur-md p-3 rounded-full hover:bg-primary transition shadow-lg">
                    <FaArrowLeft />
                  </div>
                </div>

                <div className="swiper-button-next !right-0 !text-white">
                  <div className="bg-primary/20 backdrop-blur-md p-3 rounded-full hover:bg-primary transition shadow-lg">
                    <FaArrowRight />
                  </div>
                </div>
                
                <div className="swiper-pagination"></div>
                </div>
            </Swiper>

    </div>



    <MajorProjects />



      {/* Footer Text */}
      <h4 className="text-gray-100 text-right font-poppins">
        To be continued...
      </h4>
    </motion.div>

  );
}

export default Projects;
