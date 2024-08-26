const mongoose = require ("mongoose");
const ProductModel = require("./dao/models/productos.models");
const CartModel = require("./dao/models/cart.model");
// conexion con mongoose

const main = async () =>{
    await mongoose.connect("mongodb+srv://nledesma0194:camilo2019@codercluster.jsfp4.mongodb.net/Supermercado?retryWrites=true&w=majority&appName=coderCluster")
    .then(()=> console.log("tenemos la bd"))
    .catch(() => console.log("no tenemos la bd"))
    
    const carritoConProducto = await CartModel.findById("66ca34cf7778d1f19cf6bbe3")
    console.log(JSON.stringify(carritoConProducto, null, 2));
    
    
    }

main();
