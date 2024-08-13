const mongoose = require ("mongoose")
// conexion con mongoose
mongoose.connect("mongodb+srv://nledesma0194:camilo2019@codercluster.jsfp4.mongodb.net/Supermercado?retryWrites=true&w=majority&appName=coderCluster")
    .then(()=> console.log("tenemos la bd"))
    .catch(() => console.log("no tenemos la bd"))
    