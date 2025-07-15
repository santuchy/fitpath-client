import BrandLogo from "../../../assets/brand-logo.png"

const About = () => {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20 bg-white">
      <div className="max-w-11/12 mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Left Text Content */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            About <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
          </h2>
          <p className="text-gray-700 mb-4 text-base leading-relaxed">
            FitPath is on a mission to revolutionize the fitness experience by connecting people with world-class trainers, flexible classes, and an engaging wellness community. Whether you're just starting out or leveling up, FitPath helps you track progress, stay motivated, and reach your full potential.
          </p>
          <p className="text-gray-700 text-base leading-relaxed">
            With cutting-edge technology and a passion for health, we aim to inspire a generation to lead healthier, more active lives. Join thousands of members on a journey toward transformation, strength, and balance.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <img
            src={BrandLogo}
            alt="About FitPath"
            className="w-full max-w-md mx-auto rounded-xl "
          />
        </div>
      </div>
    </section>
  );
};

export default About;
