// src/pages/Dashboard/TrainerBookedPage.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';
import { Dialog } from "@headlessui/react";
import { FaStar } from "react-icons/fa";

const TrainerBookedPage = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!user?.email) return;
    axios.get(`http://localhost:3000/booked-trainers/${user.email}`)
      .then(res => setBookings(res.data))
      .catch(err => console.error("Failed to fetch bookings:", err));
  }, [user]);

  const handleSubmitReview = async () => {
    if (!feedback || rating === 0 || !selectedBooking) return;
    try {
      await axios.post("http://localhost:3000/reviews", {
        trainerEmail: selectedBooking.trainerEmail,
        userEmail: user.email,
        userName: user.displayName,
        feedback,
        rating,
        timestamp: new Date(),
      });
      setIsModalOpen(false);
      setFeedback("");
      setRating(0);
    } catch (err) {
      console.error("Review submission failed:", err);
    }
  };

  if (bookings.length === 0) return <p className="text-center mt-10">No bookings found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Your Booked Trainers ✅</h2>

      {bookings.map((booking, index) => (
        <div key={index} className="border p-4 rounded shadow mb-6">
          <p><strong>Trainer:</strong> {booking.trainerName}</p>
          <p><strong>Email:</strong> {booking.trainerEmail}</p>
          <p><strong>Class Name:</strong> {booking.className}</p>
          <p><strong>Slot Name:</strong> {booking.slotName}</p>
          <p><strong>Package:</strong> {booking.package}</p>
          <p><strong>Price:</strong> ${booking.price / 100}</p>
          <p><strong>Booking Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>

          <button
            onClick={() => {
              setSelectedBooking(booking);
              setIsModalOpen(true);
            }}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Leave a Review
          </button>
        </div>
      ))}

      {/* Review Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded p-6">
            <Dialog.Title className="text-xl font-bold mb-4">Write a Review</Dialog.Title>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows="4"
              placeholder="Your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-xl ${rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TrainerBookedPage;
