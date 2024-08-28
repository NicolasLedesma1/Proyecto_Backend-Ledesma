const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/product-manager-db');
const ProductModel = require('../dao/models/productos.models');
const manager = new ProductManager( );


router.get("/products", async (req, res) => {


    let page = req.query.page || 1;  
    let limit = req.query.limit || 3; 
    try {
        const listadoProductos = await ProductModel.paginate({}, { limit, page });
    
        res.render("home", {
            productos: listadoProductos.docs,
            hasPrevPage: listadoProductos.hasPrevPage,
            hasNextPage: listadoProductos.hasNextPage,
            prevPage: listadoProductos.prevPage,
            nextPage: listadoProductos.nextPage,
            currentPage: listadoProductos.page,
            totalPages: listadoProductos.totalPages
        });
    } catch (error) {
        console.error("Error durante la paginación:", error); 
        res.status(500).send("Algo salió mal");
    }
});

router.get("/realtimeproducts", (req,res) =>{
    res.render("realtimeproducts");
})

module.exports = router;