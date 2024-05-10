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
    photoURL: string | null;
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
  flag1: boolean;
  flag2: boolean;
  setFlag1: (value: boolean) => void;
  setFlag2: (value: boolean) => void;
  contextData: any;
  setContextData: React.Dispatch<
    React.SetStateAction<any>
  >;
  version: number;
  setVersion: React.Dispatch<
    React.SetStateAction<number>
  >;
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
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
    }
  },
  flag1: false,
  flag2: false,
  setFlag1: () => {},
  setFlag2: () => {},
  contextData: [],
  setContextData: () => {},
  version: 0,
  setVersion: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [version, setVersion] = useState<number>(1);
  const [contextData, setContextData] = useState<any>([
    {
      recipeID: '662db1f04b8b9c73488be089',
      autoSave: false,
      version: 1,
      userID: {},
      promptData: [
        {
          isFocus: false,
          isExpand: false,
          role: "system",
          text: ``,
        },
        {
          isFocus: false,
          isExpand: false,
          role: `user`,
          text: ``,
        },
      ],
      variablesData: [],
      responseData: [
        {
          isFormat: 0,
          isOpen: true,
          isMoved: false,
          _id: "",
          model: "",
          name: "",
          class: "",
          text: '',
          limitations: {
            context_window: 16000,
            max_tokens: 4096,
            capabilities: ["text", "image", "video", "audio", "search", "tools"],
          },
          api: {
            provider: "",
            endpoint: "",
          },
          controls: [
          ],
        },
      ]
    },
  ]);
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
    accessToken: string | null;
    photoURL: string | null;
  } | null>(null);

  const [flag1, setFlag1] = useState<boolean>(false);
  const [flag2, setFlag2] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user:any) => {
      if (user) {
        setUser({
          uid: user.uid,
          accessToken: user.accessToken,
          photoURL: user.photoURL,
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
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
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
        flag1,
        flag2,
        setFlag1,
        setFlag2,
        contextData,
        setContextData,
        version,
        setVersion
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
