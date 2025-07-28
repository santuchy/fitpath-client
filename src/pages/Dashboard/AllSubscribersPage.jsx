import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';

const AllSubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/newsletter-subscribers", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => setSubscribers(res.data))
      .catch((err) => console.error("Failed to fetch subscribers:", err));
  }, [user.accessToken]);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#f34e3a] mb-6">
        All Newsletter Subscribers
      </h2>
      {subscribers.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No subscribers yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-[#f34e3a] text-white">
                <th className="p-4 text-left font-semibold">Name</th>
                <th className="p-4 text-left font-semibold">Email</th>
                <th className="p-4 text-left font-semibold">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <tr
                  key={sub._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200 transition duration-300`}
                >
                  <td className="p-4 border-b">{sub.name}</td>
                  <td className="p-4 border-b">{sub.email}</td>
                  <td className="p-4 border-b">
                    {new Date(sub.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllSubscribersPage;
