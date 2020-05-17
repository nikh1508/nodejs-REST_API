const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost/playground";
// mongoose
//   .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to database"))
//   .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  category: {
    type: String,
    enum: ["web", "tablet", "mobile"],
    lowercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "Tags should have atleast one value",
    },
  },
  date: {
    type: Date,
    validate: {
      //   isAsync: true,
      validator: (date) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const now = Date.now();
            const diff_in_days = (now - date) / (24 * 3600 * 1000);
            if (diff_in_days < 0 || diff_in_days > 15) resolve(false);
            resolve(true);
          }, 2500);
        });
      },
      message: "date should be within 15 days in the past.",
    },
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const newCourse = new Course({
    name: "Java Course",
    author: "The Author",
    category: "-",
    date: "05/12/2020",
    tags: [],
    isPublished: true,
    price: 120,
  });
  //   try {
  //     const result = await newCourse.save();
  //     console.log(result);
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  newCourse.validate(async function (err) {
    if (err) {
      for (error in err.errors) console.log(err.errors[error]);
    } else {
      const result = await newCourse.save();
      console.log(result);
    }
  });
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

async function main() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database.");
  } catch (err) {
    console.log("Unable to connect to database.");
    return;
  }
  await createCourse();
}

main();
