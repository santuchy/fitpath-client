import { useContext, useState, useEffect } from "react";
import { FaBars, FaTimes, FaHome, FaUsers, FaCrown, FaClipboardList, FaDollarSign, FaUserShield } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router";
import Lottie from 'lottie-react';
import { AuthContext } from './../context/AuthContext';
import useUserRole from "../hooks/useUserRole";
import welcomeAnimation from "../assets/Animations/welcome.json";

const DashboardLayout = () => {

  useEffect(() => {
      document.title = "Dashboard | FitPath";
    }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [slotId, setSlotId] = useState(null);
  
  const { user } = useContext(AuthContext);
  const { role, loading } = useUserRole(user?.email);
  
  const location = useLocation();  

  useEffect(() => {
    const savedSlotId = localStorage.getItem("lastBookedSlotId");
    if (savedSlotId) {
      setSlotId(savedSlotId);
    }
  }, []);

  // Check if the current path is the dashboard path
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="bg-orange-50 w-full lg:w-64 p-4 lg:min-h-screen shadow-md">
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
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
              }
            >
              <FaHome /> <span>Homepage</span>
            </NavLink>
          </li>

          {/* Trainer Route */}
          {!loading && role === 'trainer' && (
            <>
              <li>
                <NavLink 
                  to="/dashboard/add-slot" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaClipboardList /> <span>Add New Slot</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/manage-slots" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaClipboardList /> <span>Manage Slots</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Admin and Trainer Routes */}
          {!loading && (role === 'admin' || role === 'trainer') && (
            <li>
              <NavLink 
                to="/dashboard/add-forum" 
                className={({ isActive }) => 
                  `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                }
              >
                <FaCrown /> <span>Add New Forum</span>
              </NavLink>
            </li>
          )}

          {/* Admin Routes */}
          { !loading && role === 'admin' && (
            <>
              <li>
                <NavLink 
                  to="/dashboard/add-class" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaUsers /> <span>Add New Class</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/applied-trainers" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaUsers /> <span>Applied Trainers</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/all-subscribers" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaUsers /> <span>All Subscribers</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/all-trainers" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaUsers /> <span>All Trainers</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/balance" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaDollarSign /> <span>Balance</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Member Routes */}
          {!loading && role === 'user' && (
            <>
              <li>
                <NavLink 
                  to={slotId ? `/dashboard/booked-trainer?slotId=${slotId}` : "/dashboard/booked-trainer"} 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaUsers /> <span>Booked Trainer</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/activity-log" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaClipboardList /> <span>Activity Log</span>
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/dashboard/profile" 
                  className={({ isActive }) => 
                    `flex items-center gap-2 p-2 rounded transition duration-200 ${isActive ? 'bg-[#f34e3a] text-white' : 'hover:bg-[#f34e3a] hover:text-white'}`
                  }
                >
                  <FaUserShield /> <span>My Profile</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Conditional Lottie animation */}
        {isDashboardPage && (
          <div className="flex flex-col items-center mb-8">
            <Lottie animationData={welcomeAnimation} loop={true} className="lg:w-[700px] lg:h-[700px] sm:w-[300px] sm:h-[300px]" />
            <h2 className="text-4xl font-bold text-[#f34e3a] mt-4">Ignite Your Potential – Welcome to Your Dashboard!</h2>
            <p className="text-center text-gray-600 text-lg mt-2">Access your progress, workouts, and more. Let's make every session count. Use the sidebar to navigate through different sections based on your role.</p>
          </div>
        )}

        {/* Dashboard Routes */}
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
