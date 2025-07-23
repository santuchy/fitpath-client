import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import clsx from "clsx"; // For conditional styling (install with: npm install clsx)

const TrainerBookingPage = () => {
  const { slotId } = useParams();
  const navigate = useNavigate();
  const [slot, setSlot] = useState(null);
  const [trainer, setTrainer] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/slots/${slotId}`)
      .then((res) => {
        setSlot(res.data);
        return axios.get(`http://localhost:3000/trainers/${res.data.trainerEmail}`);
      })
      .then((res) => setTrainer(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  }, [slotId]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handleJoinNow = () => {
    if (!selectedPackage) {
      alert("Please select a membership package!");
      return;
    }
    navigate(`/payment/${slotId}?package=${selectedPackage}`);
  };

  if (!slot || !trainer) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-md shadow">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Book Session with {trainer.name}
      </h2>

      {/* Trainer and Slot Info */}
      <div className="border p-4 rounded shadow mb-6">
        <h3 className="text-xl font-semibold">{slot.slotName} ({slot.slotTime})</h3>
        <p><strong>Trainer:</strong> {trainer.name}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
        <p><strong>Class:</strong> {slot.className}</p>
      </div>

      {/* Package Selection */}
      <h3 className="text-2xl font-bold mb-4 text-center">Choose Your Membership</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic */}
        <div
          onClick={() => handlePackageSelect("basic")}
          className={clsx(
            "border p-4 rounded cursor-pointer transition hover:shadow-md",
            selectedPackage === "basic" ? "border-green-600 shadow-lg" : ""
          )}
        >
          <h4 className="text-xl font-bold text-center mb-2">Basic Membership</h4>
          <ul className="text-sm list-disc ml-4">
            <li>Access to gym facilities during regular hours</li>
            <li>Use of cardio and strength training equipment</li>
            <li>Access to locker rooms and showers</li>
          </ul>
          <p className="mt-4 font-semibold text-center text-green-600">Price: $10</p>
        </div>

        {/* Standard */}
        <div
          onClick={() => handlePackageSelect("standard")}
          className={clsx(
            "border p-4 rounded cursor-pointer transition hover:shadow-md",
            selectedPackage === "standard" ? "border-green-600 shadow-lg" : ""
          )}
        >
          <h4 className="text-xl font-bold text-center mb-2">Standard Membership</h4>
          <ul className="text-sm list-disc ml-4">
            <li>All Basic Membership benefits</li>
            <li>Access to group fitness classes (yoga, spinning, Zumba)</li>
            <li>Use of amenities like sauna or steam room</li>
          </ul>
          <p className="mt-4 font-semibold text-center text-green-600">Price: $50</p>
        </div>

        {/* Premium */}
        <div
          onClick={() => handlePackageSelect("premium")}
          className={clsx(
            "border p-4 rounded cursor-pointer transition hover:shadow-md",
            selectedPackage === "premium" ? "border-green-600 shadow-lg" : ""
          )}
        >
          <h4 className="text-xl font-bold text-center mb-2">Premium Membership</h4>
          <ul className="text-sm list-disc ml-4">
            <li>All Standard Membership benefits</li>
            <li>Personal training sessions with certified trainers</li>
            <li>Discounts on massage therapy and nutrition counseling</li>
          </ul>
          <p className="mt-4 font-semibold text-center text-green-600">Price: $100</p>
        </div>
      </div>

      {/* Join Now Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleJoinNow}
          className="px-8 py-2 bg-green-600 text-white rounded font-semibold hover:bg-green-700"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default TrainerBookingPage;
