const express = require ("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager");
const cartManager = new CartManager("./src/data/carts.json")


router.post("/", async (req, res) =>{
    try{
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    }catch (error){
        res.status(500).send("error del servidor");
    }
})

router.get("/:cid" , async (req, res) =>{
    const carritoId = parseInt(req.params.cid);

    try{
        const carritoBuscado = await cartManager.getCarritoById(carritoId)
        res.json(carritoBuscado.products)
    }catch (error) {
        res.status(500).send("el carrito no existe");
    }
})

router.post("/:cid/product/:pid" , async (req, res) =>{
    const carritoId = parseInt(req.params.cid);
    const productoId = req.params.pid
    const quantity = req.body.quantity || 1;

    try{
        const carritoActualizado = await cartManager.agregarProductoAlCarrito(carritoId, productoId,quantity)
        res.json(carritoActualizado.products);
    } catch(error){
        res.status(500).send("el carrito no existe");
    }
 })

 module.exports = router