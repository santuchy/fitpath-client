import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const auth =getAuth(app);


const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);

     const [role, setRole] = useState(null);

    const[loading, setLoading] =useState(true);

    const provider = new GoogleAuthProvider();
    
// Create a new user
    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout =()=>{
        return signOut (auth);
    }

     const googleSignIn =()=> {
        return signInWithPopup (auth, provider);
    }

       // Fetch role based on email
  const fetchUserRole = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/role/${email}`); // Pass email instead of UID
      setRole(response.data.role); // Set the role in state
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRole(null); // Fallback to null if role fetch fails
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserRole(currentUser.email); // Fetch role using email
      } else {
        setRole(null); // Reset role if user logs out
      }
      setLoading(false); // Stop loading when user info is loaded
    });

    return () => {
      unsubscribe(); // Clean up listener
    };
  }, []);

  const authData = {
    user,
    role,
    setUser,
    createUser,
    signIn,
    logout,
    loading,
    setLoading,
    googleSignIn,
  };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;