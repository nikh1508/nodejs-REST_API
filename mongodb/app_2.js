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

// Updation of Documents :

// 1. Query First
// async function updateDocument(id) {
//   const course = await Course.findById(id);
//   if (!course) return console.log("No such document found.");
//   course.isPublished = true;
//   course.author = "Another Author";
//   const result = await course.save();
//   console.log("Updated document.\n", result);
// }

// 2. Update First
async function updateDocument(id) {
  // const result = await Course.update(
  //   { _id: id },
  //   { $set: { author: "Third Person", isPublished: false } }
  // );
  // console.log(result);
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "Mosh", isPublished: true },
    },
    { new: true }
  );
  console.log(course);
}

// Delete Documents

async function deleteDocument(id) {
  // const result = await Course.deleteOne({ _id: id });
  // console.log(result);
  const course = await Course.findByIdAndDelete(id);
  console.log(course);
}

// updateDocument("5eb960c15f07d30ed9f9c66e");
deleteDocument("5eb9871f5effa107dae8dc08");
