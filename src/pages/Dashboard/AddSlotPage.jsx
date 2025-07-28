import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { AuthContext } from './../../context/AuthContext';
import axios from "axios";

const AddSlotPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [classOptions, setClassOptions] = useState([]);
  const { user } = useContext(AuthContext);  // Get logged-in user's info (firebase)

  const dayOptions = [
    { value: "Sun", label: "Sun" },
    { value: "Mon", label: "Mon" },
    { value: "Tue", label: "Tue" },
    { value: "Wed", label: "Wed" },
    { value: "Thu", label: "Thu" },
    { value: "Fri", label: "Fri" },
    { value: "Sat", label: "Sat" },
  ];

  useEffect(() => {
    // Fetching available classes for slot selection
    axios.get("http://localhost:3000/classes").then((res) => {
      const options = res.data.map((cls) => ({
        value: cls.name,
        label: cls.name,
      }));
      setClassOptions(options);
    });
  }, []);

  const onSubmit = async (data) => {
    const slotData = {
      name: user.displayName,           // Trainer's name
      trainerEmail: user.email,         // Consistent field name
      days: selectedDays.map((d) => d.value),
      slotName: data.slotName,
      slotTime: data.slotTime,
      className: data.className,
      isAvailable: true,                // ✅ This is the missing part
    };

    try {
      const res = await axios.post("http://localhost:3000/slots", slotData);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success!", "Slot added successfully!", "success");
        reset();
        setSelectedDays([]);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to add slot.", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-12 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#f34e3a]">Add New Slot</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Trainer Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Trainer Name</label>
          <input
            value={user?.displayName}  // Dynamically fetch name from Firebase
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
          />
        </div>

        {/* Trainer Email */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Trainer Email</label>
          <input
            value={user?.email}  // Dynamically fetch email from Firebase
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
          />
        </div>

        {/* Select Days */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Available Days</label>
          <Select
            options={dayOptions}
            isMulti
            value={selectedDays}
            onChange={setSelectedDays}
            placeholder="Select available days"
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Slot Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Slot Name</label>
          <input
            {...register("slotName", { required: true })}
            placeholder="e.g. Morning Slot"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Slot Time</label>
          <input
            {...register("slotTime", { required: true })}
            placeholder="e.g. 1 Hour"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
          />
        </div>

        {/* Class Dropdown */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Class</label>
          <select
            {...register("className", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
          >
            <option value="">Select a class</option>
            {classOptions.map((cls) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-[#f34e3a] text-white font-semibold rounded-md hover:bg-[#e03a2d] transition-all duration-300"
        >
          Submit Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlotPage;
