const express = require("express");
const { check } = require("express-validator");
const { registerUser, loginUser, getUser } = require("../controllers/auth.js");
const { validateErrors } = require("../middleware/validation.js");
const { auth } = require("../middleware/auth.js");

const router = express.Router();
router
  .route("/")
  .get(auth, getUser)
  .post(
    [
      check("displayName", "displayName is required!").exists(),
      check("email", "correct formatted email is required!")
        .normalizeEmail()
        .isEmail(),
      check("password", "password is required!").exists(),
      validateErrors,
    ],
    registerUser
  );
router
  .route("/login")
  .post(
    [
      check("email", "correct formatted email is required!")
        .normalizeEmail()
        .isEmail(),
      check("password", "password is required!").exists(),
      validateErrors,
    ],
    loginUser
  );


module.exports = router;
