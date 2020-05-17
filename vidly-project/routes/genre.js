const express = require("express");
const debug = require("debug")("app:debug");
const { Genre, validate } = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({
    name: req.body.name,
  });
  const result = await genre.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: req.body.name },
      },
      { new: true }
    );
    if (!genre) return res.status(404).send("Cannot find genre by given ID");
    res.send(genre);
  } catch (err) {
    res.status(400).send(`Error occured. ${err}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    var genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send("Cannot find genre by given ID");
    res.send(genre);
  } catch (err) {
    res.status(400).send(`Error occured. ${err}`);
  }
});
module.exports = router;
