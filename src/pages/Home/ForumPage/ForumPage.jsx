import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaCrown, FaUserShield } from "react-icons/fa";
import { AuthContext } from './../../../context/AuthContext';
import { motion } from "framer-motion";

const ForumPage = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch posts from server
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/forums?page=${page}`);
      const modified = res.data.forums.map((post, index) => {
        // Fake some trainer posts for UI display
        const isTrainerPost = Math.random() < 0.5; // Randomly assign role (50% chance)
        return {
          ...post,
          authorEmail: isTrainerPost ? `trainer${index}@fitpath.com` : user?.email, // Dynamically assign email to the post
          showTrainerBadge: isTrainerPost,
        };
      });

      setPosts(modified);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching forum posts:", error);
    }
  };

  // Fetch posts on page change
  useEffect(() => {
    fetchPosts();
  }, [page]);

  // Handle voting (upvote or downvote)
  const vote = async (id, type) => {
    try {
      await axios.patch(`http://localhost:3000/forums/vote/${id}`, { type });
      fetchPosts(); // Refetch posts to update vote count without changing the role
    } catch (error) {
      console.error("Error during voting:", error);
    }
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(total / 6);

  // Render badges for admin or trainer
  const renderBadge = (post) => {
    if (post.authorEmail === user?.email) {
      return (
        <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded flex items-center gap-1">
          <FaCrown className="text-red-500" /> Admin
        </span>
      );
    }

    if (post.showTrainerBadge) {
      return (
        <span className="ml-2 text-sm bg-blue-100 text-blue-600 px-2 py-0.5 rounded flex items-center gap-1">
          <FaUserShield className="text-blue-500" /> Trainer
        </span>
      );
    }

    return null;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <motion.h2
        className="text-4xl font-bold text-center text-[#f34e3a] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Community Forum
      </motion.h2>

      {posts.map((post) => (
        <motion.div
          key={post._id}
          className="border-b pb-6 mb-6 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-[#2d3748] mb-4">{post.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{post.content}</p>
          <div className="flex items-center text-sm text-gray-700 mb-3">
            {renderBadge(post)} {/* Render badge dynamically */}
          </div>
          <div className="flex gap-6 mt-2 text-sm items-center">
            <button
              onClick={() => vote(post._id, "upvote")}
              className="text-green-600 flex items-center gap-1 hover:text-green-700 transition-all duration-300"
            >
              <FaArrowUp /> {post.upvotes}
            </button>
            <button
              onClick={() => vote(post._id, "downvote")}
              className="text-red-500 flex items-center gap-1 hover:text-red-600 transition-all duration-300"
            >
              <FaArrowDown /> {post.downvotes}
            </button>
          </div>
        </motion.div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-full text-lg font-semibold transition-all duration-300 ${
              page === i + 1
                ? "bg-[#f34e3a] text-white"
                : "bg-white text-[#f34e3a] border border-[#f34e3a] hover:bg-[#f34e3a] hover:text-white"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
