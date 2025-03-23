const express = require("express");
const axios = require("axios");
const router = express.Router();
const { ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const { fetchZillowData } = require("../helpers/zillowAuthHeader");

const { getZillowDataFromFile, getBuildingInfoFromFile } = require("../helpers/zillowJson");

// Fetch properties based on city or ZIP code with pagination
router.get("/search", async (req, res, next) => {
    let { location, page = 1, limit = 12 } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Missing parameter! Please add a location." });
    }

    try {
        // Convert page and limit to integers
        page = parseInt(page);
        limit = parseInt(limit);

        const data = await fetchZillowData("propertyExtendedSearch", {
            location: location,
            status_type: "ForSale",
            home_type: "Houses,Townhomes",
            page: page
        });

        //console.log("DATA", data)

        if (!data || !data.props || data.props.length === 0) {
            return res.status(404).json({ error: "No properties found!" });
        }

        const totalResults = data.totalResultCount || data.props.length;
        const totalPages = Math.ceil(totalResults / limit);

        // Paginate results
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProperties = data.props.slice(startIndex, endIndex);

        res.status(200).json({

            totalResults: totalResults,
            totalPages: totalPages,
            properties: paginatedProperties,
            currentPage: page,
            resultsPerPage: limit
        })

        //console.log("THIS THE RETURN JSON:", paginatedProperties)
        //return res_json;

    } catch (error) {
        console.error("Error fetching properties:", error.message);
        res.status(500).json({ error: "Failed to fetch properties from Zillow API." });
    }
});

// // Routes to fetch and display details of a building.
router.get("/property", async (req, res) => {

    //console.log("THIS FETCH", fetchZillowData())
    let { zpid } = req.query;
    console.log("HELLO FROM THE BUILDING SIDE", req.query); // ✅ Debugging incoming request

    if (!zpid) {
        return res.status(400).json({ error: "Building missing zpid" });
    }

    try {
        const buildingData = await fetchZillowData("property", { zpid: zpid });

        console.log("THIS IS ZPID:", zpid); //  Debugging `zpid`
        console.log("Zillow API Responseeeee:", buildingData); // Ensure correct response format

        // Fix: Check if API returned an empty object instead of an array
        if (!buildingData || Object.keys(buildingData).length === 0) {
            return res.status(404).json({ error: "No building found" });
        }

        res.status(200).json({ building: buildingData });
    } catch (err) {
        console.error("Error getting building", err.message || err);
        res.status(500).json({ error: "Failed to fetch building from Zillow API." });
    }
});

// router.get("/property", async (req, res) => {
//     let { lotId } = req.query; // Add lotId for testing
//     console.log("HELLO FROM THE BUILDING SIDE", req.query); //  Debugging incoming request

//     if (!lotId) {
//         return res.status(400).json({ error: "Building missing lotId" });
//     }

//     try {
//         const params = { lotId };
//         if (lotId) params.lotId = lotId; // Only add lotId if it exists

//         const buildingData = await fetchZillowData("property", params);

//         console.log("THIS IS lotId:", lotId);
//         console.log("Zillow API Response:", buildingData); //  Debug full response

//         // Check if response is an error
//         if (buildingData?.status === "error") {
//             return res.status(400).json({ error: buildingData.errors || "Invalid request" });
//         }

//         res.status(200).json({ building: buildingData });
//     } catch (err) {
//         console.error("Error getting building", err.message || err);
//         res.status(500).json({ error: "Failed to fetch building from Zillow API." });
//     }
// });


// Get details of a particular building based on `lotId`
router.get("/buildingJson", async (req, res) => {
    try {
        const building = await getBuildingInfoFromFile();

        if (!building) {
            return res.status(500).json({ error: "No building found for this ID" });
        };

        res.status(200).json(building);

    } catch (error) {
        console.error("Error fetching building data:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Fetch property data from a saved JSON file (for offline testing)
router.get("/jsonhouses", async (req, res) => {
    try {
        const properties = await getZillowDataFromFile();
        if (!properties) {
            return res.status(500).json({ error: "Failed to load property data" });
        }

        res.status(200).json({ properties });

    } catch (error) {
        console.error("Error fetching Zillow data:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
