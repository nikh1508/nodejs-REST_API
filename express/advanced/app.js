const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const middleware = require("./middleware");
const config = require("config");
const startup_debug = require("debug")("app:startup");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();
// const PORT = process.env.PORT || 3000;
const PORT = config.get("port");
//MIDDLEWARE
//Built-in
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));
app.use("/api/courses", courses.router);
app.use("/", home);
//Custom Middleware
const { logger } = middleware;
app.use(logger);

//3rd Party
app.use(helmet());
app.use(cors());
if (app.get("env") == "development") {
  // process.env.NODE_ENV
  startup_debug("started in developement environment");
  app.use(morgan("tiny"));
}

app.set("views", "./views");
app.set("view engine", "ejs");

/// Read cofig demo
startup_debug("app-name: " + config.get("name"));
startup_debug("some default setting: " + config.get("some_default_setting"));
startup_debug("port: " + config.get("port"));
startup_debug("email-server: " + config.get("mail.host"));
startup_debug("email-password: " + config.get("mail.password"));

app.listen(PORT, () => startup_debug(`Listening on port ${PORT}...`));
