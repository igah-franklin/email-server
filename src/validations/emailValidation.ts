import Joi from 'joi';

export const bookingEmailSchema = Joi.object({
  from: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
});