import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

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

  if (loading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
      viewport={{ once: false, amount: 0.2 }}
      className="max-w-6xl mx-auto px-4 py-12 "
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-[#f34e3a]">
        🔥 Featured Classes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {featured.map((cls) => (
          <motion.div
            key={cls._id}
            className=" rounded-2xl shadow-lg p-6 border border-gray-300 hover:shadow-2xl transition-all duration-300 bg-orange-50"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2 text-black">{cls.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {cls.description || "No description available."}
            </p>
            <div className="text-sm text-gray-700 font-medium">
              Total Bookings: <span className="text-[#f34e3a]">{cls.bookingCount || 0}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeaturedClasses;
