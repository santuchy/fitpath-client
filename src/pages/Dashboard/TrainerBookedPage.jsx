import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";


const TrainerBookedPage = () => {
  const { slotId } = useParams();  // Get slotId from the URL
  const navigate = useNavigate();
  const [slot, setSlot] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);

  useEffect(() => {
    // Fetch slot details
    axios.get(`http://localhost:3000/slots/${slotId}`).then((res) => {
      setSlot(res.data);
      // Fetch trainer details based on the trainer's email
      axios.get(`http://localhost:3000/trainers/${res.data.trainerEmail}`).then((res) => {
        setTrainer(res.data);
      });
    });
  }, [slotId]);

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleJoinNow = () => {
    if (!selectedPackage) {
      alert("Please select a membership package!");
      return;
    }
    navigate(`/payment/${slotId}?package=${selectedPackage}`);
  };

  if (!slot || !trainer) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-md shadow">
      <h2 className="text-3xl font-semibold text-center mb-6">Book Session with {trainer.name}</h2>

      <div className="border p-4 rounded shadow mb-4">
        <h3 className="text-xl font-semibold">{slot.slotName} ({slot.slotTime})</h3>
        <p><strong>Trainer:</strong> {trainer.name}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
        <p><strong>Class:</strong> {slot.className}</p>
      </div>

      <div className="border p-4 rounded shadow mb-4">
        <h3 className="text-xl font-semibold mb-2">Select Membership Package</h3>
        <select onChange={handlePackageChange} className="w-full px-4 py-2 border border-gray-300 rounded">
          <option value="">Select Package</option>
          <option value="basic">Basic - $10</option>
          <option value="standard">Standard - $50</option>
          <option value="premium">Premium - $100</option>
        </select>

        {selectedPackage === "basic" && (
          <div className="mt-4">
            <h4>Basic Membership Includes:</h4>
            <ul>
              <li>Access to gym facilities during regular operating hours</li>
            </ul>
          </div>
        )}
        {selectedPackage === "standard" && (
          <div className="mt-4">
            <h4>Standard Membership Includes:</h4>
            <ul>
              <li>All benefits of the basic membership</li>
              <li>Access to cardio and strength training equipment</li>
              <li>Access to group fitness classes like Yoga, Spinning, Zumba</li>
            </ul>
          </div>
        )}
        {selectedPackage === "premium" && (
          <div className="mt-4">
            <h4>Premium Membership Includes:</h4>
            <ul>
              <li>All benefits of the standard membership</li>
              <li>Access to locker rooms and showers</li>
              <li>Use of additional amenities like sauna/steam room</li>
              <li>Discounts on additional services such as massage therapy or nutrition counseling</li>
            </ul>
          </div>
        )}
      </div>

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

export default TrainerBookedPage;
