import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from './../../context/AuthContext';

const AppliedTrainersPage = () => {
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the applied trainers when the component mounts
    const fetchAppliedTrainers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/applied-trainers",
      {
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
      console.error(
        "Failed to confirm the trainer:",
        error.response ? error.response.data : error.message
      );
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

  if (loading) {
    return <p>Loading applied trainers...</p>; // Display loading state
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Applied Trainers</h2>
      <div className="grid gap-4">
        {applied.length === 0 ? (
          <p>No applied trainers available.</p>
        ) : (
          applied.map((t) => (
            <div key={t._id} className="border p-4 shadow">
              <p>
                <strong>Name:</strong> {t.name}
              </p>
              <p>
                <strong>Email:</strong> {t.email}
              </p>
              <p>
                <strong>Skills:</strong> {t.skills.join(", ")}
              </p>
              <p>
                <strong>Age:</strong> {t.age}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleConfirm(t.email)}
                  className="bg-green-500 px-3 py-1 text-white"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleReject(t.email)}
                  className="bg-red-500 px-3 py-1 text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedTrainersPage;
