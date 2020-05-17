const express = require("express");
const { Customer, validate } = require("../models/customer");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort({ name: 1 });
  res.send(customers);
});

router.post("/", async (req, res) => {
  try {
    const customer = await validate(req.body);
    const result = await customer.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await validate(req.body);
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!customer)
      return res.status(404).send("No customer found with the given ID.");
    res.send(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
      return res.status(404).send("No customer found with the given ID.");
    res.send(customer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
