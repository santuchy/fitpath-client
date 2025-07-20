import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import axios from "axios";


const daysOptions = [
  { value: "Sun", label: "Sun" },
  { value: "Mon", label: "Mon" },
  { value: "Tue", label: "Tue" },
  { value: "Wed", label: "Wed" },
  { value: "Thu", label: "Thu" },
  { value: "Fri", label: "Fri" },
  { value: "Sat", label: "Sat" },
];

const skillsList = ["Yoga", "Cardio", "Zumba", "Weight Training", "CrossFit"];

const BeTrainerPage = () => {
  const { user } = useContext(AuthContext);
  
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [age, setAge] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainerData = {
      name: user.name,
      email: user.email,
      image: user.photoURL,
      age,
      availableDays: selectedDays.map((d) => d.value),
      skills: selectedSkills,
      availableTime: time,
    };

    try {
      const res = await axios.post("http://localhost:3000/applied-trainers", trainerData);
      if (res.data.insertedId) {
        alert("Applied successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckboxChange = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Become a Trainer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input defaultValue={user?.displayName} readOnly className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input defaultValue={user?.email} readOnly className="w-full border px-3 py-2 rounded" />
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
          <Select
            isMulti
            options={daysOptions}
            onChange={setSelectedDays}
            required
          />
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
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Apply
        </button>
      </form>
    </div>
  );
};

export default BeTrainerPage;
