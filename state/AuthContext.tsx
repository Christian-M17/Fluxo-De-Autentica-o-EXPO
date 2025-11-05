import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { createContext, useEffect } from "react";

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  user: string;
  logIn: (username: string) => void;
  logOut: () => void;

}

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  user: '',
  logIn: () => { },
  logOut: () => { },

});

const authkey = 'authState';


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);
  const [user, setUser] = React.useState('');

  async function storeAuthState(newState: { isLoggedIn: boolean; user: string }) {
    try {
      await AsyncStorage.setItem(authkey, JSON.stringify(newState));
    } catch (error) {
      console.error('Erro:', error);
    }
  }

  const router = useRouter();

  const logIn = (username: string) => {
    setIsLoggedIn(true);
    setUser(username);
    storeAuthState({ isLoggedIn: true, user: username });
    router.replace('/');
  };
  const logOut = () => {
    setIsLoggedIn(false);
    storeAuthState({ isLoggedIn: false, user: '' });
    router.replace('/login');
  };

  useEffect(() => {
    async function getStoredAuthState() {
      try {
        const storedState = await AsyncStorage.getItem(authkey);
        if (storedState) {
          const parsed = JSON.parse(storedState);
          setIsLoggedIn(parsed.isLoggedIn);
          setUser(parsed.user || '');
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
    <AuthContext.Provider value={{ isLoggedIn, isReady, user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(AuthContext);
}