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
    navigate(`/dashboard/payment/${slotId}?package=${selectedPackage}`);
  };

  if (!slot || !trainer) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-[#f34e3a]">
        Book Session with {trainer.name}
      </h2>

      {/* Trainer and Slot Info */}
      <div className="border p-6 rounded-xl shadow-sm mb-6">
        <h3 className="text-xl font-bold mb-2 text-gray-700">{slot.slotName} ({slot.slotTime})</h3>
        <p><strong>Trainer:</strong> {trainer.name}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
        <p><strong>Class:</strong> {slot.className}</p>
      </div>

      {/* Package Selection */}
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-700">Choose Your Membership</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Basic */}
        <div
          onClick={() => handlePackageSelect("basic")}
          className={clsx(
            "bg-white p-6 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
            selectedPackage === "basic" ? "border-4 border-[#f34e3a]" : "border-2 border-gray-300"
          )}
        >
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Basic Membership</h4>
          <ul className="text-sm list-disc ml-4 text-gray-600">
            <li>Access to gym facilities during regular hours</li>
            <li>Use of cardio and strength training equipment</li>
            <li>Access to locker rooms and showers</li>
          </ul>
          <p className="mt-4 font-semibold text-center text-gray-700">Price: $10</p>
        </div>

        {/* Standard */}
        <div
          onClick={() => handlePackageSelect("standard")}
          className={clsx(
            "bg-white p-6 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
            selectedPackage === "standard" ? "border-4 border-[#f34e3a]" : "border-2 border-gray-300"
          )}
        >
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Standard Membership</h4>
          <ul className="text-sm list-disc ml-4 text-gray-600">
            <li>All Basic Membership benefits</li>
            <li>Access to group fitness classes (yoga, spinning, Zumba)</li>
            <li>Use of amenities like sauna or steam room</li>
          </ul>
          <p className="mt-4 font-semibold text-center text-gray-700">Price: $50</p>
        </div>

        {/* Premium */}
        <div
          onClick={() => handlePackageSelect("premium")}
          className={clsx(
            "bg-white p-6 rounded-lg shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105",
            selectedPackage === "premium" ? "border-4 border-[#f34e3a]" : "border-2 border-gray-300"
          )}
        >
          <h4 className="text-xl font-semibold mb-4 text-gray-800">Premium Membership</h4>
          <ul className="text-sm list-disc ml-4 text-gray-600">
            <li>All Standard Membership benefits</li>
            <li>Personal training sessions with certified trainers</li>
            <li>Discounts on massage therapy and nutrition counseling</li>
          </ul>
          <p className="mt-4 font-semibold text-center text-gray-700">Price: $100</p>
        </div>
      </div>

      {/* Join Now Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleJoinNow}
          className="px-8 py-3 bg-[#f34e3a] text-white rounded-lg font-semibold transition-all duration-300 hover:bg-[#e03a2d] hover:scale-105"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default TrainerBookingPage;
