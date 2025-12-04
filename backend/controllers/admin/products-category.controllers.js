
const ProductCategory = require("../../models/controllerCategory.model")

//[GET] /api/admin/category
module.exports.index = async (req, res) => {
    let final = {
        deleted: false,
    }


    function createTree(data, parentId = "") {
        const tree = [];

        data.forEach((item) => {
            if (item.father_id === String(parentId)) {
                const newItem = item;

                const children = createTree(data, String(item._id));
               
                if (children.length > 0) {
                    newItem.children = children;
                }

                tree.push(newItem);
            }
        });

        return tree;
    }

    try {
        const category = await ProductCategory.find(final).lean();
       const newCategory =  createTree(category);
        console.log("newCategory", newCategory);
        res.json(newCategory)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });

    }
}


//[POST] /api/admin/category/create
module.exports.create = async (req, res) => {


    if (!req.body.position) {
        const count = await ProductCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position)
    }

    const category = new ProductCategory(req.body);
    await category.save();

    res.json({
        message: "Tạo danh mục thành công",
        category,
    });

}


