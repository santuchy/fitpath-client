import { FaChartLine, FaUsers, FaClock, FaComments } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Track Your Progress",
    description: "Visualize your fitness journey with real-time stats and analytics. Set goals and crush them!",
    icon: <FaChartLine className="text-4xl text-[#BE1C20]" />,
  },
  {
    title: "Certified Trainers",
    description: "Get expert guidance from experienced and certified trainers tailored to your fitness needs.",
    icon: <FaUsers className="text-4xl text-[#03466e]" />,
  },
  {
    title: "Flexible Scheduling",
    description: "Access classes anytime with our wide range of time slots—designed to fit your routine.",
    icon: <FaClock className="text-4xl text-[#f34e3a]" />,
  },
  {
    title: "Community Support",
    description: "Join a vibrant fitness community where members inspire, motivate, and grow together.",
    icon: <FaComments className="text-4xl text-[#6c757d]" />,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.3,
      ease: "easeOut",
    },
  }),
};

const motionEffect = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const Featured = () => {
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-11/12 mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          Why Choose <span className="text-[#BE1C20]">Fit</span><span className="text-[#03466e]">Path</span>
        </motion.h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-orange-50 rounded-xl shadow-lg hover:shadow-2xl  p-8 flex flex-col items-center text-center transition-all duration-300"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
              viewport={{ once: false }} 
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={motionEffect}
                className="mb-6"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold text-[#03466e] mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-lg">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
