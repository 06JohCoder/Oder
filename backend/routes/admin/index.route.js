
const userAdmin = require("./userAdmin")
const productAdmin = require("./productAdmin.route")
const systemConfig = require("../../config/system");
const userAccount = require("./userAccount.route");
const userInforOrder = require("./userInforOrder")
const addcategory = require('./products-category.route')
const role = require('./role.route')
module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;
    app.use("/api" + prefixAdmin ,userAdmin)
    app.use("/api" + prefixAdmin ,productAdmin)
    app.use("/api" + prefixAdmin ,userAccount)
    app.use("/api" + prefixAdmin ,userInforOrder)
    app.use("/api" + prefixAdmin ,addcategory)
    app.use("/api" + prefixAdmin ,role)

}