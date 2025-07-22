import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AppliedTrainersPage = () => {
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    // Fetch the applied trainers when the component mounts
    const fetchAppliedTrainers = async () => {
      try {
        const res = await axios.get('http://localhost:3000/applied-trainers');
        setApplied(res.data);
      } catch (error) {
        console.error("Failed to fetch applied trainers:", error);
      } finally {
        setLoading(false); // Turn off the loading spinner
      }
    };

    fetchAppliedTrainers();
  }, []);


  //  // This fetch function is for updating AllTrainersPage (after confirming a trainer)
  // const fetchTrainers = async () => {
  //   try {
  //     await axios.get("http://localhost:3000/trainers"); // fetch all trainers
  //     // You can handle updating the AllTrainersPage here or use global state to pass it down
  //   } catch (err) {
  //     console.error("Error fetching all trainers:", err);
  //   }
  // };



 const handleConfirm = async (id) => {
  try {
    // Send POST request to confirm the trainer and add to the users collection
    const res = await axios.post(`http://localhost:3000/confirm-trainer/${id}`, {
      role: 'trainer' // Adding the role 'trainer' when confirming the trainer
    });

    // Remove confirmed trainer from the applied list
    setApplied(prev => prev.filter(t => t._id !== id));

    // Show a success notification
    Swal.fire({
      title: "Trainer Confirmed!",
      icon: "success",
      confirmButtonText: "Okay"
    });

  } catch (error) {
    console.error("Failed to confirm the trainer:", error.response ? error.response.data : error.message);
    Swal.fire({
      title: "Error",
      text: "There was an issue confirming the trainer.",
      icon: "error",
      confirmButtonText: "Try Again"
    });
  }
};






  const handleReject = async (id) => {
    const feedback = prompt("Enter rejection reason:");
    if (!feedback) return;

    try {
      await axios.delete(`http://localhost:3000/reject-trainer/${id}`, { data: { feedback } });
      setApplied(prev => prev.filter(t => t._id !== id)); // Remove rejected trainer from the list
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
          applied.map(t => (
            <div key={t._id} className="border p-4 shadow">
              <p><strong>Name:</strong> {t.name}</p>
              <p><strong>Email:</strong> {t.email}</p>
              <p><strong>Skills:</strong> {t.skills.join(', ')}</p>
              <p><strong>Age:</strong> {t.age}</p>
              <div className="mt-2 space-x-2">
                <button onClick={() => handleConfirm(t._id)} className="bg-green-500 px-3 py-1 text-white">Confirm</button>
                <button onClick={() => handleReject(t._id)} className="bg-red-500 px-3 py-1 text-white">Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppliedTrainersPage;
