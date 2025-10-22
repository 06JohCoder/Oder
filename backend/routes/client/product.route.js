const express = require('express');
const router = express.Router();

module.exports = (Product) => {
    router.get('/products', async (req, res) => {
        try {
            const data = await Product.find({});
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
        }
    });


    return router

}
