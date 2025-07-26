import { useEffect, useState } from "react";
import axios from "axios";

const AllTrainersDash = () => {
  const [trainers, setTrainers] = useState([]);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/trainers");
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
      const res = await axios.patch(`http://localhost:3000/trainers/demote/${email}`);
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
      <h2 className="text-3xl font-bold mb-6">All Trainers</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((t, i) => (
              <tr key={t._id} className="border-t text-center">
                <td className="p-2">{i + 1}</td>
                <td>{t.name}</td>
                <td>{t.email}</td>
                <td>{t.age}</td>
                <td>{t.skills?.join(", ")}</td>
                <td>
                  <button
                    onClick={() => demote(t.email)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Demote
                  </button>
                </td>
              </tr>
            ))}
            {trainers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
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
