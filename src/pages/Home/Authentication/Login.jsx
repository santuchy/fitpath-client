import React, { use, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { toast } from 'react-toastify';
import { AuthContext } from './../../../context/AuthContext';

const Login = () => {
  useEffect(() => {
    document.title = "Login | FitPath";
  }, []);

  const { signIn, googleSignIn, setUser } = use(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
  googleSignIn()
    .then(result => {
      const user = result.user;
      setUser(user);
      toast.success("Google Sign-in successful!");
      navigate(location.state ? location.state : '/');
    })
    .catch(error => {
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
        const _user = result.user; // or
// const user = result.user;
        toast.success("Login successful!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch(error => {
        const errorCode = error.code;
        toast.error("Login failed, Try again...");
        console.log(errorCode);
      });
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-center mb-6'>Login your account</h2>

        <form onSubmit={handleLogin} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium mb-1'>Email</label>
            <input
              type='email'
              name='email'
              required
              placeholder='Email'
              className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium mb-1'>Password</label>
            <input
              type='password'
              name='password'
              required
              placeholder='Password'
              className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='text-sm mt-1'>
              <a className='text-blue-600 hover:underline cursor-pointer'>Forgot password?</a>
            </div>
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition'
          >
            Login
          </button>

          <p className='text-center text-sm mt-4'>
            Don't Have An Account?{" "}
            <Link to="/auth/register" className='text-red-600 hover:underline'>
              Register
            </Link>
          </p>
        </form>

        {/* Google Sign-in */}
        <div className='mt-6'>
          <button
            onClick={handleGoogleSignIn}
            aria-label='Login with Google'
            type='button'
            className='w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-100 transition'
          >
            <svg
              aria-label='Google logo'
              width='20'
              height='20'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <g>
                <path d='m0 0H512V512H0' fill='#fff' />
                <path fill='#34a853' d='M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341' />
                <path fill='#4285f4' d='m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57' />
                <path fill='#fbbc02' d='m90 341a208 200 0 010-171l63 49q-12 37 0 73' />
                <path fill='#ea4335' d='m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55' />
              </g>
            </svg>
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
