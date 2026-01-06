module.exports.settingProfileEdit = (req, res, next) => {
    const { fullname, email, phone, password, confirmPassword } = req.body;

    // Validate request body
    if (!fullname || !email || !phone) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if password and confirmPassword match
    if (password && password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    next();
};
