import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const FeaturedClasses = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/classes/featured").then((res) => {
      setFeatured(res.data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-6xl mx-auto px-4 py-12"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">🔥 Featured Classes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((cls) => (
          <div
            key={cls._id}
            className="bg-white rounded-2xl shadow p-6 border hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{cls.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {cls.description || "No description available."}
            </p>
            <div className="text-sm text-gray-700 font-medium">
              Total Bookings: <span className="text-blue-600">{cls.bookingCount || 0}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedClasses;
