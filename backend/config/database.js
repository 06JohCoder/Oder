const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
     await  mongoose.connect(process.env.MONGODB_URI)
        console.log("Oke connect")
    
    } catch (error) {
        console.log("Error connect")
    }
}



