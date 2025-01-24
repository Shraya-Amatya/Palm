const db = require('../db');

const verifyResetToken = async (req, res, next) => {
  const { userId, token } = req.body;

  try {
    const userToken = await db.get_password_reset_token(userId);

    if (!userToken || userToken.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reset Password link is invalid!',
      });
    }

    const currDateTime = new Date();
    const expiresAt = new Date(userToken[0].expires_at);

    if (currDateTime > expiresAt || userToken[0].token !== token) {
      return res.status(400).json({
        success: false,
        message: 'Reset Password link is invalid!',
      });
    }

    // Attach userId to request for further processing
    req.userId = userId;
    next(); // Proceed to password reset handler
  } catch (err) {
    console.error('Error verifying reset token:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = verifyResetToken;
