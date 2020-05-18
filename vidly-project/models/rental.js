const mongoose = require("mongoose");
const Joi = require("joi");

const Rental = mongoose.model(
  "Rental",
  new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
        isGold: {
          type: Boolean,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
      }),
      required: true,
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
        },
        dailyRentalRate: {
          type: Number,
          required: true,
        },
      }),
      required: true,
    },
    dateOut: {
      type: Date,
      default: Date.now,
    },
    dateIn: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  })
);

function validateRequest(body) {
  const { error } = Joi.validate(body, {
    customerID: Joi.ObjectID().required(),
    movieID: Joi.ObjectID().required(),
  });
  return error;
}

module.exports.Rental = Rental;
module.exports.validateRequest = validateRequest;
