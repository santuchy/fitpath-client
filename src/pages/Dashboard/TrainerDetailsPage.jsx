import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from 'framer-motion';

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/trainer/${id}`).then((res) => {
      setTrainer(res.data);
      axios
        .get(`http://localhost:3000/slots/trainer/${res.data.email}`)
        .then((res) => {
          setSlots(res.data);
        });
    });
  }, [id]);

  if (!trainer) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Grid for Trainer Info and Slots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Trainer Info Section */}
        <div className="bg-white border rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-[#f34e3a] mb-4">{trainer.name}</h2>
          <div className="flex items-center mb-6">
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-[#f34e3a] mr-6"
            />
            <div>
              <p className="text-xl font-medium text-gray-800"><strong>Expertise:</strong> {trainer.skills?.join(", ")}</p>
              <p className="text-lg text-gray-600"><strong>Age:</strong> {trainer.age}</p>
              <p className="text-lg text-gray-600"><strong>Email:</strong> {trainer.email}</p>
            </div>
          </div>
        </div>

        {/* Available Slots Section */}
        <div className="bg-white border rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-[#f34e3a] mb-6">Available Slots</h3>
          {slots.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {slots.map((slot) => (
                <motion.div
                  key={slot._id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer hover:bg-[#f34e3a] hover:text-white transition-all duration-300"
                  onClick={() => navigate(`/trainer-book/${slot._id}`)}
                >
                  <p className="text-lg">{slot.slotName}</p>
                  <p className="text-gray-600">{slot.slotTime}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No slots available.</p>
          )}
        </div>
      </div>

      {/* Become a Trainer CTA Centered Below the Two Sections */}
      <div className="flex justify-center">
        <motion.button
          onClick={() => navigate("/dashboard/be-a-trainer")}
          className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
        >
          Become a Trainer
        </motion.button>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;
