// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const { Client } = pkg;

// const db = new Client({
//   user: process.env.PG_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

// db.connect()
//   .then(() => console.log("PostgreSQL Connected 🚀"))
//   .catch(err => console.error(err));


import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// No need for db.connect() with Pool, it manages connections automatically
db.on("connect", () => {
  console.log("PostgreSQL Connected 🚀");
});
// ) library, this line sets up an event listener that triggers every time 
// a new database client connection is successfully established and added to the connection pool.

export default db;