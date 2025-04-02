// "use strict";

// /** Shared config for application; can be required many places. */

// require("dotenv").config();
// require("colors");

// const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
// //const DATABASE_URL = process.env.DATABASE_URL || "cribbUp_db"
// const PORT = 5000;

// // Use dev database, testing database, or via env var, production database
// // function getDatabaseUri() {
// //   return (process.env.NODE_ENV === "test")
// //     ? "postgresql:///cribbUp_test"
// //     : process.env.DATABASE_URL || "postgresql:///jobly";
// // }

// let DB_URI;

// if (process.env.NODE_ENV === "test") {
//   DB_URI = "CribbUp_test";
// } else {
//   DB_URI = "cribbUp_db"
// }

// const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

// console.log("CribbUp Config:".green);
// console.log("SECRET_KEY:".yellow, SECRET_KEY);
// console.log("PORT:".yellow, PORT.toString());
// console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
// console.log("Database:".yellow, DB_URI);
// console.log("---");

// module.exports = {
//   SECRET_KEY,
//   PORT,
//   BCRYPT_WORK_FACTOR,
//   DB_URI// getDatabaseUri,
// };




"use strict";

/** Shared config for application; can be required many places. */
require("dotenv").config();
require("colors");

const { Pool } = require("pg");

const SECRET_KEY = process.env.SECRET_KEY || "somekey";
const DATABASE_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 5000;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

// Use different databases based on environment
const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgres://morji:ma@localhost:5432/CribbUp_test"
    : DATABASE_URL;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: DB_URI,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

console.log("CribbUp Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("Database URI:".yellow, DB_URI);
console.log("BCRYPT_WORK_FACTOR:".yellow, process.env.NODE_ENV === "test" ? 1 : 12);
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR: process.env.NODE_ENV === "test" ? 1 : 12,
  DB_URI,
  pool,
};
