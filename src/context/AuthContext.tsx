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
  models: any;
  setModels: React.Dispatch<React.SetStateAction<any>>;
  flag1: boolean;
  flag2: boolean;
  setFlag1: (value: boolean) => void;
  setFlag2: (value: boolean) => void;
  variableData: {
    title: string;
    text: string;
    advanced: {
      tarea: string;
      dValue: string;
      databaseField: string;
    };
  }[];
  setVariableData: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        text: string;
        advanced: {
          tarea: string;
          dValue: string;
          databaseField: string;
        };
      }[]
    >
  >;
  promptData: {
    isExpand: boolean;
    role: string;
    text: string;
  }[];
  setPromptData: React.Dispatch<
    React.SetStateAction<
      {
        isExpand: boolean;
        role: string;
        text: "";
      }[]
    >
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
  models: [
    {
      _id: "6616e8d7c4dd135b3e82fddb",
      model: "gpt-4-turbo-2024-04-09",
      name: "GPT-4 Turbo Latest 2024-04-09",
      class: "gpt-4",
      limitations: {
        context_window: 16000,
        max_tokens: 4096,
        capabilities: ["text", "image", "video", "audio", "search", "tools"],
      },
      api: {
        provider: "OpenAI",
        endpoint: "chat_completions",
      },
      controls: [
        {
          id: "temperature",
          componentType: "slider",
          label: "Temperature",
          helpText:
            "The higher the temperature, the more random the text. 0.0 is deterministic.",
          type: "float",
          value: 0.7,
          min: 0.0,
          max: 1.0,
          step: 0.01,
        },
      ],
    },
  ],
  setModels: () => { },
  flag1: false,
  flag2: false,
  setFlag1: () => { },
  setFlag2: () => { },
  variableData: [
    {
      title: "",
      text: "",
      advanced: {
        tarea: "",
        dValue: "",
        databaseField: "",
      },
    },
  ],
  setVariableData: () => { },
  promptData: [
    {
      isExpand: false,
      role: "system",
      text: ``,
    },
  ],
  setPromptData: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [models, setModels] = useState<any>([
    {
      isOpen: false,
      _id: "6616e8d7c4dd135b3e82fddb",
      model: "gpt-4-turbo",
      name: "GPT-4 Turbo Latest 2024-04-09",
      class: "gpt-4",
      limitations: {
        context_window: 16000,
        max_tokens: 4096,
        capabilities: ["text", "image", "video", "audio", "search", "tools"],
      },
      api: {
        provider: "OpenAI",
        endpoint: "chat_completions",
      },
      controls: [
        {
          id: "temperature",
          componentType: "slider",
          label: "Temperature",
          helpText:
            "The higher the temperature, the more random the text. 0.0 is deterministic.",
          type: "float",
          value: 0.7,
          min: 0.0,
          max: 1.0,
          step: 0.01,
        },
      ],
    },
  ]);
  const [promptData, setPromptData] = useState<any>([
    {
      isExpand: false,
      role: "system",
      text: ``,
    },
    {
      isExpand: false,
      role: `user`,
      text: ``,
    },
  ]);
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
  } | null>(null);

  const [flag1, setFlag1] = useState<boolean>(false);
  const [flag2, setFlag2] = useState<boolean>(false);

  const [variableData, setVariableData] = useState<
    {
      title: string;
      text: string;
      advanced: {
        tarea: string;
        dValue: string;
        databaseField: string;
      };
    }[]
  >([]);

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
        models,
        setModels,
        flag1,
        flag2,
        setFlag1,
        setFlag2,
        variableData,
        setVariableData,
        promptData,
        setPromptData,
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
