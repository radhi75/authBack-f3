const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.Register = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const found = await user.findOne({ email });
    if (found) {
      res.status(400).send({ errors: [{ mag: " user already exists" }] });
    } else {
      const users = new user(req.body);
      const salt = 10;
      const hashpass = bcrypt.hashSync(pass, salt);
      users.pass = hashpass;
      const payload = { id: users._id };
      const token = jwt.sign(payload, "hello");
      await users.save();
      res.status(200).send({ msg: "user added", users, token });
    }
  } catch (error) {
    res.status(500).send("couldn't add user");
  }
};
exports.Login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const match = await user.findOne({ email });
    if (!match) {
      res.status(400).send({ errors: [{ msg: "user not found" }] });
    }
    const verif = await bcrypt.compare(pass, match.pass);
    if (!verif) {
      res.status(400).send({ errors: [{ msg: "wrong password" }] });
    } else {
      const payload = { id: match._id };
      const token = jwt.sign(payload, "hello");
      res.status(200).send({ msg: "logging", match, token });
    }
  } catch (error) {
    res.status(500).send("couldn't logging");
  }
};
