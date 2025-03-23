import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ Fix import
import CribbUp from "../../Api/CribbupApi";

const AuthContext = createContext(); // ✅ Correct export

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // ✅ Prevent memory leaks

        async function fetchUser() {
            if (!token) {
                setCurrentUser(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const decodedToken = jwtDecode(token); // ✅ Ensure token is valid

                console.log("Decoded token:", decodedToken);

                const userData = await CribbUp.getUser(decodedToken.username); // ✅ Fix: Use username
                if (isMounted) {
                    setCurrentUser(userData);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                logout();
            }
        }

        fetchUser();

        return () => {
            isMounted = false; // ✅ Cleanup function to prevent updates after unmount
        };
    }, [token]);

    function login(newToken) {
        console.log("Login successful, token received:", newToken);
        localStorage.setItem("token", newToken);
        setToken(newToken);
        navigate("/search");
    }

    function signup(userData) {
        CribbUp.signup(userData)
            .then((newToken) => {
                console.log("Signup successful, token set:", newToken);
                setToken(newToken);
                localStorage.setItem("token", newToken);
                navigate("/profile");
            })
            .catch((error) => {
                console.error("Signup failed:", error);
            });
    }

    function logout() {
        console.log("Logging out...");
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser, token, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider }; // ✅ Correct export
