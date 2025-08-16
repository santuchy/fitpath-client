import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaRunning,
  FaBiking,
  FaSwimmer,
  FaHeartbeat,
  FaAppleAlt,
} from "react-icons/fa";
import Loading from "../../Loading/Loading";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.2,
      ease: "easeOut",
    },
  }),
};

const motionEffect = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const icons = [
  <FaDumbbell className="text-2xl md:text-3xl text-[#f34e3a]" />,
  <FaRunning className="text-2xl md:text-3xl text-[#03466e]" />,
  <FaBiking className="text-2xl md:text-3xl text-[#BE1C20]" />,
  <FaSwimmer className="text-2xl md:text-3xl text-[#6c757d]" />,
  <FaHeartbeat className="text-2xl md:text-3xl text-[#f34e3a]" />,
  <FaAppleAlt className="text-2xl md:text-3xl text-[#03466e]" />,
];

const FeaturedClasses = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fit-path-server.vercel.app/classes/featured").then((res) => {
      setFeatured(res.data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="py-12 px-3 md:px-8 lg:px-16">
      <div className="max-w-11/12 mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          🔥 <span className="text-[#f34e3a]">Featured</span> Classes
        </motion.h2>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((cls, idx) => (
            <motion.div
              key={cls._id}
              className="bg-orange-50 rounded-xl shadow-md hover:shadow-lg 
                         p-5 md:p-6 flex flex-col items-center text-center 
                         transition-all duration-300"
              custom={idx}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp}
              whileHover={{ scale: 1.03, boxShadow: "0 6px 16px rgba(0,0,0,0.12)" }}
              viewport={{ once: false }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={motionEffect}
                className="mb-4"
              >
                {icons[idx % icons.length]}
              </motion.div>

              <h3 className="text-lg md:text-xl font-semibold text-[#03466e] mb-2">
                {cls.name}
              </h3>

              <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-3">
                {cls.description || "No description available."}
              </p>

              <div className="text-sm md:text-base text-gray-700 font-medium">
                Total Bookings:{" "}
                <span className="text-[#f34e3a]">{cls.bookingCount || 0}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClasses;
