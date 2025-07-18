import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";


const AllTrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/trainers").then((res) => {
      setTrainers(res.data);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Trainers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer._id} className="border rounded p-4 shadow">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{trainer.name}</h3>
            <p><strong>Experience:</strong> {trainer.experience || "N/A"} years</p>
            <p><strong>Skills:</strong> {trainer.skills?.join(", ")}</p>
            <p className="text-sm text-gray-500 mb-2">{trainer.email}</p>
            <button
              onClick={() => navigate(`/trainer/${trainer._id}`)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Know More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainersPage;
