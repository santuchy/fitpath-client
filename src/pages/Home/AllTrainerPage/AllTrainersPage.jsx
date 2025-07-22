import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const AllTrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track any error that occurs during fetching
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/trainers");
        if (res.data && Array.isArray(res.data)) {
          setTrainers(res.data);  // Successfully set trainer data
          
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (err) {
        console.error("Error fetching trainers:", err);
        setError("Failed to fetch trainers.");
      } finally {
        setLoading(false);  // Set loading to false once data is fetched
      }
    };

    fetchTrainers();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (loading) {
    return <div>Loading trainers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">All Trainers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.length === 0 ? (
          <p className="text-center">No trainers available at the moment.</p>
        ) : (
          trainers.map((trainer) => (
            <div key={trainer._id} className="border rounded p-4 shadow">
              <img
                src={trainer.image || "default_image_url"} // Fallback image
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
          ))
        )}
      </div>
    </div>
  );
};

export default AllTrainersPage;
