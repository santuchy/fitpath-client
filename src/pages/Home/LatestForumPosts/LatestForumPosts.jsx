import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link } from "react-router";
import Loading from "../../Loading/Loading";

const LatestForumPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://fit-path-server.vercel.app/forums/latest").then((res) => setPosts(res.data));
  }, []);

  // Motion variants for cards
  const cardVariants = {
    hiddenLeft: { opacity: 0, x: -50 },
    hiddenRight: { opacity: 0, x: 50 },
    hiddenUp: { opacity: 0, y: -50 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6 } },
  };

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
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="bg-white py-14 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#f34e3a]">
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
                viewport={{ once: false }}
                className="bg-orange-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-black mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {post.content.slice(0, 100)}...
                </p>
                <Link
                  to="/forum"
                  className="text-[#f34e3a] hover:underline text-sm inline-block"
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
