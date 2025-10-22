const Product = require("../../models/product.model")



//[GET] /api/products

module.exports.index = async (req, res) => {
        try {
            const data = await Product.find({
                status:"active",
                deleted : false
            });
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
        }
    }
