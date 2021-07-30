const { getAllUsers } = require('../repositories/users-repository');
const path = require('path');

const usersPath = path.join(__dirname, '..', 'db', 'users.json');

const isUniqueUser = async email => {
  try {
    const allUsers = await getAllUsers(usersPath);
    const isUnique = allUsers.find(user => user.email === email);

    return !isUnique;
  } catch (error) {
    console.log('Error in isUniqueUser: ', error.message);
  }
};

module.exports = isUniqueUser;
