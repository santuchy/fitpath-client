import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaCrown, FaUserShield } from "react-icons/fa";
import { AuthContext } from './../../../context/AuthContext';


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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Community Forum</h2>
      {posts.map((post) => (
        <div key={post._id} className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{post.content}</p>
          <div className="flex items-center text-sm text-gray-700 mb-1">
            {renderBadge(post)}  {/* Render badge dynamically */}
          </div>
          <div className="flex gap-4 mt-2 text-sm items-center">
            <button
              onClick={() => vote(post._id, "upvote")}
              className="text-green-600 flex items-center gap-1"
            >
              <FaArrowUp /> {post.upvotes}
            </button>
            <button
              onClick={() => vote(post._id, "downvote")}
              className="text-red-500 flex items-center gap-1"
            >
              <FaArrowDown /> {post.downvotes}
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 border rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
