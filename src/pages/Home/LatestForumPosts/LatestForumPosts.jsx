// src/components/Home/LatestForumPosts.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";

const LatestForumPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/forums/latest").then((res) => setPosts(res.data));
  }, []);

  // Motion variants for cards
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    hiddenUp: { opacity: 0, y: -50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial={{ x: -80, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }} 
      className="bg-gray-50 py-14 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Latest Community Posts
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => {
            const variant =
              index % 3 === 0
                ? "hiddenLeft"
                : index % 3 === 1
                ? "hiddenRight"
                : "hiddenUp";

            return (
              <motion.div
                key={post._id}
                variants={cardVariants}
                initial={cardVariants[variant]}
                whileInView="visible"
                viewport={{ once: false }} // ✅ animate again when in view
                className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {post.content.slice(0, 100)}...
                </p>
                <Link
                  to="/forum"
                  className="text-blue-500 hover:underline inline-block"
                >
                  Explore More →
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default LatestForumPosts;
