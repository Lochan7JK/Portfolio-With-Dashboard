// src/components/Projects.jsx

import ProjectCard from "./ProjectCard";
import MajorProjects from "./MajorProjects";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
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
          `${import.meta.env.VITE_API_URL}/minor-projects`
        );

        setProjects(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="w-full relative z-10 py-10 px-5" id="project-section"
    >
      {/* bg-[#222831] */}


      {/* Heading */}
      {/* <h1 className="text-[#EEEEEE] text-3xl text-center mt-10 mb-10 font-poppins">
        Projects
      </h1> */}

      <div className="text-center mb-8 mt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-inter text-white relative inline-block">
            Projects

            {/* underline */}
            <span className="absolute left-4 top-6 w-full h-[16px] -z-5 bg-primary"></span>
            
          </h1>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 py-4 text-center">
            {/* <h1 className="text-lg text-left text-white mb-1">Minor Projects</h1> */}
            {projects?.length > 0 && (
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
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

                {projects.map((project, index) => (
                <SwiperSlide key={index}>
                    <ProjectCard
                      img={project.image_url}
                      title={project.title}
                      description={project.description}
                      live={project.live_url}
                    />
                </SwiperSlide>
                ))}

                <div className="slider-controler">

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
            )}

    </div>



    <MajorProjects />



      {/* Footer Text */}
      <h4 className="text-gray-600 text-right font-poppins">
        To be continued...
      </h4>
    </motion.div>

  );
}

export default Projects;
