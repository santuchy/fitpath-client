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
      className="bg-orange-50 py-16 px-6 sm:px-8 lg:px-16"
    >
      <div className="max-w-5xl mx-auto text-center bg-white rounded-lg shadow-2xl p-12">
        <motion.h2
          className="text-4xl font-bold text-[#f34e3a] mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Subscribe to our Newsletter
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Stay updated with the latest news and offers!
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.input
            type="text"
            placeholder="Your Name"
            className="px-6 py-3 border border-gray-300 rounded-lg w-full sm:w-1/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f34e3a]"
            value={name}
            onChange={(e) => setName(e.target.value)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />
          <motion.input
            type="email"
            placeholder="Your Email"
            className="px-6 py-3 border border-gray-300 rounded-lg w-full sm:w-1/3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#f34e3a]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          <motion.button
            onClick={handleSubscribe}
            className="bg-[#f34e3a] hover:bg-[#e03a2d] text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Subscribe Now
          </motion.button>
        </div>

        {success && (
          <motion.p
            className="text-green-600 mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Thank you for subscribing!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default NewsletterSection;
