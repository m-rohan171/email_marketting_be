// models/Origination.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/db');

const Origination = sequelize.define('OriginationSource', {
  OrganizationSource: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Origination;

