// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/db');

const User = sequelize.define('UserDetails', {
  userFirstName: { type: DataTypes.STRING, allowNull: false },
  userLastName: { type: DataTypes.STRING, allowNull: false },
  userEmail: { type: DataTypes.STRING, allowNull: false},
  userPhone: { type: DataTypes.STRING },
  customField_1: { type: DataTypes.STRING },
  origination: { type: DataTypes.STRING, allowNull: false },
});

module.exports = User;

// User.belongsTo(Organization, { foreignKey: 'organizationId' });
