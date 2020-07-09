import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;
// import * as firebase from "firebase/app";
// import "firebase/auth";

// Add your Firebase credentials
// firebase.initializeApp({
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   appID: "",
// });

const appContext = createContext<{
  hasSeenTutorial: boolean;
  loading: boolean;
  setHasSeenTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  hasSeenTutorial: false,
  loading: false,
  setHasSeenTutorial: () => false,
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
type PropsProvideApp = {
  children: ReactNode;
};
export const ProvideApp: React.FC<PropsProvideApp> = ({ children }) => {
  const app = useProvideApp();
  return <appContext.Provider value={app}>{children}</appContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useApp = () => {
  return useContext(appContext);
};

// Provider hook that creates auth object and handles state
function useProvideApp() {
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [loading, setLoading] = useState(true);

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    async function getStorage() {
      const storage = await Storage.get({ key: "hasSeenTutorial" });
      const storageInitial = storage.value ? JSON.parse(storage.value) : null;
      if (storageInitial === null) {
        Storage.set({ key: "hasSeenTutorial", value: `${hasSeenTutorial}` });
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        // dispatch({
        //   type: AppActionTypes.SET_INITIAL,
        //   payload: storageInitial,
        // });
        setHasSeenTutorial(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }
    getStorage();
  }, []);

  // Return the user object and auth methods
  return {
    hasSeenTutorial,
    loading,
    setHasSeenTutorial,
    // signin,
    // signup,
    // signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}
