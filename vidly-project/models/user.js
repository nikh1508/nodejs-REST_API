const mongoose = require("mongoose");
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 2,
      max: 255,
    },
    email: {
      type: String,
      unique: true,
      minlength: 4,
      maxlength: 255,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 1024,
      required: true,
    },
  })
);

function validateRequest(body) {
  const { error } = Joi.validate(body, {
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string()
      .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      .required(),
    password: Joi.string().min(8).max(1024).required(),
  });
  return error;
}

exports.User = User;
exports.validate = validateRequest;
