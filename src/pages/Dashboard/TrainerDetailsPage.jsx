import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";


const TrainerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState(null);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/trainers/${id}`).then((res) => {
      setTrainer(res.data);
      axios
        .get(`http://localhost:3000/slots/trainer/${res.data.email}`)
        .then((res) => setSlots(res.data));
    });
  }, [id]);

  if (!trainer) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Trainer Info */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-2xl font-bold mb-2">{trainer.name}</h2>
        <img src={trainer.image} alt={trainer.name} className="w-40 h-40 rounded-full mb-2" />
        <p><strong>Expertise:</strong> {trainer.skills?.join(", ")}</p>
        <p><strong>Age:</strong> {trainer.age}</p>
        <p><strong>Email:</strong> {trainer.email}</p>
      </div>

      {/* Available Slots */}
      <div className="border p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Available Slots</h3>
        {slots.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {slots.map((slot) => (
              <button
                key={slot._id}
                onClick={() => navigate(`/trainer-book/${slot._id}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {slot.slotName} ({slot.slotTime})
              </button>
            ))}
          </div>
        ) : (
          <p>No slots available.</p>
        )}
      </div>

      {/* Become a Trainer CTA */}
      <div className="text-center">
        <button
          onClick={() => navigate("/dashboard/be-a-trainer")}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Become a Trainer
        </button>
      </div>
    </div>
  );
};

export default TrainerDetailsPage;
