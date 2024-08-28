const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/db/product-manager-db.js");
const manager = new ProductManager();


router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts();
    res.send(arrayProductos);
})


router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const producto = await manager.getProductsById(id);

        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }
        res.send(producto);
    } catch (error) {
        res.status(500).send(`Error al buscar ese id en los productos: ${error.message}`);
    }
});


router.post('/', async (req, res) => {
    const { title, description, price, code, stock } = req.body;
    const result = await manager.addProduct(title, description, price, code, stock);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const productoActualizado = req.body;
    try {
        const result = await manager.updateProduct(id, productoActualizado);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await manager.deleteProductById(id);
        if (!result) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
module.exports = {
    router,
    manager }
