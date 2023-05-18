const { response } = require("express");
const ENV_CONFIG = require("../config/env.config");
const getDAOS = require("../models/daos/index.dao");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateToken } = require("../utils/session.utils");

const { usersDAO } = getDAOS();

class SessionController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await usersDAO.getUserByEmail(email);
      if (!user || user.password !== password) {
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, "wrong email or password");
      }
      const access_token = generateToken(user);
      response.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
        maxAge: 60 * 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      const response = {
        success: true,
        message: "User logged in successfully",
      };
      return res.jspn(response);
    } catch (error) {
      next(error);
    }
  }

  static async loginGithub(req, res, next) {
    const user = req.user;
    const access_token = generateToken(user);
    res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
      maxAge: 60 * 60 * 60 * 24 * 1000,
      httpOnly: true,
    });
    const response = {
      success: true,
      user,
    };
    return res.json(response);
  }

  static async currentSession(req, res, next) {
    const response = {
      success: true,
      user: req.user,
    };
    return res.json(response);
  }
}

module.exports = SessionController;
