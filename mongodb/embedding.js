const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: [authorSchema],
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCoures(id, authorName) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: { "author.name": authorName },
  });
  console.log(course);
}

async function updateSingleAuthor(authorID, newName) {
  const course = await Course.update(
    { "author._id": authorID },
    {
      $set: {
        "author.$.name": newName,
      },
    }
  );
  console.log(course);
}

async function removeSingleAuthor(authorID) {
  const result = await Course.update(
    { "author._id": authorID },
    {
      $pull: { author: { _id: authorID } },
    }
  );
  console.log(result);
}

async function addAuthor(id, authorName) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $push: { author: { name: authorName } },
    },
    { new: true }
  );
  console.log(course);
}

async function removeAuthorProperty(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $unset: { author: 1 },
    },
    { new: true }
  );
  console.log(course);
}

// createCourse("JS Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Wish" }),
//   new Author({ name: "Qwish" }),
// ]);

// listCourses();

// updateCoures("5ec0ffaae47d748e37ba9976", "Will Smith");

// updateSingleAuthor("5ec13d4aed34ec994f54a819", "John");

// removeSingleAuthor("5ec13d4aed34ec994f54a81a");

// addAuthor("5ec13d4aed34ec994f54a81b", "John");

// removeAuthorProperty("5ec13d4aed34ec994f54a81b");
