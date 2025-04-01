"use strict";

/** Shared config for application; can be required many places. */
require("dotenv").config();
require("colors");

const SECRET_KEY = process.env.SECRET_KEY || "somekey";
const DATABASE_URL = process.env.DATABASE_URL;

const PORT = 5000;
const { Pool } = require("pg");

console.log("THIS IS DATABASE URL", DATABASE_URL)

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Required for Supabase
  },
});


console.log("Database Connected:".green, DATABASE_URL);


// let DB_URI;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = "CribbUp_test";
// } else {
//   DB_URI = DATABASE_URL
// }

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("CribbUp Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
//console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  pool,
  //DB_URI// getDatabaseUri,
};
