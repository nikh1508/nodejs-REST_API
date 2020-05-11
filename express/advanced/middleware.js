function log(req, res, next) {
  console.log("Logging");
  console.log(req.body);
  next();
}

module.exports.logger = log;
