"use strict";
/** Database setup for CribbUp. */
const { Client } = require("pg");
const { DB_URI } = require("./config");

let db = new Client({
  host: "/var/run/postgresql",
  database: DB_URI
});

db.connect();
module.exports = db;
