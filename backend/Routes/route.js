require("dotenv").config();

const express = require("express");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const router = express.Router();
const verifyResetToken = require('../middleware/auth');
const db = require("../db");
const { sendEmail, mailTemplate } = require("../utils/email");

const NumSaltRounds = Number(process.env.NO_OF_SALT_ROUNDS);

router.post('/forgot', async (req, res) => {
    try {
      const { email } = req.body;
      const user = await db.get_user_by_email(email);
  
      if (!user || user.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'You are not registered!',
        });
      }
  
      const token = crypto.randomBytes(20).toString('hex');
      const resetToken = crypto.createHash('sha256').update(token).digest('hex');
  
      await db.update_forgot_password_token(user[0].id, resetToken);
  
      const mailOption = {
        email: email,
        subject: 'Forgot Password Link',
        message: mailTemplate(
          'We have received a request to reset your password. Please reset your password using the link below.',
          `${process.env.FRONTEND_URL}/resetPassword?id=${user[0].id}&token=${resetToken}`,
          'Reset Password'
        ),
      };
  
      await sendEmail(mailOption);
  
      res.json({
        success: true,
        message: 'A password reset link has been sent to your email.',
      });
    } catch (err) {
      console.error('Error in forgot route:', err);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  });
  

  router.post('/resetPassword', verifyResetToken, async (req, res) => {
    try {
      const { userId } = req;
      const { password } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, NumSaltRounds);
  
      await db.update_user_password(userId, hashedPassword);
  
      await db.update_password_reset_token(userId);
  
      return res.status(200).json({
        success: true,
        message: 'Your password has been successfully reset!',
      });
    } catch (err) {
      console.error('Error resetting password:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  });
module.exports = router;
