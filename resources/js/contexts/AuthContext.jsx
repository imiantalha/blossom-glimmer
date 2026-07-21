import { createContext, useState, useEffect } from "react";
import authService from "../services/auth.service";
import token from "../utils/token";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    /**
     * Login user
     *
     * @param {Object} credentials
     * @returns {Object}
     */
    const login = async (credentials) => {
        setLoading(true);

        try {
            const response = await authService.login(credentials);

            const { user, access_token } = response.data;

            token.set(access_token);

            setUser(user);

            return response;
        } finally {
            setLoading(false);
        }
    };

    const checkAuth = async () => {
        const accessToken = token.get();

        if (!accessToken) {
            return;
        }

        setLoading(true);

        try {
            const response = await authService.me();

            setUser(response.data);
        } catch (error) {
            token.remove();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const isAuthenticated = !!user;

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        checkAuth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};