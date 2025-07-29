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

  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); 
    }, 3000); 
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> 
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container); 

root.render( 
  <StrictMode>
    <AuthProvider>
      <App />  
      <ToastContainer position="top-center" autoClose={2000} />
    </AuthProvider>
  </StrictMode>
);
