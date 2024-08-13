const express = require('express');
const router = express.Router();
const ProductManager = require('../dao/db/product-manager-db');
const manager = new ProductManager( );

router.get("/products", async (req, res) => {
    try {
        const arrayProductos = await manager.getProducts();
        console.log(arrayProductos); 
        res.render("home",{arrayProductos});
    } catch (error) {
        console.error("Error obteniendo los productos:", error);
        res.status(500).send("Error obteniendo los productos");
    }
});

router.get("/realtimeproducts", (req,res) =>{
    res.render("realtimeproducts");
})

module.exports = router;