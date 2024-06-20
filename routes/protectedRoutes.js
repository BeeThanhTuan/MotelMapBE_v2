const express = require('express');
const verifyToken = require('../middleware/verifyToken'); // Đường dẫn đến file verifyToken.js
const router = express.Router();

// Route bảo vệ yêu cầu đòi hỏi xác nhận token
router.get('/api/protected', verifyToken, (req, res) => {
  res.send('This is a protected route. Token is valid.');
});

module.exports = router;