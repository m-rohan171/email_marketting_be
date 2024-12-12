const { DataTypes } = require('sequelize');
const sequelize = require('../../db/db'); 

const Organization = sequelize.define('BuisnessDetails', {
  businessName: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  origination: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Organization;

// Organization.hasMany(User, { foreignKey: 'organizationId' });
// Organization.hasMany(OrganizationSource, { foreignKey: 'organizationId' });