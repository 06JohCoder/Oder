
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination")
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




    //Pagination
    const countProducts = await Product.countDocuments(final);
    let objPagination = paginationHelper(
        {
            pagePage: 1,
            limitItems: 10,
        },
        req.query,
        countProducts
    )

    //Endl Pagination

    try {
        const data = await Product.find(final).limit(objPagination.limitItems).skip(objPagination.skip);
        // console.log({data})
        res.json({
            data,
            objPagination
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
}


//[Patch] /api/admin/products/change-status/:status/:id
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




//[Patch] /api/admin/products/change-multi
module.exports.changeMulti = async (req, res) => {


    try {
        const { ids, newStatus } = req.body;

        if (!ids?.length || !newStatus) {
            return res.status(400).json({ message: "Thiếu dữ liệu" });
        }


        switch (newStatus) {
            case "active":
                await Product.updateMany(
                    { _id: { $in: ids } },
                    { $set: { status: "active" } }
                );

                break;

            case "inactive":
                await Product.updateMany(
                    { _id: { $in: ids } },
                    { $set: { status: "inactive" } }
                );

                break;
            case "delete-all":
                 await Product.updateMany(
                    { _id: { $in: ids } },
                    {  
                        deleted: true,
                        deletedAt: new Date(),
                      }
                );
                break
            default:
                return res.status(400).json({ message: "Trạng thái không hợp lệ" });
        }


        return res.json({
            message: `Đã cập nhật sản phẩm sang '${newStatus}'`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }


}

//[Delete] /api/admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    

    try {
        const { id } = req.params;
        // const deleted = await Product.findByIdAndDelete(id); xóa vĩnh viễn
        const deleted = await Product.updateOne({ _id: id }, { deleted: true ,deletedAt: new Date() })
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm để xóa!",
            });
        }

        res.json({
            success: true,
            message: "Xóa sản phẩm thành công!",
        });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({
            success: false,
            message: "Lỗi máy chủ khi xóa sản phẩm!",
        });
    }


}

