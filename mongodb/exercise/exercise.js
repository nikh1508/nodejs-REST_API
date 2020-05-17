const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost/mongo-exercises";

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Database."))
  .catch(() => console.log("Couldn't connect to Database."));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  date: { type: Date, default: Date.now },
  tags: [String],
});

const Course = mongoose.model("Course", courseSchema);

// Exercise-1
// async function getCourse() {
//   const courses = await Course.find({
//     isPublished: true,
//     tags: "backend",
//   })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });
//   console.log(courses);
//   console.log("Total Found Courses:", courses.length);
// }

// Exercise-2
// async function getCourse() {
//   const courses = await Course.find({ isPublished: true })
//     .or([{ tags: "frontend" }, { tags: "backend" }])
//     .sort({ price: -1 })
//     .select({ name: 1, author: 1 });
//   console.log(courses);
// }

// Exercise-3
async function getCourse() {
  const courses = await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by*./i }])
    .select({ name: 1, price: 1, author: 1 });
  console.log(courses);
}

getCourse();
