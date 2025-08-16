import { FaUserCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/fitpath-logo.png";
import { AuthContext } from "./../../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully!");
        setIsOpen(false); // mobile menu auto-close after logout
      })
      .catch((error) => {
        toast.error("Logout failed!");
        console.error(error);
      });
  };

  const navLinkStyle = ({ isActive }) =>
    `text-sm tracking-wide ${
      isActive
        ? "text-[#f34e3a] font-semibold"
        : "text-black hover:text-[#f34e3a]"
    }`;

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
      {/* ALIGNMENT-CONTAINER: matches other sections */}
      <div className="max-w-11/12 mx-auto px-4 md:px-10 lg:px-20 h-16 flex items-center justify-between">
        {/* Left: Logo (aligned with container padding) */}
        <div className="flex items-center gap-2">
          <Link to="/" className="inline-flex items-center" onClick={closeMobile}>
            <img src={logo} alt="FitPath" className="h-8 md:h-9 w-auto" />
          </Link>
        </div>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkStyle}>
            HOME
          </NavLink>
          <NavLink to="/trainers" className={navLinkStyle}>
            ALL TRAINERS
          </NavLink>
          <NavLink to="/classes" className={navLinkStyle}>
            ALL CLASSES
          </NavLink>
          <NavLink to="/forum" className={navLinkStyle}>
            COMMUNITY
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkStyle}>
              DASHBOARD
            </NavLink>
          )}
        </div>

        {/* Right: Profile / Login (desktop) — aligned with right padding */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    title={user.displayName || "User"}
                    className="w-8 h-8 rounded-full border"
                  />
                ) : (
                  <FaUserCircle className="text-2xl text-gray-500" />
                )}
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-lg bg-[#f34e3a] px-4 py-2 text-white text-sm font-medium
                           shadow-md transition-all duration-300 ease-out
                           hover:bg-[#e03a2d] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#f34e3a]/30
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/50"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="inline-flex items-center justify-center rounded-lg bg-[#f34e3a] px-4 py-2 text-white text-sm font-medium
                         shadow-md transition-all duration-300 ease-out
                         hover:bg-[#e03a2d] hover:scale-[1.03] hover:shadow-lg hover:shadow-[#f34e3a]/30
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/50"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200
                       text-gray-700 hover:text-[#f34e3a] hover:border-[#f34e3a]
                       transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/40"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav — wrapped in same alignment container */}
      {isOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="max-w-11/12 mx-auto px-4 md:px-10 lg:px-20 pt-3 pb-4 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "text-[#f34e3a] font-semibold" : "text-black hover:text-[#f34e3a]"} block py-2`
              }
              onClick={closeMobile}
            >
              Home
            </NavLink>
            <NavLink
              to="/trainers"
              className={({ isActive }) =>
                `${isActive ? "text-[#f34e3a] font-semibold" : "text-black hover:text-[#f34e3a]"} block py-2`
              }
              onClick={closeMobile}
            >
              All Trainers
            </NavLink>
            <NavLink
              to="/classes"
              className={({ isActive }) =>
                `${isActive ? "text-[#f34e3a] font-semibold" : "text-black hover:text-[#f34e3a]"} block py-2`
              }
              onClick={closeMobile}
            >
              All Classes
            </NavLink>
            <NavLink
              to="/forum"
              className={({ isActive }) =>
                `${isActive ? "text-[#f34e3a] font-semibold" : "text-black hover:text-[#f34e3a]"} block py-2`
              }
              onClick={closeMobile}
            >
              Community
            </NavLink>
            {user && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${isActive ? "text-[#f34e3a] font-semibold" : "text-black hover:text-[#f34e3a]"} block py-2`
                }
                onClick={closeMobile}
              >
                Dashboard
              </NavLink>
            )}

            {user ? (
              <button
                onClick={handleLogout}
                className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-[#f34e3a] px-4 py-2 text-white text-sm font-medium
                           shadow-md transition-all duration-300 ease-out
                           hover:bg-[#e03a2d] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#f34e3a]/30
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/50"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                onClick={closeMobile}
                className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-[#f34e3a] px-4 py-2 text-white text-sm font-medium
                           shadow-md transition-all duration-300 ease-out
                           hover:bg-[#e03a2d] hover:scale-[1.02] hover:shadow-lg hover:shadow-[#f34e3a]/30
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f34e3a]/50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
