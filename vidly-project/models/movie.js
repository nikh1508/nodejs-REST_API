const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");
const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      min: 0,
      max: 100,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 10,
      max: 65,
    },
  })
);

function validateRequest(body) {
  const schema = {
    title: Joi.string().required().min(4).max(50),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(10).max(65).required(),
  };
  const { error } = Joi.validate(body, schema);
  return error;
}

exports.Movie = Movie;
exports.validateRequest = validateRequest;
