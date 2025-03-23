import React, { useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import CribbUp from "../../Api/CribbupApi";
import { AuthContext } from "../../Context/AuthContext";
//import "./Auth.css"

function LoginForm() {
    const INITIAL_STATE = { username: "", password: "" }
    const [formData, setFormData] = useState(INITIAL_STATE);

    // Access login function and loading state from AuthContext
    const { login, loading } = useContext(AuthContext);

    const navigate = useNavigate();

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            console.log("Logging in with the following:", formData)

            const data = await CribbUp.authenticateUser(formData.username, formData.password);

            //const data = await login(formData.username, formData.password);

            console.log("My token!!", data);

            //CribbUp.token = data;

            //console.log("THIS IS LOGIN DATA", data)

            localStorage.setItem("token", data)

            const l = localStorage.getItem("token")
            console.log("TOKEN FROM LOCAL STORAGE IN LOG IN", l)

            //console.log("THIS IS THE TOKEN", data)

            // log the user in using the login function from context
            //login(data.token);

            //login(data)

            navigate("/search");

        } catch (err) {

            console.error("Login Failed ", err)
        }
    };

    // If loading is true, display a loading message
    if (loading) {

        return <Spinner animation="border" className="d-block mx-auto mt-3" />;
    }

    return (
        <div className="FormDiv">
            <form onSubmit={handleSubmit} className="AuthxForm">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input name="username" id="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input name="password" id="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>

                <button>Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
