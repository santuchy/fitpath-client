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
    <div className="py-16 px-4 md:px-10 lg:px-20 overflow-x-hidden">
      <div className="max-w-11/12 mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <span className="text-[#f34e3a]">Meet</span> Our Team
        </motion.h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-2xl shadow-lg ring-1 ring-gray-100 
                         p-8 text-center transition-all duration-300 
                         hover:shadow-2xl hover:-translate-y-1 group"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              <img
                src={trainer.image}
                alt={trainer.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full mx-auto object-cover mb-6 
                           ring-4 ring-[#f34e3a] ring-offset-2 ring-offset-white
                           transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"
              />

              <h3 className="text-2xl font-semibold text-[#03466e] mb-2">
                {trainer.name}
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                {trainer.bio}
              </p>

              <p className="text-sm md:text-base font-medium">
                <span className="inline-block px-3 py-1 rounded-full 
                                 bg-[#f34e3a]/10 text-[#f34e3a]">
                  Expertise: {trainer.expertise}
                </span>
              </p>

              {/* subtle bottom glow on hover (purely visual) */}
              <span className="pointer-events-none absolute inset-x-6 -bottom-1 h-2 rounded-full 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                               bg-[radial-gradient(60%_8px_at_50%_100%,rgba(243,78,58,0.25),transparent)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
