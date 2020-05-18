const express = require("express");
const { Rental, validateRequest } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");

Fawn.init(mongoose);
const router = express.Router();

router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const error = validateRequest(req.body);
  if (error) return res.status(400).send(error.message);
  const _movie = await Movie.findById(req.body.movieID);
  const _customer = await Customer.findById(req.body.customerID);
  if (!_movie || !_customer) {
    return res
      .status(404)
      .send(
        "Couldn't find any " +
          (!_movie ? "movie" : "customer") +
          " with the given id."
      );
  }
  if (_movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock");
  const rental = new Rental({
    customer: {
      _id: _customer._id,
      name: _customer.name,
      isGold: _customer.isGold,
      phone: _customer.phone,
    },
    movie: {
      _id: _movie._id,
      title: _movie.title,
      dailyRentalRate: _movie.dailyRentalRate,
    },
  });
  //   _movie.numberInStock--;
  //   await _movie.save();
  //   await rental.save();
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update("movies", { _id: _movie._id }, { $inc: { numberInStock: -1 } })
      .run();
  } catch (err) {
    return res.status(500).send("Something failed during transaction.");
  }
  res.send(rental);
});

module.exports = router;
