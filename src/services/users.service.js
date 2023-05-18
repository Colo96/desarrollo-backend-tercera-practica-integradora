const getDAOS = require("../models/daos/index.dao");
const { HttpError, HTTP_STATUS } = require("../utils/api.utils");
const { generateUserErrorInfo } = require("./errors/info.error");

const { usersDAO } = getDAOS();

class UsersService {
  async generateUsers(total) {
    if (!total || isNaN(total)) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const generatedUsers = await usersDAO.generateUsers(total);
    if (!Array.isArray(generatedUsers) || !generatedUsers.length) {
      throw new HttpError("Users array is not valid", HTTP_STATUS.BAD_REQUEST);
    }
    return generatedUsers;
  }

  async getUsers() {
    const users = await usersDAO.getUsers();
    return users;
  }

  async getUserById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const user = await usersDAO.getUserById(id);
    if (!user) {
      throw new HttpError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }

  async createUser(payload) {
    const { first_name, last_name, email, role } = payload;
    if (!first_name || !last_name || !email) {
      throw new HttpError("Missing fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (
      typeof user.first_name !== "string" ||
      typeof user.last_name !== "string" ||
      typeof user.email !== "string"
    ) {
      throw new HttpError(
        generateUserErrorInfo(payload),
        HTTP_STATUS.BAD_REQUEST
      );
    }
    const newUserPayload = {
      first_name,
      last_name,
      email,
      role,
      orders: [],
    };
    const newUser = await usersDAO.createUser(newUserPayload);
    return newUser;
  }

  async updateUserById(id, payload) {
    const { first_name, last_name, email } = payload;
    if (!first_name || !last_name || !email) {
      throw new HttpError("Missing fields", HTTP_STATUS.BAD_REQUEST);
    }
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const updatedUser = usersDAO.updateUserById(id, payload);
    return updatedUser;
  }

  async deleteUserById(id) {
    if (!id) {
      throw new HttpError("Missing param", HTTP_STATUS.BAD_REQUEST);
    }
    const deletedUser = usersDAO.deleteUserById(id);
    return deletedUser;
  }
}

module.exports = UsersService;
