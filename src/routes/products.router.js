const express = require('express');
const router = express.Router();
const ProductManager = require('../controllers/product-manager');
const manager = new ProductManager("./src/data/productos.json");

router.get("/", async (req, res) => {
    let limit = req.query.limit;
    try {
        const arrayProductos = await manager.getProducts();
        if (limit) {
            res.send(arrayProductos.slice(0, limit))
        } else {
            res.send(arrayProductos)
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener productos" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, price, code, stock } = req.body;
        if (!title || !description || !price || !code || !stock) {
            return res.status(400).send({ status: "error", message: "Todos los campos son obligatorios" });
        }
        await manager.addProduct(title, description, price, code, stock);
        res.send({ status: "success", message: "Se agregó el producto" });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al agregar el producto" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let id = req.params.id;
        const producto = await manager.getProductsById(parseInt(id));

        if (!producto) {
            res.status(404).send("No se encuentra el producto deseado");
        } else {
            res.send({ producto });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al obtener el producto" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const { title, description } = req.body;
        const products = await manager.getProducts();
        const productIndex = products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            if (title) products[productIndex].title = title;
            if (description) products[productIndex].description = description;

            await manager.guardarArchivo(products);
            res.send({ status: "success", message: "Producto actualizado" });
        } else {
            res.status(404).send({ status: "error", message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al actualizar el producto" });
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await manager.deleteProductById(id);

        if (resultado === "Producto no encontrado") {
            res.status(404).send({ message: resultado });
        } else {
            res.status(200).send({ message: resultado });
        }
    } catch (error) {
        res.status(500).send({ status: "error", message: "Error al eliminar el producto" });
    }
});

module.exports = router;