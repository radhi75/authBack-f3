const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.isAuth = async (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, "hello");
    if (!decode) {
      res.status(400).send("you are not auth");
    }
    const users = await user.findById(decode.id);
    req.user = users;

    next();
  } catch (error) {
    console.log(error);
  }
};
