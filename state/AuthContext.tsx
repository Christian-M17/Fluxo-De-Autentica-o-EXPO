import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useEffect } from "react";

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    logIn: () => void;
    logOut: () => void;
   
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    isReady: false,
    logIn: () => {},
    logOut: () => {},
   
});

const authkey = 'authState';


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isReady, setIsReady] = React.useState(false);

    async function  storeAuthState(newState: {isLoggedIn: boolean}) {
        try {
             await AsyncStorage.setItem(authkey, JSON.stringify(newState));
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    const router = useRouter();

    const logIn = () => {
        setIsLoggedIn(true);
        storeAuthState({isLoggedIn: true});
        router.replace('/');
    };
    const logOut = () => {
        setIsLoggedIn(false);
        storeAuthState({isLoggedIn: false});
        router.replace('/login');
    };

useEffect(() => {
  async function getStoredAuthState() {
    try {
      const storedState = await AsyncStorage.getItem(authkey);
      if (storedState) {
        setIsLoggedIn(JSON.parse(storedState).isLoggedIn);
      }
    } catch (error) {
      console.error('Error fetching auth state:', error);
    } finally {
      setIsReady(true);
    }
  }

  getStoredAuthState();
}, []);


    return (
        <AuthContext.Provider value={{ isLoggedIn, isReady, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return React.useContext(AuthContext);}