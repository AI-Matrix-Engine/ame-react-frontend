"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/utils/firebase";

const AuthContext = createContext<{
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
}>({
  user: null,
  loading: true,
  login: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),
  logout: () => Promise.resolve(),
  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });
    }
  },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);

    return await signOut(auth);
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });
      await logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        login,
        logout,
        register,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
