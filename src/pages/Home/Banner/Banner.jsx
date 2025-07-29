import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";  
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";  

import banner1 from "../../../assets/banner image/banner1.png";
import banner2 from "../../../assets/banner image/banner2.png";
import banner3 from "../../../assets/banner image/Banner3.png";
import banner4 from "../../../assets/banner image/Banner4.png";

import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="max-w-full mx-auto py-5">
      <Swiper
        modules={[EffectFade, Pagination, Autoplay]} 
        spaceBetween={0} 
        slidesPerView={1} 
        pagination={{ clickable: true }} 
        autoplay={{ delay: 3000 }} 
        loop={true} 
        className="relative w-full h"
      >
        {/* Slider 1 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img src={banner1} alt="Banner 1" className="w-full"/>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white z-10 px-4 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">
                Transform Your Fitness Journey with <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
              </h1>
              <p className="text-xs sm:text-base md:text-lg mb-6 sm:block hidden">
                Track your workouts, connect with top trainers, and become your best self one rep at a time.
              </p>
              <Link
                to="/classes"
                className="inline-block bg-[#f34e3a] hover:bg-[#e03a2d] text-white font-medium px-4 py-2 rounded shadow text-xs sm:text-sm md:text-base"
              >
                Explore Classes
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slider 2 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img src={banner2} alt="Banner 2" className="w-full"/>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white z-10 px-4 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">
                Transform Your Fitness Journey with <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
              </h1>
              <p className="text-xs sm:text-base md:text-lg mb-6 sm:block hidden">
                Track your workouts, connect with top trainers, and become your best self one rep at a time.
              </p>
              <Link
                to="/classes"
                className="inline-block bg-[#f34e3a] hover:bg-[#e03a2d] text-white font-medium px-4 py-2 rounded shadow text-xs sm:text-sm md:text-base"
              >
                Explore Classes
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slider 3 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img src={banner3} alt="Banner 3" className="w-full"/>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white z-10 px-4 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">
                Transform Your Fitness Journey with <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
              </h1>
              <p className="text-xs sm:text-base md:text-lg mb-6 sm:block hidden">
                Track your workouts, connect with top trainers, and become your best self one rep at a time.
              </p>
              <Link
                to="/classes"
                className="inline-block bg-[#f34e3a] hover:bg-[#e03a2d] text-white font-medium px-4 py-2 rounded shadow text-xs sm:text-sm md:text-base"
              >
                Explore Classes
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slider 4 */}
        <SwiperSlide>
          <div className="relative w-full">
            <img src={banner4} alt="Banner 4" className="w-full"/>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white z-10 px-4 sm:px-6 md:px-8">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4">
                Transform Your Fitness Journey with <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
              </h1>
              <p className="text-xs sm:text-base md:text-lg mb-6 sm:block hidden">
                Track your workouts, connect with top trainers, and become your best self one rep at a time.
              </p>
              <Link
                to="/classes"
                className="inline-block bg-[#f34e3a] hover:bg-[#e03a2d] text-white font-medium px-4 py-2 rounded shadow text-xs sm:text-sm md:text-base"
              >
                Explore Classes
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
