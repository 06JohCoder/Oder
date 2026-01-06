const Product = require("../../models/product.model")

const paginationHelper = require("../../helpers/pagination")

// [GET]: api/admin/backup/products
module.exports.indexProducts = async (req, res) => {
    try {
        const backUpProducts = await Product.countDocuments({ deleted: true });
        let objPagination = paginationHelper(
            {
                pagePage: 1,
                limitItems: 10,
            },
            req.query,
            backUpProducts
        )
        const backUpProductsData = await Product.find({ deleted: true })
            .limit(objPagination.limitItems)
            .skip(objPagination.skip);
        res.json({
            objPagination,
            backUpProductsData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
};
// [PATCH]: api/admin/backup/products/back/:id
module.exports.indexProductsBack = async (req, res) => {
    try {
        const { id, status } = req.params;

        let updateData = {};

        if (status === 'back') {
            updateData.deleted = false;
        } else {
            return res.status(400).json({
                success: false,
                message: "Trạng thái không hợp lệ",
            });
        }

        const result = await Product.updateOne(
            { _id: id },
            updateData
        );

        res.json({
            success: true,
            message: "Cập nhật thành công",
            result,
        });

    } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        res.status(500).json({
            success: false,
            message: "Cập nhật thất bại",
        });
    }
};

//[DELETE]: api/admin/backup/products/delete/:id
module.exports.indexProductsDelete = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Sản phẩm không tồn tại",
            });
        }

        res.json({
            success: true,
            message: "Đã xóa vĩnh viễn sản phẩm",
        });

    } catch (error) {
        console.error("Lỗi khi xóa:", error);
        res.status(500).json({
            success: false,
            message: "Xóa thất bại",
        });
    }
};