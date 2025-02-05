'use client'
import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from "next/navigation";


const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setactiveMenu] = useState(true);
  const [screenSize, setscreenSize] = useState(undefined);

  const router = useRouter();

  //checks if auth works, assign user and loading values
  useEffect(() => {
    const cancelAuthListener = onAuthStateChanged(auth, (user)=> {
      setUser(user);
      setLoading(false);
    });

    return () => cancelAuthListener();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout: () => {
          auth.signOut();
          router.push("/");
        },
        activeMenu,
        setactiveMenu,
        screenSize,
        setscreenSize,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
