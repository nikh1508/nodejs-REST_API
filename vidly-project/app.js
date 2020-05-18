const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const debug = require("debug")("app:debug");
const config = require("config");
const Joi = require("joi");
Joi.ObjectID = require("joi-objectid")(Joi);
const genre = require("./routes/genre");
const customer = require("./routes/customer");
const movie = require("./routes/movie");
const rental = require("./routes/rental");

const app = express();

app.use(express.json());

app.use(helmet());
app.use(cors());
if (app.get("env") == "development") app.use(morgan("tiny"));

app.use("/api/genre", genre);
app.use("/api/customer", customer);
app.use("/api/movie", movie);
app.use("/api/rental", rental);

mongoose
  .connect(config.get("DB_URL"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    debug("Connected to database. Starting API server now.");
    app.listen(config.get("PORT"), () =>
      debug(`API server started. Listening on port ${config.get("PORT")}...`)
    );
  })
  .catch((err) => {
    debug("Couldn't connect to database. Error: ", err.message);
  });
