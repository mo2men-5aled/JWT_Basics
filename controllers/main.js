const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

//import jwt from jsonwebtoken module
const jwt = require("jsonwebtoken");

//login function
const login = async (req, res) => {
  const { username, password } = req.body;

  //validate username and password
  if (!username || !password) {
    throw new CustomAPIError(
      "Please provide a username and password",
      StatusCodes.BAD_REQUEST
    );
  }

  //dummy user id
  const id = new Date().getDate();

  //create token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

//dashboard function
const dashboard = async (req, res) => {
  console.log(req);

  //get luck number
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data,Your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
