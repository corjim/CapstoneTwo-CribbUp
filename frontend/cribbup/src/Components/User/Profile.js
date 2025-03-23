import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import CribbUpApi from "../../Api/CribbupApi";
import { Card, Button, Container, Form, Spinner } from "react-bootstrap";

function Profile() {
    const { user, setUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    // Load user data when component mounts
    useEffect(() => {
        async function fetchUser() {
            if (!user) {
                try {
                    const token = localStorage.getItem("token"); // Get token from storage
                    if (token) {
                        const fetchedUser = await CribbUpApi.getUser(); // Fetch user from API
                        setUser(fetchedUser);
                        setFormData(fetchedUser);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            } else {
                setFormData(user);
            }
            setLoading(false);
        }
        fetchUser();
    }, [user, setUser]);

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({ ...f, [name]: value }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const updatedUser = await CribbUpApi.editProfile(formData, user.username);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            console.error("Profile update failed:", error);
        }
    }

    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

    if (!user) {
        return <h2 className="text-center text-danger">No user found. Please log in.</h2>;
    }

    return (
        <Container className="mt-4">
            <h1 className="text-center">Profile Page</h1>
            <Card className="shadow p-4">
                {!isEditing ? (
                    <>
                        <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                        <Card.Text>
                            <strong>Username:</strong> {user.username} <br />
                            <strong>Email:</strong> {user.email}
                        </Card.Text>
                        <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    </>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name="firstName" value={formData.firstName || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name="lastName" value={formData.lastName || ''} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                        </Form.Group>
                        <Button type="submit" variant="success" className="mt-3">Save</Button>
                    </Form>
                )}
            </Card>
        </Container>
    );
}

export default Profile;
