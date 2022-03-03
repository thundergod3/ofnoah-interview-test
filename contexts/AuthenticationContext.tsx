import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../firebase";

interface AuthenticationContextI {
  checkAuthentication?: boolean;
  handleLogin?: (email: string, password: string) => void;
  handleSignUp?: (email: string, password: string) => void;
}

const AuthenticationContext = createContext<AuthenticationContextI>({});

const useAuthentication = () => useContext(AuthenticationContext);

const AuthenticationProvider = ({ children }) => {
  const [checkAuthentication, setAuthentication] = useState(null);

  const handleLogin = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleSignUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setAuthentication(true);
      else setAuthentication(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        checkAuthentication,
        handleLogin,
        handleSignUp,
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export { useAuthentication, AuthenticationProvider };
