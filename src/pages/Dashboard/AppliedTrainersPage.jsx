import { useEffect, useState } from "react";
import axios from "axios";

const AppliedTrainersPage = () => {
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/applied-trainers').then(res => {
      setApplied(res.data);
    });
  }, []);

  const handleConfirm = async (id) => {
    await axios.patch(`http://localhost:3000/confirm-trainer/${id}`);
    setApplied(prev => prev.filter(t => t._id !== id));
  };

  const handleReject = async (id) => {
    const feedback = prompt("Enter rejection reason:");
    if (!feedback) return;
    await axios.delete(`http://localhost:3000/reject-trainer/${id}`, { data: { feedback } });
    setApplied(prev => prev.filter(t => t._id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Applied Trainers</h2>
      <div className="grid gap-4">
        {applied.map(t => (
          <div key={t._id} className="border p-4 shadow">
            <p><strong>Name:</strong> {t.name}</p>
            <p><strong>Email:</strong> {t.email}</p>
            <p><strong>Skills:</strong> {t.skills.join(', ')}</p>
            <p><strong>Age:</strong> {t.age}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleConfirm(t._id)} className="bg-green-500 px-3 py-1 text-white">Confirm</button>
              <button onClick={() => handleReject(t._id)} className="bg-red-500 px-3 py-1 text-white">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTrainersPage;
