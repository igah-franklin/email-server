// import nodemailer from 'nodemailer';

// interface EmailConfig {
//   service: string;
//   host: string;
//   port: number;
//   secure: boolean;
//   auth: {
//     user: string;
//     pass: string;
//   };
// }

// const emailConfig: EmailConfig = {
//   service: process.env.EMAIL_SERVICE || 'gmail',
//   host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//   port: parseInt(process.env.EMAIL_PORT || '587'),
//   secure: process.env.EMAIL_SECURE === 'true',
//   auth: {
//     user: process.env.EMAIL_USER || '',
//     pass: process.env.EMAIL_PASSWORD || '',
//   },
// };

// export const transporter = nodemailer.createTransport(emailConfig);

// export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
//   try {
//     const mailOptions = {
//       from: `"Your App Name" <${emailConfig.auth.user}>`,
//       to,
//       subject,
//       text,
//       html: html || text,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log('Message sent: %s', info.messageId);
//     return info;
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error;
//   }
// };


interface IBookingEmail {
  customerEmail: string;
  subject: string;
  message: string;
}

import nodemailer from 'nodemailer';
const SITE_EMAIL=process.env.SITE_EMAIL
const SITE_EMAIL_PASSWORD=process.env.SITE_EMAIL_PASSWORD
console.log(SITE_EMAIL, 'SITE_EMAIL');
console.log(SITE_EMAIL_PASSWORD, 'SITE_EMAIL_PASSWORD');
// Create a transporter
let transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: SITE_EMAIL,
    pass: SITE_EMAIL_PASSWORD
  },
});

// Verification link function
export function sendBookingEmail({ customerEmail, subject, message }: IBookingEmail) {
  console.log(customerEmail, 'customerEmail');
  // Email options
  const mailOptions = {
    from: `"Resume Link Support Team" <${SITE_EMAIL}>`,
    to: customerEmail,
    subject: subject,
    html: `<p>${message}</p>`
  };
  

  // Send email
  return new Promise((resolve, reject)=>{
    transporter.verify((error, success) => {
      if (error) {
        console.error('Transporter error:', error);
      } else {
        console.log('Transporter is ready to send emails');
      }
    });

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        //console.log(error);
        return reject({ message: `An error has occurred` });
      }
      console.log('Email sent: ' + info.response);
      resolve(info.response);
    });
  })
}