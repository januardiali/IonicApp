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

type User = {
  email: string;
};

const authContext = createContext<{
  user: null | User;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  user: null,
  loading: false,
  setUser: () => null,
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
type PropsProvideAuth = {
  children: ReactNode;
};
export const ProvideAuth: React.FC<PropsProvideAuth> = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  //   const signin = (email, password) => {
  //     return firebase
  //       .auth()
  //       .signInWithEmailAndPassword(email, password)
  //       .then(response => {
  //         setUser(response.user);
  //         return response.user;
  //       });
  //   };

  //   const signup = (email, password) => {
  //     return firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(response => {
  //         setUser(response.user);
  //         return response.user;
  //       });
  //   };

  //   const signout = () => {
  //     return firebase
  //       .auth()
  //       .signOut()
  //       .then(() => {
  //         setUser(false);
  //       });
  //   };

  //   const sendPasswordResetEmail = email => {
  //     return firebase
  //       .auth()
  //       .sendPasswordResetEmail(email)
  //       .then(() => {
  //         return true;
  //       });
  //   };

  //   const confirmPasswordReset = (code, password) => {
  //     return firebase
  //       .auth()
  //       .confirmPasswordReset(code, password)
  //       .then(() => {
  //         return true;
  //       });
  //   };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    async function getStorage() {
      const storage = await Storage.get({ key: "user" });
      const storageInitial = storage.value ? JSON.parse(storage.value) : null;
      if (storageInitial === null) {
        Storage.set({ key: "user", value: JSON.stringify(user) });
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      } else {
        // dispatch({
        //   type: AppActionTypes.SET_INITIAL,
        //   payload: storageInitial,
        // });
        setUser(storageInitial);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }
    getStorage();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    loading,
    setUser,
    // signin,
    // signup,
    // signout,
    // sendPasswordResetEmail,
    // confirmPasswordReset
  };
}
