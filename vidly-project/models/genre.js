const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    lowercase: true,
    // unique: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateRequest(body) {
  const schema = {
    name: Joi.string().required().min(4).max(20),
  };
  return Joi.validate(body, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateRequest;
