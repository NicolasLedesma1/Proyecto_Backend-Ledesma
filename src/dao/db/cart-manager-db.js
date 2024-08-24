const CartModel = require("../models/cart.model");
class cartManager {

    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({products : []});
            await nuevoCarrito.save();
            return nuevoCarrito;
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
            const existeProducto = carrito.products.find(p => p.product.toString() === productoId);
    
            if (existeProducto) {
                existeProducto.quantity += quantity; 
            } else {
                carrito.products.push({ product: productoId, quantity }); 
            }
    
            carrito.markModified("products");
            await carrito.save();
            return carrito;
        } catch (error) {
            console.log("No se pudo agregar el producto", error);
            throw error;
        }
    }
    
    async getAllCarts() {
        try {
            const carritos = await CartModel.find(); 
            return carritos;
        } catch (error) {
            console.log("Error al obtener los carritos", error);
            throw error;
        }
    }
    async deleteCarrito(carritoId) {
        try {
            const carritoEliminado = await CartModel.findByIdAndDelete(carritoId);

            if (!carritoEliminado) {
                throw new Error("No existe carrito con ese ID para eliminar");
            }

            return carritoEliminado;
        } catch (error) {
            console.log("Error al eliminar el carrito", error);
            throw error;
        }
    }
}


module.exports = cartManager