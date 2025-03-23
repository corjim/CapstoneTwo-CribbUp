import './App.css';
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Context/AuthContext";
import PrivateRoute from "./Components/Context/PrivateRoute";
import NavBar from "./Components/Navbar/NavBar";
import HomePage from './Components/HomePage/HomePage';
import Login from "./Components/AuthContext/LoginForm";
import SignupForm from './Components/AuthContext/signUpForm';
import SearchPage from "./Components/Properties/SearchPage";
import BuildingDetails from './Components/Properties/Building';
import Profile from "./Components/User/Profile";


function App() {
  // const { currentUser, loading } = useContext(AuthContext); // Get token and loading state from context

  // // If loading is true, render ...loading
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  /**
   * Returns routes dependent on whether the user is logged in or not by token existence
   */

  return (
    <AuthProvider> {/* ✅ Ensure AuthProvider wraps the entire app */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/property/:zpid" element={<BuildingDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* For wild route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;