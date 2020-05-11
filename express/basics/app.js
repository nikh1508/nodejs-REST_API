const express = require("express");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

var courses = [
  { course_id: 1, course_name: "Course1" },
  { course_id: 2, course_name: "Course2" },
  { course_id: 3, course_name: "Course3" },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!!</h1>");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.course_id === parseInt(req.params.id));
  if (course) res.status(200).send(course);
  else res.status(404).send("Not Found");
});

app.get("/api/posts/:year/:month", (req, res) => {
  // res.send(`Month : ${req.parmas.month} \n Year : ${req.params.year}`);
  // res.send(
  //   `Month : ${req.params.month} \n Year : ${req.params.year} ${req.query}`
  // );
  res.send(req.query);
});

/// Create new course
app.post("/api/courses", (req, res) => {
  // if (!req.body) {
  //   res.status(400).send("No body found");
  // }

  // Input validation
  // if (!req.body.name || req.body.name < 3) {
  //   res
  //     .status(400)
  //     .send("Name is required and should be minimum 3 characters.");
  // }

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

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.course_id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course ID not found.");
  else {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    course.course_name = req.body.name;
    res.send(course);
  }
});

app.delete("/api/courses/:id", (req, res) => {
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

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
