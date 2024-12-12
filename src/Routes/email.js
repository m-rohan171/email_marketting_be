// const express = require('express');
// const router = express.Router();
// const sgMail = require('@sendgrid/mail');
// const EmailLog = require('../Models/email'); // Adjust the path
// require('dotenv').config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Use environment variable for security

// router.post('/send-email', async (req, res) => {
//   const { recipients, subject, body, imageURL } = req.body;

//   try {
//     // Prepare messages for each recipient
//     const messages = recipients.map(email => {
//       const emailContent = imageURL
//         ? {
//             to: email,
//             from: 'touqeersaddique@gmail.com', // Verified sender email
//             subject,
//             html: `<div>
//                      <p>${body || null}</p>
//                      <img src="${imageURL}" alt="Email Image" style="max-width:100%;height:auto;"/>
//                    </div>`,
//           }
//         : {
//             to: email,
//             from: 'touqeersaddique@gmail.com',
//             subject,
//             text: body || null,
//           };

//       return emailContent;
//     });

//     // Send emails using SendGrid
//     const response = await sgMail.send(messages);

//     // Log each email sent
//     await Promise.all(
//       recipients.map(email =>
//         EmailLog.create({
//           recipientEmail: email,
//           subject,
//           body:null,
//           imageURL,
//           status: 'sent',
//         })
//       )
//     );

//     res.status(200).json({ message: 'Emails sent successfully', response });
//   } catch (error) {
//     console.error('Error sending email:', error);

//     // Log failed emails with error message
//     await Promise.all(
//       recipients.map(email =>
//         EmailLog.create({
//           recipientEmail: email,
//           subject,
//           body:null,
//           imageURL,
//           status: 'failed',
//           errorMessage: error.message,
//         })
//       )
//     );

//     res.status(500).json({ message: 'Failed to send emails', error: error.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const sgMail = require('@sendgrid/mail');
// const EmailLog = require('../Models/email'); // Adjust the path
// require('dotenv').config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// router.post('/send-email', async (req, res) => {
//   const { recipients, subject, body, image } = req.body; // 'image' is now base64 from frontend

//   try {
//     // Prepare messages for each recipient
//     const messages = recipients.map(email => ({
//       to: email,
//       from: 'touqeersaddique@gmail.com', // Verified sender email
//       subject,
//       html: `
//         <div>
//           ${body || ''}
//           ${image ? `<img src="${image}" alt="Email Image" style="max-width:100%;height:auto;"/>` : ''}
//         </div>
//       `,
//     }));

//     // Send emails using SendGrid
//     await sgMail.send(messages);

//     // Log each email sent
//     await Promise.all(
//       recipients.map(email =>
//         EmailLog.create({
//           recipientEmail: email,
//           subject,
//           body,
//           imageBase64: image, // Save base64 image
//           status: 'sent',
//         })
//       )
//     );

//     res.status(200).json({ message: 'Emails sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);

//     // Log failed emails with error message
//     await Promise.all(
//       recipients.map(email =>
//         EmailLog.create({
//           recipientEmail: email,
//           subject,
//           body,
//           imageBase64: image, 
//           status: 'failed',
//           errorMessage: error.message,
//         })
//       )
//     );

//     res.status(500).json({ message: 'Failed to send emails', error: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const multer = require('multer');
const sgMail = require('@sendgrid/mail');
const EmailLog = require('../Models/email');
const Papa = require('papaparse'); // For parsing CSV
const fs = require('fs');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/send-email', upload.single('csvFile'), async (req, res) => {
  const { recipients, subject, body, image } = req.body;
  const csvFile = req.file; // Access uploaded CSV file

  try {
    let csvEmails = [];
    if (csvFile) {
      // Parse the CSV file
      const csvData = fs.readFileSync(csvFile.path, 'utf8');
      const parsedData = Papa.parse(csvData, {
        header: false,
        skipEmptyLines: true,
      });

      // Extract valid email addresses
      csvEmails = parsedData.data
        .flat()
        .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

      // Clean up the uploaded file
      fs.unlinkSync(csvFile.path);
    }

    // Combine all recipient emails
    const recipientList = [
      ...(recipients ? recipients.split(',').map((email) => email.trim()) : []),
      ...csvEmails,
    ];

    if (recipientList.length === 0) {
      return res.status(400).json({ message: 'No valid email addresses provided.' });
    }

    // Prepare messages for each recipient
    const messages = recipientList.map((email) => ({
      to: email,
      from: 'touqeersaddique@gmail.com', // Verified sender email
      subject,
      html: `
        <div>
          ${body || ''}
          ${image ? `<img src="${image}" alt="Email Image" style="max-width:100%;height:auto;"/>` : ''}
        </div>
      `,
    }));

    // Send emails using SendGrid
    await sgMail.send(messages);

    // Log each email sent
    await Promise.all(
      recipientList.map((email) =>
        EmailLog.create({
          recipientEmail: email,
          subject,
          body,
          imageBase64: image,
          status: 'sent',
        })
      )
    );

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);

    // Log failed emails with error message
    // await Promise.all(
    //   recipientList.map((email) =>
    //     EmailLog.create({
    //       recipientEmail: email,
    //       subject,
    //       body,
    //       imageBase64: image,
    //       status: 'failed',
    //       errorMessage: error.message,
    //     })
    //   )
    // );

    res.status(500).json({ message: 'Failed to send emails', error: error.message });
  }
});

module.exports = router;
