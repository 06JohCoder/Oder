const userAdmins = require("../../models/UserAdmin.model");



    // if(){

    // }

//[GET] /api/admin/usersAdmin
module.exports.userAdmin = async (req, res) => {
        // console.log(req.query.status + " " + req.query.role)

        let final ={

        }
        if (req.query.status){
           final.status = req.query.status; 
        }
        if (req.query.role) {
            final.role = req.query.role;
        }

        try {
            const data = await userAdmins.find(final);    
            res.json(data);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
        }
    }
