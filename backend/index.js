const mongoose = require('mongoose');
const express = require('express');
const route = require("./routes/client/index.router")
const routeAdmin = require("./routes/admin/index.route")
const cors = require('cors');
require('dotenv').config()

const database = require("./config/database")

database.connect()


// const Product = mongoose.model('Product', {
//   name: String,
//   price: Number,
//   img: String
// }); 

const app = express();
const port = process.env.PORT;


app.use(cors({ origin: "http://localhost:3000" }));


// app.use(cors());
app.use(express.json());

// Route
route(app)
routeAdmin(app)


app.listen(port, () => console.log(`🚀 Server đang chạy tại http://localhost:${port}`));
