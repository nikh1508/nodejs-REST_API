const express = require("express");
const Joi = require("joi");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

var genres = ["action", "drama", "sci-fi"];

function validate(body) {
  const schema = {
    genre: Joi.string().min(3).required(),
  };
  return Joi.validate(body, schema);
}

//  Routes

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.post("/api/genres", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genres.push(req.body.genre);
  res.send(genres);
});

app.put("/api/genres", (req, res) => {
  if (!req.query.old)
    return res.status(400).send("'old' query parameter required");
  const index = genres.indexOf(req.query.old);
  if (index == -1)
    return res.status(404).send(`'${req.query.old}' genre not found.`);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genres.splice(index, 1, req.body.genre);
  res.send(genres);
});

app.delete("/api/genres", (req, res) => {
  if (!req.query.genre)
    return res.status(400).send("'genre' query parameter required");
  const index = genres.indexOf(req.query.genre);
  if (index == -1)
    return res.status(404).send(`'${req.query.genre}' genre not found.`);
  genres.splice(index, 1);
  res.send(genres);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
