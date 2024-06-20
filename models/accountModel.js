const mongoose = require('mongoose');

// Định nghĩa schema cho đối tượng User
const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true },
}, {
    collection: "Account"
});

// Tạo model User từ schema
const Account = mongoose.model('Account', accountSchema);

// Xuất model để có thể sử dụng ở nơi khác trong ứng dụng
module.exports = Account;