// routes/organizationRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Models/stepper/user');

router.post('/user-data', async (req, res) => {
  console.log(req.body, "body----------------->");
  try {
    const {
      userFirstName, userLastName, userEmail, userPhone, origination,...customFields 
    } = req.body;


    const user = await User.create({
      userFirstName,
      userLastName,
      userEmail,
      userPhone,
      origination,
    //   organizationId: organization.id,
      ...customFields // Spreading custom fields here
    });
    res.status(201).json({ message: 'User Data saved successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

router.get('/user-details', async (req, res) => {
  try {
    const organizations = await User.findAll();
    
    res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ message: 'Failed to fetch organizations' });
  }
});


module.exports = router;
