import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageSlotsPage = () => {
    const [slots, setSlots] = useState([]);

    // 🟡 Dummy logged-in trainer email (replace with Firebase user.email)
    const trainerEmail = "trainer@email.com";

    const fetchSlots = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/slots?email=${trainerEmail}`);
            setSlots(res.data);
        } catch (error) {
            console.error("Failed to fetch slots:", error);
        }
    };

    useEffect(() => {
        fetchSlots();
    }, []);

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
                await axios.delete(`http://localhost:3000/slots/${id}`);
                Swal.fire("Deleted!", "The slot has been deleted.", "success");
                fetchSlots();
            } catch (err) {
                Swal.fire("Error!", `Failed to delete slot: ${err.message}`, "error");
            }
        }
    };

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
                                        onClick={() => handleDelete(slot._id)}
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
