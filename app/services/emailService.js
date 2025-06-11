

const nodemailer = require('nodemailer');
const { customerBookingTemplate } =  require('../emailTemplates/customerBookingTemplate');

const SITE_EMAIL=process.env.SITE_EMAIL
const SITE_EMAIL_PASSWORD=process.env.SITE_EMAIL_PASSWORD
// Create a transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
  auth: {
    user: SITE_EMAIL,
    pass: SITE_EMAIL_PASSWORD
  },
});


function sendBookingEmail(email, name, scheduledTime) {


    const template = customerBookingTemplate(email, name, scheduledTime)
    // Email options
    const mailOptions = {
      from: 'Salonmyculture Support Team" <support@resumelink.site>',
      to: email,
      subject: 'Booking confirmation',
      //html:  `<h2>Hi ${name}, Your session has been booked</h2>`
      html:  template
    };
  
    // Send email
    return new Promise((resolve, reject)=>{
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occurred` });
        }
        console.log('Email sent: ' + info.response);
        resolve(info.response);
      });
    })
}

function sendBookingEmailToBusiness(email, name, scheduledTime) {

    // Email options
    const mailOptions = {
      from: 'help@resumelink.link',
      to: email,
      subject: 'Booking',
      html:  `<h2>Hi ${name}, Has booked an appointment!</h2>`
    };
  
    console.log('sending mail')
  
    // Send email
    return new Promise((resolve, reject)=>{
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occurred` });
        }
        console.log('Email sent: ' + info.response);
        resolve(info.response);
      });
    })
}
  
function adminBookingEmail(email) {
  
    // Email options
    const mailOptions = {
      from: 'Resume Link Support Team" <support@resumelink.site>',
      to: SITE_EMAIL,
      subject: 'User Registration',
      html:  `<h2>Hi ${email}, Just signed up on resumelink</h2>`
    };
  
    console.log('sending mail')
  
    // Send email
    return new Promise((resolve, reject)=>{
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occurred` });
        }
        console.log('Email sent: ' + info.response);
        resolve(info.response);
      });
    })
  }

  module.exports = { sendBookingEmail, sendBookingEmailToBusiness }