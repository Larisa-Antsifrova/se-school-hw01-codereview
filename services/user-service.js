const path = require('path');
const User = require('../repositories/users-repository');
const PasswordService = require('./password-service');
const TokenService = require('./jwt-token-service');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');

class UserService {
  constructor(model) {
    this.model = model;
  }

  async isUserUnique(email) {
    try {
      const allUsers = await this.model.getAllUsers(usersPath);
      const isUnique = allUsers.find(user => user.email === email);

      return !isUnique;
    } catch (error) {
      console.log('Error in isUserUnique: ', error.message);
    }
  }

  async isUserValid({ email, password }) {
    try {
      const user = await this.model.getUserByEmail(email);

      if (!user) {
        return false;
      }

      const isPasswordCorrect = await PasswordService.comparePassword(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        return false;
      }

      return true;
    } catch (error) {
      console.log('Error in isUserValid: ', error.message);
    }
  }

  async createUser({ name, email, password }) {
    try {
      const hashedPassword = await PasswordService.hashPassword(password);

      return await this.model.addNewUser({
        name,
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.log('Error in createUser: ', error.message);
    }
  }

  async loginUser(userEmail) {
    try {
      const { id, name, email } = await this.model.getUserByEmail(userEmail);

      const token = TokenService.generateToken({ id, name, email });

      return { id, name, email, token };
    } catch (error) {
      console.log('Error in loginUser: ', error.message);
    }
  }
}

module.exports = new UserService(User);
