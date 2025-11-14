const userAccount = require("../../models/user.model")

module.exports.index = async (req, res) => {
    // console.log("đã vào được userAccount controller")
    let final = { deleted: false };

    try {
        const data = await userAccount.find(final);
        res.json({ data });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
}


