const express = require("express");
const courses = require("./courses");
const api_debug = require("debug")("app:api");

const router = express.Router();

router.get("/", (req, res) => {
  api_debug("new request at home");
  res.render("index", {
    name: "John Connor",
    courses: courses.courses,
  });
});

module.exports = router;
