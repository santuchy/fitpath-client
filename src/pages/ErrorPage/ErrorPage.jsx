import React from 'react';
import { Link, useRouteError } from 'react-router';
import errorAnimation from '../../assets/Animations/404 page.json';
import Lottie from 'lottie-react';

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error?.error?.message);
    
    return (
        <div className='min-h-screen bg-repeat text-white'>
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center pb-10 max-w-11/12 mx-auto'>
                    {/* Lottie Animation centered using flexbox */}
                    <div className="mx-auto mb-8" style={{ maxWidth: '600px', height: 'auto' }}>
                        <Lottie animationData={errorAnimation} loop={true} className="mx-auto" style={{ width: '100%', height: 'auto' }} />
                    </div>

                    <h1 className='mb-6 text-7xl font-bold text-[#f34e3a]'>
                        {error?.status || 404}
                    </h1>
                    <p className='mb-6 text-xl font-semibold text-gray-700 md:text-2xl'>
                        {error?.error?.message || 'Something Went Wrong!'}
                    </p>

                    <div className="flex justify-center">
                        <Link to='/'>
                            <button className="focus:outline-none bg-[#f34e3a] hover:bg-[#e03a2d] focus:ring-4 focus:ring-[#e03a2d] font-medium rounded-lg text-sm px-5 py-3 me-2 dark:focus:ring-[#e7462d] transition-all duration-300">
                                Go to Homepage
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
