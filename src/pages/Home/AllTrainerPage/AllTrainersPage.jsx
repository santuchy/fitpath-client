import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../../Loading/Loading";

const AllTrainersPage = () => {

  useEffect(() => {
      document.title = "All Trainers | FitPath";
    }, []);

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("https://fit-path-server.vercel.app/trainers");
        if (res.data && Array.isArray(res.data)) {
          setTrainers(res.data);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err) {
        console.error("Error fetching trainers:", err);
        setError("Failed to fetch trainers.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

   useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-10"
      >
        <p className="text-xl text-red-500">{error}</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h2
        className="text-4xl font-bold mb-8 text-center text-[#f34e3a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        All Trainers
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.length === 0 ? (
          <p className="text-center text-gray-600">No trainers available at the moment.</p>
        ) : (
          trainers.map((trainer) => (
            <motion.div
              key={trainer._id}
              className="bg-white p-6 rounded-xl shadow-lg text-center transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={trainer.image || "default_image_url"}
                alt={trainer.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{trainer.name}</h3>
              <p className="text-gray-600 mb-3">
                <strong>Experience:</strong> {trainer.experience || "N/A"} years
              </p>
              <p className="text-gray-600 mb-3">
                <strong>Skills:</strong> {trainer.skills?.join(", ")}
              </p>
              <p className="text-sm text-gray-500 mb-4">{trainer.email}</p>

              <motion.button
                onClick={() => navigate(`/trainer/${trainer._id}`)}
                className="px-6 py-2 bg-[#f34e3a] text-white rounded-lg hover:bg-[#e03a2d] transition-all duration-300"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                Know More
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllTrainersPage;
