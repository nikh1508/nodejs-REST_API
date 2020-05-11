const express = require("express");
const Joi = require("joi");
const api_debug = require("debug")("app:api");

const router = express.Router();

var courses = [
  { course_id: 1, course_name: "Course1" },
  { course_id: 2, course_name: "Course2" },
  { course_id: 3, course_name: "Course3" },
];

router.get("/", (req, res) => {
  api_debug("new request recvd");
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.course_id === parseInt(req.params.id));
  if (course) res.status(200).send(course);
  else res.status(404).send("Not Found");
});

router.post("/", (req, res) => {
  // Input Validation using Joi
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const course = {
    course_id: courses.length + 1,
    course_name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((c) => c.course_id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course ID not found.");
  else {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    course.course_name = req.body.name;
    res.send(course);
  }
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.course_id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//Validation Function
function validate(body) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(body, schema);
  return result;
}

module.exports.router = router;
module.exports.courses = courses;
