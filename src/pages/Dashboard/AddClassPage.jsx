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
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-[#f34e3a]">
        Add a New Class
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Class Name */}
        <div>
          <label className="block font-medium text-lg text-gray-700 mb-2">
            Class Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="e.g. Power Yoga"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition duration-300"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium text-lg text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            placeholder="https://image-link.com/photo.jpg"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition duration-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-lg text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write class details..."
            rows={5}
            className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition duration-300"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-[#f34e3a] text-white text-lg font-semibold rounded-lg hover:bg-[#e03a2d] transition-all duration-300"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassPage;
