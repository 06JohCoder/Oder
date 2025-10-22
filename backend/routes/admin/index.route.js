
const userAdmin = require("./userAdmin")
const productAdmin = require("./productAdmin.route")
const systemConfig = require("../../config/system")


module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;
    app.use("/api" + prefixAdmin ,userAdmin)
    app.use("/api" + prefixAdmin ,productAdmin)

}