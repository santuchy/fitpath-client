import React, { use } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Navigate, useLocation } from 'react-router';



const PrivateRoute = ({children}) => {
    const {user, loading}= use(AuthContext)
    // console.log(user);

    const location = useLocation();
    // console.log(location);
    

    if (loading){
        return <div>Loading trainers...</div>;
    }

    if (user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
    
   
};

export default PrivateRoute;