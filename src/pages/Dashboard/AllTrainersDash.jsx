import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';

const AllTrainersDash = () => {
  const [trainers, setTrainers] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/trainers", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setTrainers(res.data); // server already filters by role
    } catch (err) {
      console.error("Failed to fetch trainers", err);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const demote = async (email) => {
    if (!confirm("Are you sure you want to demote this trainer to member?")) return;
    try {
      const res = await axios.patch(
        `http://localhost:3000/trainers/demote/${email}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      if (res.data.success) {
        fetchTrainers(); // re-fetch from DB to reflect correct role
      } else {
        alert("Failed to demote. Already a member?");
      }
    } catch (err) {
      alert("Something went wrong while demoting.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-[#f34e3a]">All Trainers</h2>

      {/* Trainers Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white p-4">
        <table className="w-full table-auto border-separate border-spacing-0">
          <thead className="bg-[#f34e3a] text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Skills</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((t, i) => (
              <tr
                key={t._id}
                className={`text-center ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200 transition duration-200`}
              >
                <td className="p-4">{i + 1}</td>
                <td className="p-4">{t.name}</td>
                <td className="p-4">{t.email}</td>
                <td className="p-4">{t.age}</td>
                <td className="p-4">{t.skills?.join(", ")}</td>
                <td className="p-4">
                  <button
                    onClick={() => demote(t.email)}
                    className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 transition duration-300"
                  >
                    Demote
                  </button>
                </td>
              </tr>
            ))}
            {trainers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-lg text-gray-500"
                >
                  No trainers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainersDash;
