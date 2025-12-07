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

// [Get] : admin/role/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const roleData = await role.findOne(
        { _id: id }

    );
    try {
        if (roleData) {
            res.json(roleData);
        } else {
            res.status(404).json({ message: 'Vai trò không tồn tại' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi khi lấy vai trò' });   

    }
}

// [PATCH] : admin/role/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    
    try {
        const updatedRole = await role.findByIdAndUpdate(
            { _id: id },
            {
                name: data.name,
                description: data.description,
            },
            { new: true }
        );
        if (updatedRole) {
            res.json({
                message: "Cập nhật vai trò thành công",
                role: updatedRole
            });
        } else {
            res.status(404).json({ message: 'Vai trò không tồn tại' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi khi cập nhật vai trò' });
    }
}
// [DELETE] : admin/role/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedRole = await role.findByIdAndUpdate(
            { _id: id },
            { deleted: true },
            { new: true }   
        );
        if (deletedRole) {
            res.json({
                message: "Xóa vai trò thành công",
                role: deletedRole
            });
        } else {
            res.status(404).json({ message: 'Vai trò không tồn tại' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Lỗi khi xóa vai trò' });
    }
}