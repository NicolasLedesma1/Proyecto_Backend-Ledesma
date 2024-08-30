const mongoose = require("mongoose");
const CartModel = require("../models/cart.model");

class CartManager {
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] });
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear carrito", error);
            throw error;
        }
    }

    async getCarritoById(carritoId) {
        try {
            const carritoBuscado = await CartModel.findById(carritoId).exec();
            if (!carritoBuscado) {
                throw new Error("No existe carrito con ese ID");
            }
            return carritoBuscado;
        } catch (error) {
            console.log("Error al obtener el id del carrito", error);
            throw error;
        }
    }

    async agregarProductoAlCarrito(carritoId, productoId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(carritoId);
            const productoIdObj = new mongoose.Types.ObjectId(productoId);
            const existeProducto = carrito.products.find(p => p.product.equals(productoIdObj));
            if (existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({ product: productoIdObj, quantity });
            }
            carrito.markModified("products");
            await carrito.save();
            console.log("Carrito actualizado:", carrito);
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

module.exports = CartManager;