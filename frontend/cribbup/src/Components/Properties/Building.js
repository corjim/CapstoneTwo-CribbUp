import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom"; // Get zpid from URL and retrieve carousel photos
import CribbUp from "../../Api/CribbupApi";
import { Container, Spinner } from "react-bootstrap";
import BuildingCard from "./BuildingCard"; // Import new component

function BuildingDetails() {
    const location = useLocation();
    const { zpid } = useParams();
    const carouselPhotos = location.state?.carouselPhotos || [];

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBuilding() {
            if (!zpid) {
                setError("No property ID found.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const data = await CribbUp.propertiesDetails(zpid);
                console.log("Fetched Property Details:", data);

                if (!data || Object.keys(data).length === 0) {
                    throw new Error("No details available for this property.");
                }

                setProperty(data.building || data);
            } catch (err) {
                console.error("Error fetching property details:", err);
                setError("Failed to fetch property details.");
            } finally {
                setLoading(false);
            }
        }

        fetchBuilding();
    }, [zpid]);

    return (
        <Container className="mt-4">
            <h1 className="text-center">Property Details</h1>

            {/* Loading Indicator */}
            {loading && <Spinner animation="border" className="d-block mx-auto mt-3" />}

            {/* Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Property Card */}
            {!loading && property && (
                <BuildingCard property={property} carouselPhotos={carouselPhotos} />
            )}

            {/* No Data Message */}
            {!loading && !property && !error && (
                <p className="text-center text-muted mt-4">No property details available.</p>
            )}
        </Container>
    );
}

export default BuildingDetails;
