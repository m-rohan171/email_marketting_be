// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../db/db'); // Adjust path based on your setup

// // const EmailLog = sequelize.define('EmailLog', {
// //   recipientEmail: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   subject: {
// //     type: DataTypes.STRING,
// //     allowNull: false,
// //   },
// //   body: {
// //     type: DataTypes.TEXT,
// //     allowNull: true, // Make it optional as emails might contain only an image
// //   },
// //   imageURL: {
// //     type: DataTypes.STRING,
// //     allowNull: true, // Optional field for image-based emails
// //   },
// //   status: {
// //     type: DataTypes.ENUM('sent', 'failed'),
// //     allowNull: false,
// //   },
// //   errorMessage: {
// //     type: DataTypes.TEXT,
// //     allowNull: true,
// //   },
// // });

// // module.exports = EmailLog;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/db'); // Adjust path based on your setup

// const EmailLog = sequelize.define('EmailLog', {
//   recipientEmail: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   subject: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   body: {
//     type: DataTypes.TEXT,
//     allowNull: true, // Optional for cases with only images
//   },
//   imageBase64: {
//     type: DataTypes.TEXT, // Store base64 encoded image data
//     allowNull: true,
//   },
//   status: {
//     type: DataTypes.ENUM('sent', 'failed'),
//     allowNull: false,
//   },
//   errorMessage: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// });

// module.exports = EmailLog;


const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db'); // Adjust to your connection file

const EmailLog = sequelize.define('EmailLog', {
  recipientEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  imageBase64: {
    type: DataTypes.TEXT, // Optional if you plan to store the base64 string of the image
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('sent', 'failed'),
    allowNull: false,
  },
  errorMessage: {
    type: DataTypes.TEXT, // To store any error message if sending fails
    allowNull: true,
  },
}, {
  tableName: 'email_logs',
  timestamps: true,
});

module.exports = EmailLog;
