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
      await axios.post("http://localhost:3000/newsletter-subscribe", {
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
      className="bg-gradient-to-r from-blue-100 to-purple-100 py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-3xl mx-auto text-center bg-white shadow-lg rounded p-8">
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-6">Stay updated with the latest news and offers!</p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="px-4 py-2 border rounded w-full md:w-1/3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="px-4 py-2 border rounded w-full md:w-1/3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            Subscribe Now
          </button>
        </div>
        {success && (
          <p className="text-green-600 mt-4">Thank you for subscribing!</p>
        )}
      </div>
    </motion.div>
  );
};

export default NewsletterSection;
