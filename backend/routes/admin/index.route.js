
const userAdmin = require("./userAdmin")
const productAdmin = require("./productAdmin.route")
const systemConfig = require("../../config/system");
const userAccount = require("./userAccount.route");
const userInforOrder = require("./userInforOrder")

module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;
    app.use("/api" + prefixAdmin ,userAdmin)
    app.use("/api" + prefixAdmin ,productAdmin)
    app.use("/api" + prefixAdmin ,userAccount)
    app.use("/api" + prefixAdmin ,userInforOrder)

}