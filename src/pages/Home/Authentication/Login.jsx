import { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from './../../../context/AuthContext';
import axios from 'axios';
import Lottie from 'lottie-react';
import loginAnimation from '../../../assets/Animations/login.json'; // Path to your Lottie animation

const Login = () => {
  useEffect(() => {
    document.title = "Login | FitPath";
  }, []);

  const { signIn, googleSignIn, setUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;

        // Update user info in the database
        const userInfo = {
          email: user.email,
          role: 'user', // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString()
        };

        const res = await axios.post('http://localhost:3000/users', userInfo);
        console.log(res.data);

        setUser(user);
        toast.success("Google Sign-in successful!");
        navigate(location.state ? location.state : '/');
      })
      .catch((error) => {
        toast.error("Google Sign-in failed.");
        console.error(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const _user = result.user;
        toast.success("Login successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(error => {
        toast.error("Login failed, Try again...");
        console.log(error.code);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      {/* Card Container */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        
        {/* Lottie Animation */}
        <div className="w-full bg-orange-50 md:w-1/2 flex justify-center items-center p-6">
          {/* Increased size of Lottie animation */}
          <Lottie animationData={loginAnimation} loop={true} />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#f34e3a]">Login to Your Account</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f34e3a] transition-all duration-300"
              />
              <div className="text-sm mt-1">
                <a className="text-[#f34e3a] hover:underline cursor-pointer">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f34e3a] text-white py-3 rounded-lg hover:bg-[#e03a2d] transition duration-300 font-semibold"
            >
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-[#f34e3a] hover:underline">
                Register
              </Link>
            </p>
          </form>

          {/* Google Sign-in */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              aria-label="Login with Google"
              type="button"
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <svg
                aria-label="Google logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff" />
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                </g>
              </svg>
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
