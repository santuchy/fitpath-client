import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; 
import Loading from "../../Loading/Loading";

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/reviews").then((res) => setReviews(res.data));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 >= reviews.length ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 < 0 ? reviews.length - 1 : prev - 1));
  };

   useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-[#f34e3a] mb-10">What Our Users Say</h2>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <p className="text-gray-800 mb-4 text-lg font-medium">
                "{reviews[currentSlide]?.feedback}"
              </p>
              <div className="flex items-center justify-center mb-4">
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

          {/* Navigation arrows */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="bg-transparent text-[#f34e3a] hover:text-[#e03a2d] transition duration-300 text-2xl"
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={nextSlide}
              className="bg-transparent text-[#f34e3a] hover:text-[#e03a2d] transition duration-300 text-2xl"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
