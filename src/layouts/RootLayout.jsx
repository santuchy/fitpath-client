import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';
import Footer from '../shared/Footer/Footer';
import BackToTop from '../pages/Home/BackToTop/BackToTop';

const RootLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      
      {/* Back to Top button (fixed) */}
      <BackToTop />
    </div>
    );
};

export default RootLayout;