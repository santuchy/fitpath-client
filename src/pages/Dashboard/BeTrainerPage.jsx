import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from './../Loading/Loading';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fit-path-server.vercel.app/available-slots")
      .then((res) => setAvailableSlots(res.data))
      .catch((err) => console.error("Error fetching available slots:", err));
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
      const res = await axios.post("https://fit-path-server.vercel.app/applied-trainers", trainerData);
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

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center text-[#f34e3a] mb-8">Become a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Trainer Name */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Name</label>
          <input
            value={user?.displayName}
            readOnly
            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Trainer Email */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Email</label>
          <input
            value={user?.email}
            readOnly
            className="w-full p-4 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Age */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-4 border rounded-lg"
            required
          />
        </div>

        {/* Skills */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Skills</label>
          <div className="flex flex-wrap gap-4">
            {skillsList.map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => handleCheckboxChange(skill)}
                  className="h-5 w-5"
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Available Days</label>
          <Select
            isMulti
            options={daysOptions}
            onChange={setSelectedDays}
            className="w-full"
            required
          />
        </div>

        {/* Available Time */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Available Time</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="e.g. 6pm - 8pm"
            className="w-full p-4 border rounded-lg"
            required
          />
        </div>

        {/* Available Slots */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Available Slots</label>
          <div className="flex flex-col gap-4">
            {availableSlots.map((slot) => (
              <label key={slot._id} className="flex items-center gap-2 bg-gray-100 p-4 rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedSlots.includes(slot._id)}
                  onChange={() => handleSlotSelection(slot._id)}
                  className="h-5 w-5"
                />
                <div>
                  <p className="font-semibold">{slot.className} - {slot.slotName}</p>
                  <p className="text-sm text-gray-600">Time: {slot.slotTime}</p>
                  <p className="text-sm text-gray-600">Days: {slot.days.join(", ")}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-1">
          <label className="text-lg font-semibold text-gray-700">Currently Available?</label>
          <input
            type="checkbox"
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
            className="h-5 w-5"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-[#f34e3a] text-white font-semibold rounded-lg hover:bg-[#e03a2d] transition-all"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeTrainerPage;
