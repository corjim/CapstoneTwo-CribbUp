import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

function PrivateRoute() {
    const authContext = useContext(AuthContext); // ✅ Ensure context is available

    if (!authContext) {
        console.error("AuthContext is undefined in PrivateRoute.js!");
        return <Navigate to="/login" replace />;
    }

    const { currentUser, loading } = authContext;

    if (loading) return null; // ✅ Wait for auth state to load

    return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
