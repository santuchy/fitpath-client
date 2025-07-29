import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';
import { FaPen } from "react-icons/fa"; 

const AddForum = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newPost = {
      title,
      content,
      author: user.displayName,
      authorEmail: user.email,
    };

    await axios.post("https://fit-path-server.vercel.app/forums", newPost);
    alert("Forum post added!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <h2 className="text-3xl font-semibold text-center text-[#f34e3a] mb-6">Add New Forum Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <input
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <textarea
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
            rows="6"
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[#f34e3a] text-white font-semibold rounded-lg hover:bg-[#e03a2d] transition-all duration-300"
          >
            <FaPen /> Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForum;
