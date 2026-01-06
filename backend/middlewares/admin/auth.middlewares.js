const Account = require('../../models/account.model');

module.exports.requireAuth = async (req, res, next) => {
  try {
    // 1. Lấy token từ cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Chưa đăng nhập"
      });
    } else {
      // 2. Tìm user theo token
      const user = await Account.findOne({
        token: token,
        deleted: false
      });
        if (!user) {
          return res.status(401).json({
            message: "Không không hợp lệ"
          });
        }

      next();
    }



    // 3. Kiểm tra trạng thái tài khoản
    // if (user.status === "inActive") {
    //   return res.status(403).json({
    //     message: "Tài khoản đã bị khóa"
    //   });
    // }

    // 4. Gắn user vào request (nếu cần dùng sau này)
    // req.user = user;

    // 5. Cho đi tiếp


  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({
      message: "Lỗi xác thực"
    });
  }
};
