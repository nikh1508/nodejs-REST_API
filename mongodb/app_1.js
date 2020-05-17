const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/playground";
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

/* Possible Data-Types:
 *   String
 *   Numbers
 *   Date
 *   Buffer
 *   Boolean
 *   ObjectID
 *   Array
 */
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const newCourse = new Course({
    name: "Angular Course",
    author: "The Author",
    tags: ["angular", "client-side"],
    isPublished: true,
  });
  const result = await newCourse.save();
  console.log(result);
}

// Basic Query
async function getCourse() {
  //   const courses = await Course.find({ author: "The Author" });

  const courses = await Course.find({ author: "The Author", isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(courses);
}

// Query Operators
/*
 * Query Operators :
 *   eq (equal to)
 *   ne (not equal to)
 *   gt (greater than)
 *   gte (greater than or equal)
 *   lt  (less than)
 *   lte (less than or equal)
 *   in
 *   nin (not in)
 *
 * Sample Queries :
 *  Course
 *  .find({price: {$gte: 10}}) OR
 *  .find({price: {$gte:10, $lte:20}}) OR
 *  .find({price: {$in: [10, 15, 25]}})
 */

// Logical Operators :
/*
 *  and
 *  or
 *  Sample Queries:
 *  Course.find()
 *  .and([{q1}, {q2}]) OR
 *  .or([{author: 'Author'}, {isPublished: true}])
 */

// Regular Expressions :
/* 
    /pattern/
    * Starts with Mosh:
    Course.find({author: /^Mosh/})
    *Ends with Carter:
    Course.find({author: /Carter$/})
    *String with Mosh anywhere in between and case-insensitive (add an 'i' at the end of pattern):
    Course.find({author: /.*Mosh*./i})
*/

// Get Count of course mathing a query:
async function getCount() {
  const num = await Course.find({ author: /.*author*./i }).countDocuments();
  console.log("Num of courses matching the query: ", num);
}

//Pagination
async function getPage(pageNumber, pageSize) {
  const courses = await Course.find({ author: "The Author" })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  console.log(courses);
}

// createCourse();
// getCourse();
// getCount();
getPage(2, 1);
