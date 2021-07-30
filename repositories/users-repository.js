const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');

const getAllUsers = async usersPath => {
  try {
    return JSON.parse(await fs.readFile(usersPath, 'utf-8'));
  } catch (error) {
    console.log('Error in getAllUsers: ', error.message);
  }
};

const getUserByEmail = async email => {
  try {
    return (await getAllUsers(usersPath)).find(user => user.email === email);
  } catch (error) {
    console.log('Error in getUserByEmail: ', error.message);
  }
};

const addNewUser = async ({ name, email, password }) => {
  try {
    const id = uuidv4();

    const newUser = {
      id,
      name,
      email,
      password,
    };

    const allUsers = await getAllUsers(usersPath);
    allUsers.push(newUser);

    await fs.writeFile(usersPath, JSON.stringify(allUsers, null, 2));

    return { id, name, email };
  } catch (error) {
    console.log('Error in addNewUser: ', error.message);
  }
};

module.exports = { getAllUsers, getUserByEmail, addNewUser };
