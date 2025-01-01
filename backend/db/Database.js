const { Client } = require("pg");
const client = new Client({
  host: "localhost",
  database: "event_management",
  client: "",
  port: 5432,
  user: process.env.user,
  password: process.env.password,
});
const connecttoDB = () => {
  client.connect(function (err) {
    if (err) {
      console.log("erro is: ", err);
      //   throw err;
    } else console.log("Connected to DB!");
  });
};
module.exports = connecttoDB;
