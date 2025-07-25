import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchPosts = async () => {
    const res = await axios.get(`http://localhost:3000/forums?page=${page}`);
    setPosts(res.data.forums);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const vote = async (id, type) => {
    await axios.patch(`http://localhost:3000/forums/vote/${id}`, { type });
    fetchPosts(); // refresh vote count
  };

  const totalPages = Math.ceil(total / 6);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Community Forum</h2>
      {posts.map(post => (
        <div key={post._id} className="border-b pb-4 mb-4">
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content}</p>
          <div className="flex gap-4 mt-2 text-sm items-center">
            <button onClick={() => vote(post._id, 'upvote')} className="text-green-600 flex items-center gap-1">
              <FaArrowUp /> {post.upvotes}
            </button>
            <button onClick={() => vote(post._id, 'downvote')} className="text-red-500 flex items-center gap-1">
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
            className={`px-4 py-2 border rounded ${page === i + 1 ? "bg-blue-600 text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
