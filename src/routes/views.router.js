const express = require('express');
const router = express.Router();
const ProductManager = require('../controllers/product-manager');
const manager = new ProductManager('./src/data/productos.json');

router.get("/products", async (req, res) => {
    try {
        const arrayProductos = await manager.getProducts();
        res.render("home", { arrayProductos });
    } catch (error) {
        console.error("Error obteniendo los productos:", error);
        res.status(500).send("Error obteniendo los productos");
    }
});

router.get("/realtimeproducts", (req,res) =>{
    res.render("realtimeproducts");
})

module.exports = router;