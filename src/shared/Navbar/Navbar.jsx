import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
// import { AuthContext } from "../../providers/AuthProvider"; 

const Navbar = () => {
  const { user, logout } = useContext;

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout().catch(console.error);
  };

  const navLinkStyle = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <Link to="/" className="text-xl font-bold text-gray-800">
            FitPath
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-6 text-gray-700 text-sm items-center">
          <NavLink to="/" className={navLinkStyle}>Home</NavLink>
          <NavLink to="/trainers" className={navLinkStyle}>All Trainers</NavLink>
          <NavLink to="/classes" className={navLinkStyle}>All Classes</NavLink>
          <NavLink to="/forum" className={navLinkStyle}>Community</NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkStyle}>Dashboard</NavLink>
          )}
        </div>

        {/* Right: Profile / Login */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {/* Profile Picture */}
              <div className="flex items-center gap-2">
                <img
                  src={user.photoURL || "/avatar.png"}
                  alt="User"
                  title={user.displayName || "User"}
                  className="w-8 h-8 rounded-full border"
                />
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
    {isOpen && (
  <div className="md:hidden bg-white shadow px-5 pt-4 pb-2 space-y-2">
    <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold block py-2" : "hover:text-blue-500 block py-2")}>
      Home
    </NavLink>
    <NavLink to="/trainers" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold block py-2" : "hover:text-blue-500 block py-2")}>
      All Trainers
    </NavLink>
    <NavLink to="/classes" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold block py-2" : "hover:text-blue-500 block py-2")}>
      All Classes
    </NavLink>
    <NavLink to="/forum" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold block py-2" : "hover:text-blue-500 block py-2")}>
      Community
    </NavLink>
    {user && (
      <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "text-blue-600 font-semibold block py-2" : "hover:text-blue-500 block py-2")}>
        Dashboard
      </NavLink>
    )}
    {user ? (
      <div className="flex flex-col gap-2">
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    ) : (
      <Link
        to="/login"
        className="text-sm inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Login
      </Link>
    )}
  </div>
)}
    </nav>
  );
};

export default Navbar;
