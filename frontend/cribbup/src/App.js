import './App.css';
import React, { useContext } from "react";
import { Spinner } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./Components/Context/AuthContext";
import PrivateRoute from "./Components/Context/PrivateRoute";
import NavBar from "./Components/Navbar/NavBar";
import Footer from './Components/Footer/Footer';
import HomePage from './Components/HomePage/HomePage';
import Login from "./Components/AuthContext/LoginForm";
import SignupForm from './Components/AuthContext/signUpForm';
import SearchPage from "./Components/Properties/SearchPage";
import BuildingDetails from './Components/Properties/Building';
import FavoritePage from "./Components/Properties/FavoritePage";
import Profile from "./Components/User/Profile";


function App() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-5 pageSpinner" />;
  }

  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/property/:zpid" element={<BuildingDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Wildcard Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </AuthProvider>
  );
}

export default App;

