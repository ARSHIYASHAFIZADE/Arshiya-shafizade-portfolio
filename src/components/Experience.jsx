import React from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div
      className="
        p-6 rounded-2xl flex flex-col
        bg-[rgba(15,15,45,0.6)] backdrop-blur-md
        border border-[rgba(255,255,255,0.08)]
        shadow-lg shadow-blue-900/20
        h-full
      "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        y: -6,
        boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
        borderColor: "rgba(139, 92, 246, 0.4)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
    >
      {/* Icon + Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 shrink-0 rounded-xl bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[70%] h-[70%] object-cover rounded-lg"
          />
        </div>
        <div>
          <h3 className="text-white font-bold text-[17px] leading-tight">
            {experience.title}
          </h3>
          <p className="text-purple-300 text-[13px] font-medium mt-0.5">
            {experience.company_name}
          </p>
          <p className="text-purple-400/60 text-[12px] italic mt-0.5">
            {experience.date}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-4" />

      {/* Points */}
      <ul className="flex flex-col gap-2 flex-1">
        {experience.points.map((point, index) => (
          <li key={`point-${index}`} className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <p className="text-purple-100/80 text-[13px] leading-relaxed">
              {point}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center">
        <p className={`${styles.sectionSubText} text-purple-200`}>
          What I have built
        </p>
        <h2
          className={`${styles.sectionHeadText} text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-300 drop-shadow-lg`}
        >
          Projects.
        </h2>
      </motion.div>

      <div className="mt-10" style={{ clipPath: "inset(-40px 0px -40px 0px)" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          pagination={{ clickable: true }}
          navigation
          modules={[Pagination, Navigation, Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: true, pauseOnMouseEnter: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: "48px" }}
        >
          {experiences.map((experience, index) => (
            <SwiperSlide
              key={`experience-${index}`}
              style={{ height: "auto", alignSelf: "stretch", display: "flex" }}
            >
              <div className="w-full flex">
                <ExperienceCard experience={experience} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
