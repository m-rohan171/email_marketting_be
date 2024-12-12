// src/Models/index.js
const sequelize = require('../db/db'); // Ensure the path is correct
const User = require('./users'); // Ensure this path is correct

// Initialize the User model
User.init(sequelize);

// Sync models with the database (optional, only if needed)
const syncModels = async () => {
  try {
    await sequelize.sync(); // Synchronizes the models with the database
    console.log('Models synchronized with the database.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

syncModels();

module.exports = { userModel: User }; // Export the initialized model
