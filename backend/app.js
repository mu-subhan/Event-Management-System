const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: ["https://eshop-tutorial-pyri.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./controller/user");
const event = require("./controller/event");
const role = require("./controller/role");
const roleSuggest = require("./routes/roleSuggestion");
const { isAuthenticated, isAdmin } = require("./middleware/auth");
const { createEvent } = require("./controller/testEvent");
// User
app.use("/api/user", user);
// Event
app.use("/api/event", event);
// Event Roles
app.use("/api/role", role);
// Event Roles
app.use("/api/role-suggest", roleSuggest);

app.post("/create-event", (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const event = createEvent({ title, startTime, endTime });
    return res.status(200).send({ success: false, event });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
