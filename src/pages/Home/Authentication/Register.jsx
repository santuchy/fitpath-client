import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import { updateProfile } from 'firebase/auth';
import { AuthContext } from './../../../context/AuthContext';
import axios from 'axios';

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
            .then(async(result) => {
                const user = result.user;

                // update userInfo in the database
        const userInfo = {
            email: email,
            role: 'user', // default role
            created_at: new Date().toISOString(),
            last_log_in: new Date().toISOString()
        }

        const userRes = await axios.post('http://localhost:3000/users', userInfo);
        console.log(userRes.data);
        



                updateProfile(user, {
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
        <div className="flex justify-center items-center min-h-[27rem] md:min-h-[42rem] bg-gray-50 px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
                <h2 className="text-2xl font-semibold text-center mb-6">Register your account</h2>

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-sm">Name</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Photo URL</label>
                        <input
                            name="photo"
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Photo URL"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-sm">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                    >
                        Register
                    </button>

                    <p className="text-center text-sm font-medium pt-4">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-red-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
