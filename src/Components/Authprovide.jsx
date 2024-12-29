import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase.init';
import axios from 'axios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const[userinfor,setUserinfor]=useState(null);

   
  
  


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const googleProvider = new GoogleAuthProvider();
const loginwithgoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signout = () => {
        setLoading(true);
        // console.log('User signed out successfully');
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Sign-out successful.")
            setUser(null)
          }).catch((error) => {
            // An error happened.
            console.log("an error ");
          });
        
        
        
      }; 
      const [isChecked, setIsChecked] = useState(false);
      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          if (currentUser?.email) {
            const user = { email: currentUser.email };

            axios.post(`${import.meta.env.VITE_API_URL}/jwt`, user, { withCredentials: true })
                .then(res => {
                    console.log('login token', res.data);
                    setLoading(false);
                })

        }
        else {
            axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
                withCredentials: true
            })
            .then(res => {
                console.log('logout', res.data);
                setLoading(false);
            })
        }
         
        });
        return () => {
          unsubscribe();
        };
      }, []);
    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        loginwithgoogle,
        isChecked, setIsChecked,
         email,
        setEmail,
        user,
        setUser,
        signout,
        userinfor,setUserinfor,

    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;