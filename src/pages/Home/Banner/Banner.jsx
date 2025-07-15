import { Link } from "react-router";
import bannerImg from "../../../assets/bannerImg.png"


const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-[#03476e3f] py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        
        {/* Left Text */}
        <div className="flex-1 text-center md:text-left lg:pl-15">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            Transform Your Fitness Journey with <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Track your workouts, connect with top trainers, and become your best self—one rep at a time.
          </p>
          <Link
            to="/classes"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded shadow"
          >
            Explore Classes
          </Link>
        </div>

        {/* Right Image */}
        <div className="flex-1 lg:pl-20">
          <img
            src={bannerImg} // your image here
            alt="Fitness Banner"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
