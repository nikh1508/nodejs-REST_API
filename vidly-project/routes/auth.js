const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const error = validateRequest(req.body);
  if (error) return res.status(400).send("Invalid login credentials.");
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid login credentials.");
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) return res.status(400).send("Invalid login credentials.");
  res.send(true);
});

function validateRequest(body) {
  const { error } = Joi.validate(body, {
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return error;
}
module.exports = router;
