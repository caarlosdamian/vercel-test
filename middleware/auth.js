const jwt = require("jsonwebtoken");
const config = require("config");
const { errorResponse } = require("../utility/utils.js");

 function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return errorResponse(res, "No access token, authorization denied!", 401);
  try {
    const secret = config.get("Auth.secret");
    const decoded = jwt.verify(token, secret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid token!", 401);
  }
}

module.exports = {auth};