const md5 = require('md5');
const Account = require("../../models/account.model");


// [GET] /setting/profile
module.exports.profile = async (req, res) => {
    // console.log("oke") 
    const token = req.cookies.token;
    const userProfileAdmin = await Account.findOne({ token: token, deleted: false });

    return res.status(200).json(
        {
            data: userProfileAdmin,
        }
    );

}

// [PATCH] /setting/profile/edit
module.exports.editProfile = async (req, res) => {
    const token = req.cookies.token;
    const { fullname, email, phone, oldPassword, newPassword, confirmPassword } = req.body;
    console.log(req.body);
    const userProfileAdmin = await Account.findOne({ token: token, deleted: false });
    if (!userProfileAdmin) {
        return res.status(404).json({ success: false, message: "Not User" });
    }
    if (oldPassword) {
        if (md5(oldPassword) !== userProfileAdmin.password) {
            return res.status(400).json({ success: false, message: "Old password is incorrect" });
        } else {
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ success: false, message: "New password and confirm password do not match" });
            }
            // Update password
            userProfileAdmin.password = md5(newPassword);

            await userProfileAdmin.save();
            return res.status(200).json({ success: true, message: "Profile updated successfully" });
        }
    }

};