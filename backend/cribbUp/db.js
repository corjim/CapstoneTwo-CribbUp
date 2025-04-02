"use strict";
/** Database setup for CribbUp. */

const { Client } = require("pg");
const { DB_URI } = require("./config");

const db = new Client({
    connectionString: DB_URI,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

db.connect()
    .then(() => console.log("Database Connected Successfully!".green))
    .catch(err => console.error("Database Connection Error:".red, err));

module.exports = db;


// use strict";
// /** Database setup for CribbUp. */
// const { Client } = require("pg");
// const { pool, DB_URI } = require("./config");

// let db = new Client({
//     host: "/var/run/postgresql",
//     database: DB_URI
// });

// db.connect();
// module.exports = db;