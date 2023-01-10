const express = require("express");
const { Register, Login } = require("../controlles/user");
const { isAuth } = require("../middlewear/isAuth");
const {
  registervalidation,
  validation,
  loginvalidation,
} = require("../middlewear/validator");

const userRoute = express.Router();

userRoute.post("/register", registervalidation, validation, Register);
userRoute.post("/login", loginvalidation, validation, Login);
userRoute.get("/current", isAuth, (req, res) => {
  res.send({ users: req.user });
});
module.exports = userRoute;
