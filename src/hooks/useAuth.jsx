// Custom hook for authentication
import { useState, useEffect } from 'react';
import { onAuthChange, loginUser, signUpUser, logoutUser } from '../firebase/auth';

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Listen to authentication state changes
        const unsubscribe = onAuthChange((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return unsubscribe;
    }, []);

    const signup = async (email, password) => {
        try {
            const result = await signUpUser(email, password);
            return result;
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const result = await loginUser(email, password);
            return result;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            throw error;
        }
    };

    return {
        currentUser,
        loading,
        signup,
        login,
        logout
    };
};
