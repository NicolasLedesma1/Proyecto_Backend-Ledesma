const CartModel = require("../models/cart.model");
class cartManager {

    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({products : []});
            await nuevoCarrito.save();
        } catch (error) {
            console.log("Error");
            
        }
    }

    async getCarritoById(carritoId) {
        try {
            const carritoBuscado = await CartModel.findById(carritoId)

            if (!carritoBuscado) {
                throw new Error("No existe carrito con ese ID")
            }

            return carritoBuscado
        } catch (error) {
            console.log("error al obtener el id del carrito");
            throw error;
        }
    }

    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId);
            const existeProducto = carrito.products.find(p => p.product.toString() === productoId)
            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productoId, quantity })
            }
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("no se pudo agregar el producto", error );
            
        }
    }
}

module.exports = cartManager