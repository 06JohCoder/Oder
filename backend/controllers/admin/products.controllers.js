const Product = require("../../models/product.model")

//[GET] /api/admin/products
module.exports.index = async (req, res) => {
        // console.log(req.query.keyword)
        let final ={
                deleted: false,
            }

        if (req.query.status){
           final.status = req.query.status; 
        }

        if (req.query.keyword) {
            const keyword = req.query.keyword;
            console.log(keyword)
            const regx = new RegExp(`.*${keyword}.*`,"i");
            final.name = regx;
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
