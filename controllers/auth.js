const { errorResponse, successResponse } = require("../utility/utils.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
  isEmailRegistered,
  insertUser,
  getUserByEmail,
  getUserById,
} = require("../sqlite/db.js");

const secret = config.get("Auth.secret");
const tokeExp = config.get("Auth.tokenExp");

const registerUser = async (req, res) => {
  const { displayName, email } = req.body;
  try {
    const isRegistered = await isEmailRegistered(email);
    if (isRegistered) return errorResponse(res, "email already registered!");

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const id = await insertUser(displayName, email, password);

    const payload = {
      user: {
        id,
      },
    };

    jwt.sign(
      payload,
      secret,
      {
        expiresIn: tokeExp,
      },
      (error, token) => {
        if (error) throw error;
        return successResponse(res, { token }, 201);
      }
    );
  } catch (error) {
    return errorResponse(res, error);
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          secret,
          {
            expiresIn: tokeExp,
          },
          (error, token) => {
            if (error) throw error;
            return successResponse(res, { token }, 200);
          }
        );
      }
    } else {
      return errorResponse(res, "invalid credentials!");
    }
  } catch (error) {
    return errorResponse(res, error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    const { displayName, email } = user;
    if (user) {
      return successResponse(res, { displayName, email }, 200);
    }
    return errorResponse(res, "user not found!", 404);
  } catch (error) {
    return errorResponse(res, error);
  }
};

module.exports = {
  getUser,
  loginUser,
  registerUser,
};
