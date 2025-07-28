import { motion } from "framer-motion";
import Image1 from "../../../assets/Image1.jpg";
import Image2 from "../../../assets/Image2.jpg";
import Image3 from "../../../assets/Image3.jpg";

const trainers = [
  {
    name: "Alex Johnson",
    bio: "Certified trainer with 10+ years in strength & conditioning. Passionate about fitness and client progress.",
    expertise: "Weight Training, Strength, Hypertrophy",
    image: `${Image1}`,
  },
  {
    name: "Maria Gomez",
    bio: "Yoga expert helping people achieve mental peace and body flexibility through personalized coaching.",
    expertise: "Yoga, Flexibility, Mindfulness",
    image: `${Image2}`,
  },
  {
    name: "David Lee",
    bio: "Cardio & HIIT coach with a decade of experience in building stamina and athletic performance.",
    expertise: "HIIT, Cardio, Endurance",
    image: `${Image3}`,
  },
];

const TeamSection = () => {
  return (
    <div className=" to-[#e2e8f0] py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-[#f34e3a]"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-6 border-4 border-[#f34e3a]"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{trainer.name}</h3>
              <p className="text-gray-600 mb-3 text-sm">{trainer.bio}</p>
              <p className="text-sm text-[#f34e3a] font-medium">
                Expertise: {trainer.expertise}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
