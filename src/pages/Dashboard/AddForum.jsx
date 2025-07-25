import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';


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

    await axios.post("http://localhost:3000/forums", newPost);
    alert("Forum post added!");
    setTitle("");
    setContent("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Add New Forum Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border px-4 py-2 rounded"
          rows="6"
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Post
        </button>
      </form>
    </div>
  );
};

export default AddForum;
