// src/pages/Dashboard/ActivityLogPage.jsx
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';
import { Dialog } from "@headlessui/react";
import { FaEye } from "react-icons/fa";


const ActivityLogPage = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/my-applications/${user.email}`)
      .then((res) => setApplications(res.data))
      .catch((err) => console.error("Failed to fetch applications:", err));
  }, [user?.email]);

  const openModal = (message) => {
    setRejectionMessage(message || "No message provided.");
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-bold text-center mb-6">Activity Log</h2>

      {applications.length === 0 ? (
        <p className="text-center">No applications found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className="text-center">
                <td className="p-2 border">{app.name}</td>
                <td className="p-2 border">{app.email}</td>
                <td className={`p-2 border font-medium ${app.status === "Rejected" ? "text-red-600" : "text-blue-600"}`}>
                  {app.status}
                </td>
                <td className="p-2 border">
                  {app.status === "Rejected" && (
                    <button
                      onClick={() => openModal(app.message)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEye />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Rejection Message */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded p-6">
            <Dialog.Title className="text-xl font-bold mb-4">Admin Feedback</Dialog.Title>
            <p className="text-gray-700">{rejectionMessage}</p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ActivityLogPage;
