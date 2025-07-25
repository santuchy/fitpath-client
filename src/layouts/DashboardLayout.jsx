// src/layouts/DashboardLayout.jsx
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slotId, setSlotId] = useState(null);

  useEffect(() => {
    const savedSlotId = localStorage.getItem("lastBookedSlotId");
    if (savedSlotId) {
      setSlotId(savedSlotId);
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-100 w-full lg:w-64 lg:min-h-screen p-4">
        {/* Mobile Menu Toggle */}
        <div className="flex justify-between items-center lg:hidden mb-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className={`space-y-2 text-base mt-4 lg:mt-0 ${isOpen ? "block" : "hidden"} lg:block`}>
          <li>
            <NavLink to="/" className="block hover:text-blue-500">
              Homepage
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className="block hover:text-blue-500">
              My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to={slotId ? `/dashboard/booked-trainer?slotId=${slotId}` : "/dashboard/booked-trainer"}
              className="block hover:text-blue-500"
            >
              Booked Trainer
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-class" className="block hover:text-blue-500">
              Add Class
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-slot" className="block hover:text-blue-500">
              Add Slot
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-slots" className="block hover:text-blue-500">
              Manage Slots
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/applied-trainers" className="hover:text-blue-500">
              Applied Trainers
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/activity-log" className="hover:text-blue-500">
              Activity Log
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
