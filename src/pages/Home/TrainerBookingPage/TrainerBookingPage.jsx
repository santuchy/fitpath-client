import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";


const TrainerBookingPage = () => {
  const { slotId } = useParams();  // slotId from URL params
  const navigate = useNavigate();
  const [slot, setSlot] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [packageSelection, setPackageSelection] = useState(null);

  useEffect(() => {
    // Fetch slot and trainer data based on slotId
    axios
      .get(`http://localhost:3000/slots/${slotId}`)
      .then((res) => {
        setSlot(res.data);
        return axios.get(`http://localhost:3000/trainers/${res.data.trainerEmail}`);
      })
      .then((res) => setTrainer(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [slotId]);

  const handlePackageChange = (e) => {
    setPackageSelection(e.target.value);
  };

  const handleJoinNow = () => {
    if (packageSelection) {
      // Redirect to payment page with the selected slot and package
      navigate(`/payment/${slotId}?package=${packageSelection}`);
    } else {
      alert("Please select a package.");
    }
  };

  if (!slot || !trainer) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-md shadow">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Book Session with {trainer.name}
      </h2>

      {/* Slot and Trainer Details */}
      <div className="border p-4 rounded shadow mb-4">
        <h3 className="text-xl font-semibold">{slot.slotName} ({slot.slotTime})</h3>
        <p><strong>Trainer:</strong> {trainer.name}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
        <p><strong>Class:</strong> {slot.className}</p>
      </div>

      {/* Package Selection */}
      <div className="border p-4 rounded shadow mb-4">
        <h3 className="text-xl font-semibold mb-2">Select Package</h3>
        <select
          onChange={handlePackageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        >
          <option value="">Select Package</option>
          <option value="basic">Basic - $10</option>
          <option value="standard">Standard - $50</option>
          <option value="premium">Premium - $100</option>
        </select>
      </div>

      {/* Join Button */}
      <div className="text-center">
        <button
          onClick={handleJoinNow}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default TrainerBookingPage;
