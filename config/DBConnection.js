const { Client } = require("pg");

const connectDB = async () => {
  try {
    await new Client({
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    });
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.log("Error connecting", err);
  }
};
module.exports = { connectDB };
