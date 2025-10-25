
const searchHelper = require("../../helpers/search");

const Product = require("../../models/product.model")

//[GET] /api/admin/products
module.exports.index = async (req, res) => {

    let final = {
        deleted: false,
    }
    if (req.query.status) {
        final.status = req.query.status;
    }


    const objSearch = searchHelper(req.query);
    if (objSearch.regex) {
        final.name = objSearch.regex;
    }
    if (req.query.category) {
        final.category = req.query.category;
    }




    try {
        const data = await Product.find(final);
        // console.log({data})
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
}


//[GET] /api/admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        const result = await Product.updateOne({ _id: id }, { status: status });
        console.log(result)
        res.json({
            success: true,
            message: `Đã cập nhật sản phẩm ${id} sang trạng thái ${status}`,
            result,
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        res.status(500).json({ success: false, message: "Cập nhật thất bại" });
    }
}
