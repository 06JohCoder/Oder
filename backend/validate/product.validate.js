module.exports.create = (req, res,next) => {
    if (!req.body.name) {
        return res.status(400).json({ message: "Tên sản phẩm là bắt buộc" })
    }
    if (!req.body.price) {
        return res.status(400).json({ message: "Giá sản phẩm là bắt buộc" })
    }
    if (!req.body.stock) {
        res.status(400).json({ message: "Số lượng sản phẩm là bắt buộc" })
    }
    next();

}