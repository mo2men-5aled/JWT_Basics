const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const { StatusCodes } = require("http-status-codes");

const authenticationMiddleware = async (req, res, next) => {
  //get token from request header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", StatusCodes.UNAUTHORIZED);
  }

  //split token from Bearer
  const token = authHeader.split(" ")[1];

  try {
    //verify token by using jwt.verify method that decodes the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };

    //call next middleware
    //if you don't call next middleware, the request will be stuck
    //and the response will never be sent
    //so, call next middleware to continue the request
    //and send the response
    next();
  } catch (error) {
    throw new CustomAPIError(
      "Not authorized to access this route",
      StatusCodes.UNAUTHORIZED
    );
  }
};

module.exports = authenticationMiddleware;
