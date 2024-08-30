const express = require ("express");
const router = express.Router();
const CartManager = require("../dao/db/cart-manager-db.js");
const cartManager = new CartManager()

router.get("/", async (req, res) => {
    try {
        const carritos = await cartManager.getAllCarts();
        res.json(carritos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los carritos" });
    }
});
router.post("/", async (req, res) =>{
    try{
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    }catch (error){
        res.status(500).send("error del servidor");
    }
})

router.get("/:cid" , async (req, res) =>{
    const carritoId =req.params.cid;

    try{
        const carritoBuscado = await cartManager.getCarritoById(carritoId)
        res.json(carritoBuscado.products)
    }catch (error) {
        res.status(500).send("el carrito no existe");
    }
})
router.put("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const nuevaCantidad = req.body.quantity;

    try {
        if (!nuevaCantidad || nuevaCantidad <= 0) {
            return res.status(400).send("La cantidad debe ser un número mayor que 0");
        }

        const carrito = await cartManager.getCarritoById(carritoId);
        if (!carrito) {
            return res.status(404).send("No existe el carrito con ese ID");
        }

        const productoEnCarrito = carrito.products.find(p => p.product._id.toString() === productoId);

        if (productoEnCarrito) {
            productoEnCarrito.quantity = nuevaCantidad;
            carrito.markModified("products");
            await carrito.save();
            res.json(carrito.products);
        } else {
            res.status(404).send("El producto no existe en el carrito");
        }
    } catch (error) {
        console.error("Error al actualizar la cantidad del producto en el carrito:", error);
        res.status(500).send("Error al actualizar la cantidad del producto en el carrito");
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId, quantity);
        res.json(carritoActualizado.products);
    } catch (error) {
        res.status(500).send("Error al agregar el producto al carrito");
    }
});

router.delete("/:cid", async (req, res) => {
    const carritoId = req.params.cid;

    try {
        const carritoEliminado = await cartManager.deleteCarrito(carritoId);
        res.json({ message: "Carrito eliminado con éxito", carritoEliminado });
    } catch (error) {
        res.status(500).send("Error al eliminar el carrito");
    }
});
 module.exports = router 