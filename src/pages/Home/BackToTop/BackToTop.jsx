// src/components/BackToTop/BackToTop.jsx
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

const BackToTop = ({ threshold = 300 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > threshold);
    };
    onScroll(); // initial check
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="backToTop"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] group"
        >
          <span className="sr-only">Back to top</span>
          <span
            className="inline-flex h-12 w-12 items-center justify-center rounded-full
                       bg-[#f34e3a] text-white shadow-lg ring-1 ring-[#f34e3a]/50
                       transition-all duration-300 ease-out
                       group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-[#f34e3a]/30"
          >
            <FiArrowUp className="h-5 w-5 translate-y-0.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
