import { useEffect, useState } from "react";
import axios from "axios";

const AllSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/newsletter-subscribers")
      .then((res) => setSubscribers(res.data))
      .catch((err) => console.error("Failed to fetch subscribers:", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">All Newsletter Subscribers</h2>
      {subscribers.length === 0 ? (
        <p className="text-center text-gray-500">No subscribers yet.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr key={index}>
                <td className="p-2 border">{sub.name}</td>
                <td className="p-2 border">{sub.email}</td>
                <td className="p-2 border">
                  {new Date(sub.subscribedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllSubscribersPage;
