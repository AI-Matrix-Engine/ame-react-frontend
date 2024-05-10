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

const AuthContext = createContext<{
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    token: string;
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
    isFocus: boolean;
    isExpand: boolean;
    role: string;
    text: string | any;
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
      isFocus: false,
      isExpand: false,
      role: "system",
      text: ``,
    },
  ],
  setPromptData: () => { },
  contextData: [],
  setContextData: () => { },
  version: 0,
  setVersion: () => { },
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
  const [models, setModels] = useState<any>([
    {
      isOpen: false,
      isMoved: false,
      _id: "6616e8d7c4dd135b3e82fddb",
      model: "gpt-4-turbo",
      name: "GPT-4 Turbo Latest 2024-04-09",
      class: "gpt-4",
      text: '**This is bold text.** *This is italic text.*',
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
  ]);
  const [user, setUser] = useState<{
    uid: string;
    email: string | null;
    displayName: string | null;
    token: string
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
    const handleAuthStateChange = async (user: any) => {
      if (user) {
        try {
          // Get the user's ID token asynchronously
          const token: string = await user.getIdToken();

          // Set the user state with the user's information and token
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            token: token,
          });
        } catch (error) {
          console.error('Error getting user token:', error);
          setUser({
            uid: user.uid,
            email: user.email,
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
      })

      let playgroundData = null;
      if(result.data) {
        playgroundData = result.data.data;
      }

      if (playgroundData) {
        setContextData(playgroundData);
      }
    }

    handleData();
  }, [user])

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
