import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from './../../context/AuthContext';

const AddClassPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/classes", data);
      if (res.data.insertedId || res.data.acknowledged) {
        Swal.fire("Success!", "Class added successfully!", "success");
        reset();
      } else {
        Swal.fire("Failed!", "Something went wrong!", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Server error occurred", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
        Add a New Class
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Class Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="e.g. Power Yoga"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            placeholder="https://image-link.com/photo.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write class details..."
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClassPage;
