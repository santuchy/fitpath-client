import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import Select from "react-select";

const AddSlotPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedDays, setSelectedDays] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  // 🟡 Dummy logged-in trainer info (replace with Firebase later)
  const trainer = {
    name: "Trainer Name",
    email: "trainer@email.com",
  };

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
      name: trainer.name,
      email: trainer.email,
      days: selectedDays.map((d) => d.value),
      slotName: data.slotName,
      slotTime: data.slotTime,
      className: data.className,
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
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-md shadow">
      <h2 className="text-3xl font-semibold text-center mb-6 text-green-600">
        Add New Slot
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Trainer Name */}
        <div>
          <label className="block font-medium mb-1">Trainer Name</label>
          <input
            value={trainer.name}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Trainer Email */}
        <div>
          <label className="block font-medium mb-1">Trainer Email</label>
          <input
            value={trainer.email}
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Select Days */}
        <div>
          <label className="block font-medium mb-1">Available Days</label>
          <Select
            options={dayOptions}
            isMulti
            value={selectedDays}
            onChange={setSelectedDays}
            placeholder="Select available days"
          />
        </div>

        {/* Slot Name */}
        <div>
          <label className="block font-medium mb-1">Slot Name</label>
          <input
            {...register("slotName", { required: true })}
            placeholder="e.g. Morning Slot"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block font-medium mb-1">Slot Time</label>
          <input
            {...register("slotTime", { required: true })}
            placeholder="e.g. 1 Hour"
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Class Dropdown */}
        <div>
          <label className="block font-medium mb-1">Class</label>
          <select
            {...register("className", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select a class</option>
            {classOptions.map((cls) => (
              <option key={cls.value} value={cls.value}>
                {cls.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          Submit Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlotPage;
