import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/reviews").then((res) => setReviews(res.data));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded shadow-md"
            >
              <p className="text-gray-700 mb-4 text-lg font-medium">
                "{reviews[currentSlide]?.feedback}"
              </p>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${i < reviews[currentSlide]?.rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-gray-600">
                — {reviews[currentSlide]?.userName || "Anonymous"}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={prevSlide}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              &#8592; Prev
            </button>
            <button
              onClick={nextSlide}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              Next &#8594;
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
