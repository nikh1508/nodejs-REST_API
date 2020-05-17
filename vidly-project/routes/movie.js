const express = require("express");
const { Movie, validateRequest } = require("../models/movie");
const { Genre } = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(movies);
});

router.post("/", async (req, res) => {
  const error = validateRequest(req.body);
  if (error) return res.status(400).send(error.message);
  try {
    const _genre = await Genre.findById(req.body.genre);
    if (!_genre)
      return res.status(404).send("Couldn't find any genre with the given id.");
    var { genre, ..._movie } = req.body;
    _movie.genre = { _id: _genre._id, name: _genre.name };
    var movie = new Movie(_movie);
    movie = await movie.save();
    res.send(movie);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.put("/:id", async (req, res) => {
  //   const error = validateRequest(req.body);
  //   if (error) res.status(400).send(error.message);
  /*    Commenting the above code means that the user nedd not send the complete object,
    but rather the key-value pair that is to be updated.    */
  try {
    var { genre, ...update } = req.body;
    if (req.body.genre) {
      const _genre = await Genre.findById(req.body.genre);
      if (!_genre)
        return res
          .status(404)
          .send("Couldn't find any genre with the given id.");
      update.genre = { _id: _genre._id, name: _genre.name };
    }
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );
    if (!movie)
      return res.status(404).send("Couldn't find any movie with the given id.");
    res.send(movie);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie)
      return res.status(404).send("Couldn't find any movie with the given id.");
    res.send(movie);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
