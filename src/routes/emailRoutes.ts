import { Router } from 'express';
import { sendEmailHandler } from '../controllers/emailController';

const router = Router();

//router.post('/send-email', sendEmailHandler);
router.post('/send-email', (req, res) => {
  sendEmailHandler(req, res);
});

export default router;