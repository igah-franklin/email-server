import { Request, Response } from 'express';
import { sendBookingEmail } from '../config/email';
import { bookingEmailSchema } from '../validations/emailValidation';

interface EmailRequest {
  from: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmailHandler = async (req: Request, res: Response) => {
  try {

    console.log(process.env.SITE_EMAIL, 'site email');

    const { error } = bookingEmailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    
    const { from, subject, text }: EmailRequest = req.body;

    if (!from || !subject || !text) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: to, subject, text',
      });
    }

    const info = await sendBookingEmail({ customerEmail: from, subject, message: text });

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