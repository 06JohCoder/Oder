const productRouer = require("./product.route");
const homeRouter =require("./home.route")


module.exports = (app) => {

    app.use("/api",homeRouter)
    
    // app.use("/api",productRouer)
    
   
}


