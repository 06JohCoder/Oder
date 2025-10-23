const userAdmins = require("../../models/UserAdmin.model");



// if(){

// }

//[GET] /api/admin/usersAdmin
module.exports.userAdmin = async (req, res) => {
    // console.log(req.query.status + " " + req.query.role)

    let final = {

    }
    if (req.query.status) {
        final.status = req.query.status;
    }
    if (req.query.role) {
        final.role = req.query.role;
    }
    if (req.query.userName_email) {
        const regx = new RegExp(req.query.userName_email, "i");
        final.$or = [
            { name: regx },
            { email: regx }
        ];
    }

    try {
        const data = await userAdmins.find(final);
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
}
