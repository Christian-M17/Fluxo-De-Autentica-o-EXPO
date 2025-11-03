import { useRouter } from "expo-router";
import React, { createContext } from "react";

type AuthState = {
    isLoggedIn: boolean;
    logIn: () => void;
    logOut: () => void;
}

export const AuthContext = createContext<AuthState>({
    isLoggedIn: false,
    logIn: () => {},
    logOut: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    const router = useRouter();

    const logIn = () => {
        setIsLoggedIn(true);
        router.replace('/');
    };
    const logOut = () => {
        setIsLoggedIn(false);
        router.replace('/login');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    return React.useContext(AuthContext);}