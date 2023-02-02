const { validationResult } = require("express-validator");
const { errorResponse } = require("../utility/utils.js");

 function validateErrors(req, res, next) {
  const validationErrors = validationResult(req);
  console.log(validationErrors);

  if (!validationErrors.isEmpty()) {
    return errorResponse(res, validationErrors.errors);
  }
  next();
}


module.exports = {
  validateErrors
}