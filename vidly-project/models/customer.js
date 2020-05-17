const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (n) => Number.isInteger(parseInt(n)),
      message: "Not a valid phone number.",
    },
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

function validateRequest(body) {
  const schema = {
    name: Joi.string().required().min(2).max(50),
    phone: Joi.string().min(5).max(15).required(),
    isGold: Joi.boolean(),
  };

  var result = Joi.validate(body, schema);
  if (result.error) return Promise.reject(result.error);
  const customer = new Customer(body);
  return new Promise((resolve, reject) => {
    customer.validate((err) => {
      if (err) reject(err);
      resolve(customer);
    });
  });
}

exports.Customer = Customer;
exports.validate = validateRequest;
