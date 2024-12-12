const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/db'); // Import the sequelize configuration
const authRoutes = require('./../email_marketing_be/src/Routes/user');
const Buissnuess = require('./../email_marketing_be/src/Routes/stepper');
const Adduser = require('./../email_marketing_be/src/Routes/AddUser');
const emailRoutes = require('./../email_marketing_be/src/Routes/email');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/user',Buissnuess);
app.use('/api/user',Adduser);
app.use('/api/user',emailRoutes);
// const syncModels = async () => {
//   try {
//     await sequelize.sync(); // Sync all defined models to the DB
//     console.log('Sequelize models synchronized successfully.');
//   } catch (error) {
//     console.error('Error synchronizing Sequelize models:', error);
//   }
// };

// syncModels();

app.listen(5000, () => console.log('Server running on port 5000'));
