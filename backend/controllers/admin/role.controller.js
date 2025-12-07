const role = require('../../models/decentralization.model');

// [Get] : admin/role
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await role.find(find);


}

// [Get] : admin/role/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const data = await role.find(find);
    try {
        if (data) {
            res.json(data);
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi khi lấy vai trò' });
        
    }
}

// [POST] : admin/role/create 
module.exports.createPost = async (req, res) => {
    const data = req.body;


    const newRole = new role({
        name: data.name,
        description: data.description,
        status: data.status
    });
    try {
        if (newRole) {
            await newRole.save();
            res.json({
                message: "Tạo vai trò thành công",
                role: newRole
            });
        } else {
            res.json({
                message: "Tạo vai trò thất bại",
            });
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi khi tạo vai trò' });

    }


}
