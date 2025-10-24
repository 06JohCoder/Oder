
const searchHelper = require("../../helpers/search");

const Product = require("../../models/product.model")

//[GET] /api/admin/products
module.exports.index = async (req, res) => {
        
        let final ={
                deleted: false,
        }
        if (req.query.status){
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
