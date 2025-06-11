
const { sendBookingEmail, sendBookingEmailToBusiness } = require('../services/emailService');

exports.bookingEmail = async (req, res) => {
    try {
      const { email, name, scheduledTime } = req.body;
  
      if (!email || !name || !scheduledTime) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: to, subject, text',
        });
      }
  
      const info = await sendBookingEmail(email, name, scheduledTime);
      await sendBookingEmailToBusiness(email, name, scheduledTime);
  
      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        info,
      });
    } catch (error) {
      console.error('Error in sendEmailHandler:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };