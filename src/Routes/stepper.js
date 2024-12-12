// routes/organizationRoutes.js
const express = require('express');
const router = express.Router();
const Organization = require('../Models/stepper/organization');
const User = require('../Models/stepper/user');
const OrganizationSource = require('../Models/stepper/organizationSource');

router.post('/save-buissnuess-data', async (req, res) => {
  console.log(req.body, "body----------------->");
  try {
    const {
       businessName, firstName, lastName, email, phone ,origination
      // userDetails: { userFirstName, userLastName, userEmail, userPhone,organizationId, ...customFields },
      // originationDetails: { origination }
    } = req.body;

    // Step 1: Save Business Details
    const organization = await Organization.create({
      businessName,
      firstName,
      lastName,
      email,
      phone,
      origination
    });

    // // Step 3: Save Origination Details
    // const originationRecord = await OrganizationSource.create({
    //     OrganizationSource: origination,
    //   organizationId: organization.id
    // });

    res.status(201).json({ message: 'Buissnuess Data saved successfully', organization });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data' });
  }
});

router.get('/buisnuess-details', async (req, res) => {
  try {
    // Fetch all records
    const organizations = await Organization.findAll();
    
    res.status(200).json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ message: 'Failed to fetch organizations' });
  }
});


module.exports = router;
