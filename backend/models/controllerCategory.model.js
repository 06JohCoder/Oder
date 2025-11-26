

const mongoose = require('mongoose');


const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)
const productCategorySchema = new mongoose.Schema({
    name: String,
    father_id:{
        type: String,
        default:""
    },
    img: String,
    status: { type: String, default: "active" },
    position: Number,
    slug: { type: String, slug: "name", unique: true },
    description: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,

},
    {
        timestamps: true
    });

const productCategory = mongoose.model('productCategory', productCategorySchema, 'products-category');

module.exports = productCategory;

