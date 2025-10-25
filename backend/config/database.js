// config/database.js
const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Kết nối MongoDB thành công");
  } catch (error) {
    console.error("❌ Lỗi kết nối MongoDB:", error);
  }
};

// Xuất cả hàm connect và instance mongoose ra để tái sử dụng
module.exports = { connect, mongoose };
