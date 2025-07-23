// src/pages/Dashboard/BeTrainerPage.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

// Days Options
const daysOptions = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

// Skills List
const skillsList = ["Yoga", "Cardio", "Zumba", "Weight Training", "CrossFit"];

const BeTrainerPage = () => {
  const { user } = useContext(AuthContext);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [age, setAge] = useState("");
  const [time, setTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/available-slots")
      .then((res) => {
        setAvailableSlots(res.data);
      })
      .catch((err) => {
        console.error("Error fetching available slots:", err);
      });
  }, []);

  const handleCheckboxChange = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSlotSelection = (slotId) => {
    setSelectedSlots((prev) => {
      const updated = new Set(prev);
      if (updated.has(slotId)) {
        updated.delete(slotId);
      } else {
        updated.add(slotId);
      }
      return [...updated];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerData = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
      age,
      availableDays: selectedDays.map((d) => d.value),
      skills: selectedSkills,
      availableTime: time,
      selectedSlots,
      isAvailable,
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:3000/applied-trainers", trainerData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Trainer Application Submitted!", "success");
        setAge("");
        setTime("");
        setSelectedDays([]);
        setSelectedSkills([]);
        setSelectedSlots([]);
      }
    } catch (err) {
      console.error("Submission error:", err);
      Swal.fire("Error", "Could not submit application", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Become a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input value={user?.displayName} readOnly className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input value={user?.email} readOnly className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Age</label>
          <input
            type="number"
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Skills</label>
          <div className="flex flex-wrap gap-3">
            {skillsList.map((skill) => (
              <label key={skill} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleCheckboxChange(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Available Days</label>
          <Select isMulti options={daysOptions} onChange={setSelectedDays} required />
        </div>
        <div>
          <label className="block font-semibold">Available Time</label>
          <input
            type="text"
            required
            placeholder="e.g. 6pm - 8pm"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Available Slots</label>
          <div className="flex flex-col gap-3">
            {availableSlots.map((slot) => (
              <label key={slot._id} className="flex items-start gap-2 border p-2 rounded">
                <input
                  type="checkbox"
                  checked={selectedSlots.includes(slot._id)}
                  onChange={() => handleSlotSelection(slot._id)}
                />
                <div>
                  <p className="font-semibold">{slot.className} - {slot.slotName}</p>
                  <p className="text-sm text-gray-600">Time: {slot.slotTime}</p>
                  <p className="text-sm text-gray-600">Days: {slot.days?.join(', ')}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold">Currently Available?</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeTrainerPage;
