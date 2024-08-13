/*const express = require('express');
const router = express.Router();

const ProductManager = require('../dao/db/product-manager-db');




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

module.exports = { router, manager };
//-----------------------------------------------------------------------------------------------------//
const express = require('express');
const router = express.Router ();
const ProductManager = require('../dao/db/product-manager-db');
const manager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const listadoProductos = await manager.find();
        res.json(listadoProductos);
    } catch (error) {
        res.status(500).json({ message: "Error no se encontraron productos " });
    }
});

router.post("/" , async (req,res)=> {
    const nuevoProducto = req.body
    try {
        const product = new ProductModel(nuevoProducto);
        await product.save();
        res.send ({message : "producto agregado con exito", producto: product})
    } catch (error) {
        res.status(500).send("error al crear el producto")
    }
})

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const product = await ProductModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        res.status(200).send({ message: "Producto actualizado", producto: product });
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        res.status(500).send("No es posible actualizar el producto");
    }
});

router.delete("/:id", async(req,res)=>{
    const id = req.params.id;
    try {
        await manager.deleteProduct(id);
        res.json({ message: "producto eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = {
    router,
    manager }
//-----------------------------------------------------------------------------------------------------------//*/
const express = require("express");
const router = express.Router();

const ProductManager = require("../dao/db/product-manager-db.js");
const manager = new ProductManager();

//Listar todos los productos: 

router.get("/", async (req, res) => {
    const arrayProductos = await manager.getProducts();
    res.send(arrayProductos);
})

//Buscar producto por id: 

router.get("/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const producto = await manager.getProductById(id);

        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})


//3) Agregar un nuevo producto: 

router.post('/api/products', async (req, res) => {
    const { title, description, price, code, stock } = req.body;
    const result = await manager.addProduct(title, description, price, code, stock);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(201).json(result);
});


//4) Actualizar por ID: 

router.put('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    const productoActualizado = req.body;
    const result = await manager.updateProduct(id, productoActualizado);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(200).json(result);
});


//5) Eliminar por id: 

router.delete('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    const result = await manager.deleteProductById(id);
    if (result.error) {
        return res.status(400).json({ error: result.error });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
});
module.exports = router
