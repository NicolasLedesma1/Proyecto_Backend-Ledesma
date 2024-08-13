const mongoose = require ("mongoose")


const productosSchema = new mongoose.Schema({
    title : String,
    description: String,
    price: String,
    code : String,
    stock : Number
})

const ProductModel = mongoose.model("productos", productosSchema);

module.exports = ProductModel;