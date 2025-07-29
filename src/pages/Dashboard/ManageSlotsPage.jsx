import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from './../../context/AuthContext'; 
import Loading from "../Loading/Loading";

const ManageSlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const { user, loading } = useContext(AuthContext);  

  const fetchSlots = async () => {
    try {
      const res = await axios.get(`https://fit-path-server.vercel.app/slots?email=${user.email}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
      setSlots(res.data); 
    } catch (error) {
      console.error("Failed to fetch slots:", error);
    }
  };

  useEffect(() => {
    if (!loading && user?.email) {
      fetchSlots();  
    }
  }, [user, loading]);

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
        await axios.delete(`https://fit-path-server.vercel.app/slots/${id}`);
        Swal.fire("Deleted!", "The slot has been deleted.", "success");
        setSlots((prevSlots) => prevSlots.filter((slot) => slot._id !== id)); 
      } catch (err) {
        Swal.fire("Error!", `Failed to delete slot: ${err.message}`, "error");
      }
    }
  };

  // If loading or user is not available, show appropriate messages
  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <div className="text-center">Please log in to manage your slots.</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <h2 className="text-3xl font-semibold text-center text-[#f34e3a]">Manage My Slots</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-[#f34e3a] text-white">
            <tr>
              <th className="py-3 px-4 text-sm font-medium">Slot Name</th>
              <th className="py-3 px-4 text-sm font-medium">Time</th>
              <th className="py-3 px-4 text-sm font-medium">Days</th>
              <th className="py-3 px-4 text-sm font-medium">Class</th>
              <th className="py-3 px-4 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">No slots available.</td>
              </tr>
            ) : (
              slots.map((slot) => (
                <tr key={slot._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{slot.slotName}</td>
                  <td className="py-3 px-4 text-sm">{slot.slotTime}</td>
                  <td className="py-3 px-4 text-sm">{slot.days?.join(", ")}</td>
                  <td className="py-3 px-4 text-sm">{slot.className}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(slot._id)}
                      className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSlotsPage;
