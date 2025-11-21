const infoOrderControllers = require("../../models/InfoUserOrder.model");


module.exports.userOrder = async (req, res) => {
    // console.log("đã vào được infoOrder controller")
    // const data = await infoOrderControllers.find();
    // console.log(data)


   

    try {
        const data = await infoOrderControllers.find({});
        res.json(data);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }

}



