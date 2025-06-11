
const express = require('express');
const router = express.Router();

const emailController = require('../controllers/emailControllers')
router.route('/').get((req, res)=> res.json({ ping:'pong' }));

router.route('/send-email').post(emailController.bookingEmail);


module.exports = router;