const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const Account = require('../models/accountModel');


// get all account
router.get('/api/accounts', async(req, res) => {
    try {
        const account = await Account.find();
        if (account.length > 0) {
            res.json(account);
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

// login
router.post('/api/login', async(req, res) => {
    // Lấy thông tin từ body của request
    const { username, password } = req.body;
    try {
        // Tìm tài khoản trong cơ sở dữ liệu dựa trên username
        const account = await Account.findOne({ username });
        // Kiểm tra xem tài khoan có tồn tại không
        if (!account) {
            return res.status(401).json({ message: 'User invalid' });
        }
        // So sánh mật khẩu nhập vào với mật khẩu lưu trong cơ sở dữ liệu
        const isPasswordValid = await password === account.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        // Nếu mọi thứ hợp lệ, tạo JSON Web Token (JWT)
        const token = jwt.sign({ username: account.username, role: account.role }, 'ntt-secret-key', { expiresIn: '1h' });
        res.json({
            token
        });
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;