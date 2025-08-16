import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const NewsletterSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async () => {
    if (!name || !email) return alert("Please provide both name and email");

    try {
      await axios.post("https://fit-path-server.vercel.app/newsletter-subscribe", {
        name,
        email,
      });
      setSuccess(true);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="py-16 px-4 md:px-10 lg:px-20"
    >
      <div className="max-w-11/12 mx-auto">
        {/* Card */}
        <div className="relative mx-auto max-w-5xl rounded-2xl bg-white/95 backdrop-blur-sm p-8 md:p-10 shadow-lg ring-1 ring-gray-100">
          {/* Subtle top accent bar */}
          <span className="pointer-events-none absolute inset-x-0 -top-[1px] h-1 rounded-t-2xl bg-gradient-to-r from-[#000000] via-[#f34e3a] to-[#000000]" />

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#f34e3a]">Subscribe</span> to our Newsletter
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-gray-700 text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Stay updated with the latest news and offers!
          </motion.p>

          {/* Inputs + Button */}
          <div className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-3xl">
            <motion.input
              type="text"
              placeholder="Your Name"
              className="w-full sm:w-72 px-5 py-3 rounded-lg border border-gray-300 text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-[#f34e3a] focus:border-transparent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <motion.input
              type="email"
              placeholder="Your Email"
              className="w-full sm:w-72 px-5 py-3 rounded-lg border border-gray-300 text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-[#f34e3a] focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            />
            <motion.button
              onClick={handleSubscribe}
              className="w-full sm:w-auto bg-[#f34e3a] hover:bg-[#e03a2d] text-white px-6 py-3 rounded-lg font-semibold
                         transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-[#f34e3a]/40"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Subscribe Now
            </motion.button>
          </div>

          {success && (
            <motion.p
              className="text-green-600 mt-6 text-center text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Thank you for subscribing!
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSection;
