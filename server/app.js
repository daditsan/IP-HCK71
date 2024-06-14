if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const router = require("./routers");

const cors = require("cors");

app.use(cors());
app.get("/home", (req, res) => {
  res.send("Hello World");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

module.exports = app;
