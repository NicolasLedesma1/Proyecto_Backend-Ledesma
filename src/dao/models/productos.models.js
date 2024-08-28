const mongoose = require ("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');


const productosSchema = new mongoose.Schema({
    title :{
        type: String,
        index: true
    } ,
    description: String,
    price: {
        type : Number, },
    code : String,
    stock : Number
})
productosSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model("productos", productosSchema);

module.exports = ProductModel;