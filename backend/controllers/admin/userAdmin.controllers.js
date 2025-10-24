const userAdmins = require("../../models/UserAdmin.model");
const paginationHelper = require("../../helpers/pagination")

//[GET] /api/admin/usersAdmin
module.exports.userAdmin = async (req, res) => {


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
    //Pagination
    const countProducts = await userAdmins.countDocuments(final);
    let objPagination = paginationHelper(
        {
            pagePage: 1,
            limitItems: 8,
        },
        req.query,
        countProducts
    )

    //Endl Pagination

    try {
        const data = await userAdmins.find(final).limit(objPagination.limitItems).skip(objPagination.skip);
        res.json({
            data,
            objPagination
        }
        );
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu' });
    }
}
