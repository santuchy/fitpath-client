import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from './../../context/AuthContext';  // Correct path to AuthContext

const ManageSlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const { user, loading } = useContext(AuthContext);  // Accessing user data from AuthContext

  // Fetch slots based on the logged-in trainer's email
  const fetchSlots = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/slots?email=${user.email}`);
      console.log(res);
      setSlots(res.data);  // Store slots in state
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  // Fetch slots when user is available (after login)
  useEffect(() => {
    if (!loading && user?.email) {
      fetchSlots();  // Fetch slots only when the user is logged in
    }
  }, [user, loading]);  // Re-run when user or loading changes

  // Handle deletion of a slot
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This slot will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/slots/${id}`);  // Send delete request to the server
        Swal.fire("Deleted!", "The slot has been deleted.", "success");
        fetchSlots();  // Refresh the slot list after deletion
      } catch (err) {
        Swal.fire("Error!", `Failed to delete slot: ${err.message}`, "error");
      }
    }
  };

  // If loading or user is not available, show appropriate messages
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to manage your slots.</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-700">
        Manage My Slots
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">Slot Name</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Days</th>
              <th className="py-2 px-4 border">Class</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td className="py-2 px-4 border">{slot.slotName}</td>
                <td className="py-2 px-4 border">{slot.slotTime}</td>
                <td className="py-2 px-4 border">{slot.days?.join(", ")}</td>
                <td className="py-2 px-4 border">{slot.className}</td>
                <td className="py-2 px-4 border text-center">
                  <button
                    onClick={() => handleDelete(slot._id)}  // Trigger delete on button click
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {slots.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No slots found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlotsPage;
