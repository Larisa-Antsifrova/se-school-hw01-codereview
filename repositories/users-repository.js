const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');

class User {
  constructor(path) {
    this.usersPath = path;
  }

  async getAllUsers() {
    try {
      return JSON.parse(await fs.readFile(this.usersPath, 'utf-8'));
    } catch (error) {
      console.log('Error in getAllUsers: ', error.message);
    }
  }

  async getUserByEmail(email) {
    try {
      return (await this.getAllUsers()).find(user => user.email === email);
    } catch (error) {
      console.log('Error in getUserByEmail: ', error.message);
    }
  }

  async addNewUser({ name, email, password }) {
    try {
      const id = uuidv4();

      const newUser = {
        id,
        name,
        email,
        password,
      };

      const allUsers = await this.getAllUsers();
      allUsers.push(newUser);

      await fs.writeFile(this.usersPath, JSON.stringify(allUsers, null, 2));

      return { id, name, email };
    } catch (error) {
      console.log('Error in addNewUser: ', error.message);
    }
  }
}

module.exports = new User(usersPath);
