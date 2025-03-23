import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
        }
    }, [token]);

    async function login(email, password) {
        const res = await axios.post("http://localhost:5000/auth/login", { email, password });
        setToken(res.data.token);
    }

    async function signup(username, email, password) {
        const res = await axios.post("http://localhost:5000/auth/signup", { username, email, password });
        setToken(res.data.token);
    }

    function logout() {
        setToken(null);
    }

    return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
