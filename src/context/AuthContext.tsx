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
import axios from "axios";
import { useSocketManager } from '@/lib/socket';

const AuthContext = createContext<{
  user: {
    photoURL: string | null;
    uid: string;
    email: string | null;
    displayName: string | null;
    accessToken: string | null;
    token: string | null;
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
  eventHistory: number[];
  setEventHistory: (history: number[]) => void;
  contextData: any;
  setContextData: React.Dispatch<React.SetStateAction<any>>;
  version: number;
  setVersion: React.Dispatch<
    React.SetStateAction<number>
  >;
  // getResponseData: (index: number, data: any) => void;
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
  setFlag1: () => { },
  setFlag2: () => { },
  eventHistory: [],
  setEventHistory: () => { },
  contextData: [],
  setContextData: () => { },
  version: 0,
  setVersion: () => { },
  // getResponseData: (index: number, data: any) => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [version, setVersion] = useState<number>(1);
  const [eventHistory, setEventHistory] = useState<number[]>([]);
  const [contextData, setContextData] = useState<any>([
    {
      recipeID: "662db1f04b8b9c73488be089",
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
          isModelSettingOpen: true,
          isMoved: false,
          _id: "",
          model: "",
          name: "",
          class: "",
          text: "",
          limitations: {
            context_window: 16000,
            max_tokens: 4096,
            capabilities: [
              "text",
              "image",
              "video",
              "audio",
              "search",
              "tools",
            ],
          },
          api: {
            provider: "",
            endpoint: "",
          },
          controls: [],
        },
      ],
    },
  ]);
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
    accessToken: string | null;
    photoURL: string | null;
    token: string | null;
  } | null>(null);

  const [flag1, setFlag1] = useState<boolean>(false);
  const [flag2, setFlag2] = useState<boolean>(false);

  useEffect(() => {
    const handleAuthStateChange = async (user: any) => {
      if (user) {
        try {
          // Get the user's ID token asynchronously
          const token: string = await user.getIdToken();

          // Set the user state with the user's information and token
          setUser({
            uid: user.uid,
            accessToken: user.accessToken,
            photoURL: user.photoURL,
            email: user.email,
            displayName: user.displayName,
            token: token,
          });
        } catch (error) {
          console.error("Error getting user token:", error);
          setUser({
            uid: user.uid,
            email: user.email,
            accessToken: user.accessToken,
            photoURL: user.photoURL,
            displayName: user.displayName,
            token: "",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    // Cleanup the subscription when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const handleData = async () => {
      const result = await axios.get('https://aimatrix-api.vercel.app/api/playground', {
        params: {
          user_id: user?.uid
        }
      });

      let playgroundData = null;
      if (result.data) {
        playgroundData = result.data.data;
      }

      if (playgroundData) {
        setContextData(playgroundData);
      }
    };

    handleData();
  }, [user]);

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

  const updateContextData = (itemIndex: number, character: string) => {
    const currentResponseData = contextData[version - 1].responseData;
    const updateData = currentResponseData.map((item: any, i: number) => {
      if (i === itemIndex) {
        item.text = item.text + character;
      }
      return item;
    });

    const updateContextData = contextData.map((item: any, key: number) => {
      if (key === version - 1) {
        item.responseData = updateData;
      }
      return item;
    });
    setContextData(updateContextData);
  }

  // const getResponseData = (index: number, data: any) => {
  //   if (!socketService.getSocket()) {
  //     socketService.init(user?.token ? user.token : "", user?.uid ? user.uid : "");
  //   }

  //   const socket = socketService.getSocket();

  //   if (socket) {
  //     socketService.getSocket()?.emit('playground_request', { sid: index, data: data });
  //     if (!eventHistory.includes(index) || eventHistory.length === 0) {
  //       eventHistory.push(index);
  //       setEventHistory(eventHistory);
  //       const eventName = `${user?.uid}_stream_response_${index}`;
  //       socketService.getSocket()?.on(eventName, (data) => {
  //         for (let i = 0; i < data.data.length; i++) {
  //           const character = data.data[i];
  //           setTimeout(() => {
  //             updateContextData(index, character);
  //           }, 150)
  //         }
  //       });
  //     }
  //   }

  //   return () => {
  //     socket?.off('playground_request');
  //   };
  // }

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
        eventHistory,
        setEventHistory,
        contextData,
        setContextData,
        version,
        setVersion,
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
