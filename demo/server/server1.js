const nodemailer = require('nodemailer');
const express = require("express");
var mysql = require('mysql');
var cors = require('cors')
let app = express()
app.use(express.json())
app.use(cors())

// Create a transporter with your email service provider's SMTP configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ragulpriyanjoy@gmail.com',
    pass: 'vzbenfwmmhmkenog'
  }
});

// Function to send the email
const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: 'ragulpriyanjoy@gmail.com',
    to: email,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
  
};
const generateVerificationCode = () => {
    return Math.floor(Math.random() * 1000);
  };


sendEmail('rregins498@gmail.com', 'Test Email', `Your verification code is: ${generateVerificationCode()}`);
app.post('/sendEmail', (req, res) => {
  const email = req.body.email;
  const subject = req.body.subject;
  const otp = generateVerificationCode().toString();
  const text = 'Your verification code is: ' + otp;

  if (!email) {
    res.status(400).json({ error: 'No recipient email provided' });
  } else {
    sendEmail(email, subject, text); // Call the sendEmail function
    res.status(200).json({ message: 'Email sent successfully', otp });
  }
});
app.listen(3004, () => {
  console.log('Server listening on port 3004');
});