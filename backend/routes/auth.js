const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  verifyToken,
  logout
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/verify-token', protect, verifyToken);
router.get('/logout', protect, logout);

module.exports = router;
