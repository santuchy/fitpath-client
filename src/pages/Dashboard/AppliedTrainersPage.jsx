import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from './../../context/AuthContext';
import Loading from './../Loading/Loading';

const AppliedTrainersPage = () => {
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the applied trainers when the component mounts
    const fetchAppliedTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/applied-trainers", {
          headers: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });
        setApplied(res.data);
      } catch (error) {
        console.error("Failed to fetch applied trainers:", error);
      } finally {
        setLoading(false); // Turn off the loading spinner
      }
    };

    fetchAppliedTrainers();
  }, []);

  // Handle Confirm Trainer
  const handleConfirm = async (email) => {
    try {
      // Send POST request to confirm the trainer and add to the users collection
      const res = await axios.post("http://localhost:3000/confirm-trainer", {
        email: email, // Sending email to confirm the trainer
      });

      // Remove confirmed trainer from the applied list
      setApplied((prev) => prev.filter((t) => t.email !== email));

      // Show a success notification
      Swal.fire({
        title: "Trainer Confirmed!",
        icon: "success",
        confirmButtonText: "Okay",
      });
    } catch (error) {
      console.error("Failed to confirm the trainer:", error.response ? error.response.data : error.message);
      Swal.fire({
        title: "Error",
        text: "There was an issue confirming the trainer.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // Handle Reject Trainer
  const handleReject = async (email) => {
    const feedback = prompt("Enter rejection reason:");
    if (!feedback) return;

    try {
      await axios.delete("http://localhost:3000/reject-trainer", {
        data: { email, feedback },
      });
      setApplied((prev) => prev.filter((t) => t.email !== email)); // Remove rejected trainer from the list
    } catch (error) {
      console.error("Failed to reject the trainer:", error);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#f34e3a] mb-4">Applied Trainers</h2>
      
      {applied.length === 0 ? (
        <p className="text-center text-gray-500">No applied trainers available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applied.map((t) => (
            <div key={t._id} className="border p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 bg-white">
              <div className="text-center mb-4">
                <img
                  src={t.image || "/default-avatar.png"}
                  alt={t.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.skills.join(", ")}</p>
              </div>
              <p className="text-sm text-gray-700 mb-2"><strong>Email:</strong> {t.email}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Age:</strong> {t.age}</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => handleConfirm(t.email)}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleReject(t.email)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedTrainersPage;
