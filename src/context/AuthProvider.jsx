import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";






const auth =getAuth(app);


const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);

    const[loading, setLoading] =useState(true);

    const provider = new GoogleAuthProvider();


    console.log(loading, user);
    

    const createUser = (email, password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut =()=>{
        return signOut (auth);
    }

     const googleSignIn =()=> {
        return signInWithPopup (auth, provider);
    }

    useEffect(()=>{
       const unsubscribe =onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return () =>{
            unsubscribe();
        }
    },[])

    const authData = {
        user,
        setUser,
        createUser,
        logOut,
        signIn,
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