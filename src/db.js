const mongoose = require ("mongoose");
const ProductModel = require("./dao/models/productos.models");
// conexion con mongoose

const main = async () =>{
    await mongoose.connect("mongodb+srv://nledesma0194:camilo2019@codercluster.jsfp4.mongodb.net/Supermercado?retryWrites=true&w=majority&appName=coderCluster")
    .then(()=> console.log("tenemos la bd"))
    .catch(() => console.log("no tenemos la bd"))
    const respuesta = await ProductModel.find({title : "Mate"}).explain("executionStats");

    console.log(respuesta);
    
    }

main();
