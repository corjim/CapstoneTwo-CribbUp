const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { ensureLoggedIn, ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const router = express.Router();

// // Middleware to verify user token
// function authenticateToken(req, res, next) {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ error: "Access denied" });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).json({ error: "Invalid token" });
//     }
// }

// Add property to favorites
router.post("/add", ensureLoggedIn, async (req, res, next) => {
    try {
        const user = await User.get(req.params.username);
        if (!user.favorites.includes(req.body.propertyId)) {
            user.favorites.push(req.body.propertyId);
            await user.save();
        }
        res.json({ message: "Property added to favorites", favorites: user.favorites });
    } catch (err) {
        return next(err);
    }
});

// Remove property from favorites
router.post("/remove", ensureLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.favorites = user.favorites.filter(id => id !== req.body.propertyId);
        await user.save();
        res.json({ message: "Property removed from favorites", favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get user favorites
router.get("/", ensureLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
