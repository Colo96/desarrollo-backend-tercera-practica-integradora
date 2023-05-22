const ENV_CONFIG = require("../config/env.config");
const getSERVICES = require("../services/index.service");
const { HTTP_STATUS, HttpError } = require("../utils/api.utils");
const { generateToken } = require("../utils/session.utils");

const { usersService } = getSERVICES();
const { SESSION_KEY } = ENV_CONFIG;

class SessionController {
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await usersService.getUserByEmail(email);
      if (!user || user.password !== password) {
        throw new HttpError(HTTP_STATUS.BAD_REQUEST, "Wrong email or password");
      }
      const access_token = generateToken(user);
      res.cookie(SESSION_KEY, access_token, {
        maxAge: 60 * 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      const response = {
        success: true,
        message: "User logued in successfully!",
        user,
      };
      return res.status(HTTP_STATUS.OK).json(response);
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
    return res.status(HTTP_STATUS.OK).json(response);
  }

  static async currentSession(req, res, next) {
    try {
      const response = {
        success: true,
        user: req.user,
      };
      return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = SessionController;
