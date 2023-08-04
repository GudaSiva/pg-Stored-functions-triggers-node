const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const { connectDB } = require("./config/DBConnection");
//router path
app.use("/api", require("./routes/employee"));

connectDB();
app.listen(() => {
  console.log(`Server running on ${port}`);
});
