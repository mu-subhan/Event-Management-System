const dotenv = require("dotenv");
const express = require("express");
const app = express();

// .env Configuration
dotenv.config();

// custom import
const connecttoDB = require("./db/Database");
const port = 3001;

// connection with db
connecttoDB();

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
