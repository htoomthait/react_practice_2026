import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            setAccessToken(token);
        }
    }, []);

    const login = (token, refreshToken, userId) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userId", userId);
        setAccessToken(token);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);