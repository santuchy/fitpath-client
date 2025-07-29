import React, { useContext, useEffect } from 'react';
import { AuthContext } from './../context/AuthContext';
import useUserRole from '../hooks/useUserRole';
import { Navigate, useLocation } from 'react-router';

const TrainerRoute = ({children}) => {

    // const { user, loading } = useContext(AuthContext);
    // const {role} = useUserRole();

    const { user, loading: authLoading } = useContext(AuthContext);
  const location = useLocation();
const { role, loading: roleLoading } = useUserRole(user?.email);

    // Log to check if user and role are properly set
    useEffect(() => {
        console.log('User:', user);  
        console.log('Role:', role);  
    }, [user, role]);

     // Combine loading states
  if (authLoading || roleLoading) {
    return <div>Loading...</div>; 
  }

    if (!user || role !== 'trainer'){
        // return <Navigate state={location.pathname} to="/forbidden"></Navigate>

        return <Navigate to="/forbidden" state={{ from: location }} />;
    }

    return children;
};

export default TrainerRoute;