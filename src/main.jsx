import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';
import Loading from './pages/Loading/Loading';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time or check if the app is ready (e.g., routing/data loading)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Simulate loading complete
    }, 3000); // You can change this to whatever makes sense for your use case
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> // Show loading animation during loading
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />  {/* Render the App which contains preloader */}
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  </StrictMode>,
);
