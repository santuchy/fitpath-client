import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from './../../../context/AuthContext';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import Lottie from 'lottie-react';
import registerAnimation from '../../../assets/Animations/register.json';

const Register = () => {
  useEffect(() => {
    document.title = "Register | FitPath";
  }, []);

  const { createUser, setUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Password validation checks
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("Password must contain an uppercase letter.");
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain a special character.");
      return;
    } else if (!/[0-9]/.test(password)) {
      setError("Password must contain a numeric character.");
      return;
    } else {
      setError("");
    }

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;

    createUser(email, password)
      .then(async (result) => {
        const user = result.user;

        // Update user info in the database
        const userInfo = {
          email: email,
          role: 'user', // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };

        const userRes = await axios.post('https://fit-path-server.vercel.app/users', userInfo);
        console.log(userRes.data);

        // Update Firebase user profile
        await updateProfile(user, {
          displayName: name,
          photoURL: photo
        });

        toast.success("Registration successful!");
        setUser(user);
        navigate(location.state ? location.state : '/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
        toast.error("Registration failed, try again...");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        
        {/* Lottie Animation */}
        <div className="w-full bg-orange-50 md:w-1/2 flex justify-center items-center p-6">
          <Lottie animationData={registerAnimation} loop={true} />
        </div>

        {/* Register Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#f34e3a]">Register Your Account</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
                placeholder="Full Name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
                placeholder="Email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                name="photo"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
                placeholder="Photo URL"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
                placeholder="Password"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#f34e3a] text-white py-3 rounded-lg hover:bg-[#e03a2d] transition duration-300 font-semibold"
            >
              Register
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-[#f34e3a] hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
