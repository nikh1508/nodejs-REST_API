const express = require("express");
const { User, validate } = require("../models/user");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find().sort({ name: 1 });
  res.send(users);
});

router.post("/", async (req, res) => {
  try {
    const error = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const user = new User(req.body);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"]));
  } catch (err) {
    res.status(400).send(`Error occured. ${err}`);
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const error = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     var user = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     if (!user) return res.status(404).send("Cannot find user by given ID");
//     res.send(user);
//   } catch (err) {
//     res.status(400).send(`Error occured. ${err}`);
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    var user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send("Cannot find user by given ID");
    res.send(user);
  } catch (err) {
    res.status(400).send(`Error occured. ${err}`);
  }
});

module.exports = router;
