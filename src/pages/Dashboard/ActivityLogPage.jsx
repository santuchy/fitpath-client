import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from './../../context/AuthContext';
import { Dialog } from "@headlessui/react";
import { FaEye } from "react-icons/fa";
import Loading from "../Loading/Loading";

const ActivityLogPage = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-[#f34e3a] mb-6">Activity Log</h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-600">No applications found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-[#f34e3a] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 transition-all">
                  <td className="py-3 px-6">{app.name}</td>
                  <td className="py-3 px-6">{app.email}</td>
                  <td className={`py-3 px-6 font-medium ${app.status === "Rejected" ? "text-red-600" : "text-green-600"}`}>
                    {app.status}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {app.status === "Rejected" && (
                      <button
                        onClick={() => openModal(app.message)}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <FaEye className="text-xl" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Rejection Message */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <Dialog.Title className="text-xl font-semibold text-[#f34e3a] mb-4">Admin Feedback</Dialog.Title>
            <p className="text-gray-700">{rejectionMessage}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
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
