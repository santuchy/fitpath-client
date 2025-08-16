import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Loading from "../../Loading/Loading";

const AUTOPLAY_MS = 4500; // প্রতি 4.5 সেকেন্ডে স্লাইড বদলাবে

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fit-path-server.vercel.app/reviews").then((res) => setReviews(res.data || []));
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (!reviews.length) return 0;
      return prev + 1 >= reviews.length ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (!reviews.length) return 0;
      return prev - 1 < 0 ? reviews.length - 1 : prev - 1;
    });
  };

  // Autoplay (simple, no extra state)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading || reviews.length <= 1) return;
    const id = setInterval(nextSlide, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [loading, reviews.length]);

  if (loading) {
    return <Loading />;
  }

  // No reviews fallback (crash-safe)
  if (reviews.length === 0) {
    return (
      <section className="py-16 px-4 md:px-10 lg:px-20">
        <div className="max-w-11/12 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            <span className="text-[#f34e3a]">What</span> Our Users Say
          </h2>
          <div className="bg-orange-50 rounded-xl shadow-lg p-8">
            <p className="text-gray-600">No reviews yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-11/12 mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          <span className="text-[#f34e3a]">What</span> Our Users Say
        </h2>

        {/* Featured-style centered card */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-orange-50 rounded-xl shadow-lg hover:shadow-2xl p-8 
                         flex flex-col items-center text-center transition-all duration-300"
            >
              <p className="text-gray-800 mb-4 text-lg font-medium leading-relaxed">
                “{reviews[currentSlide]?.feedback}”
              </p>

              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xl ${
                      i < (reviews[currentSlide]?.rating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-sm font-semibold text-gray-600">
                — {reviews[currentSlide]?.userName || "Anonymous"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows — styled but same functionality */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 sm:px-4">
            <button
              onClick={prevSlide}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full 
                         bg-white text-[#f34e3a] ring-1 ring-gray-200 shadow-md 
                         hover:bg-[#f34e3a]/10 hover:shadow-lg transition"
              aria-label="Previous"
            >
              <FiChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextSlide}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full 
                         bg-white text-[#f34e3a] ring-1 ring-gray-200 shadow-md 
                         hover:bg[#f34e3a]/10 hover:shadow-lg transition"
              aria-label="Next"
            >
              <FiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
