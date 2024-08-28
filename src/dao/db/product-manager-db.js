const ProductModel = require("../models/productos.models")

class ProductManager {

    async addProduct(title, description, price, code, stock) {
        try {
            if (!title || !description || !price || !code || !stock) {
                console.log('Todos los campos son obligatorios');
                return { error: 'Todos los campos son obligatorios' };
            }
    
            const existecodigo = await ProductModel.findOne({ code: code });
            if (existecodigo) {
                console.log("Código duplicado");
                return { error: 'Código duplicado' };
            }
    
            const nuevoProducto = new ProductModel({
                title,
                description,
                price,
                code,
                stock,
            });
            await nuevoProducto.save();
            return { message: 'Producto agregado correctamente', producto: nuevoProducto };
        } catch (error) {
            console.log("Error al agregar producto", error);
            return { error: 'Error al agregar producto' };
        }
    }

    async getProducts() {
        try {
            const arrayProductos = await ProductModel.find().sort({ price: 1 });
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer los productos", error);
        }

    }
    async getProductsById(id) {
        try {
            const buscado = await ProductModel.findById(id);
    
            if (!buscado) {
                console.log("producto no encontrado");
                return null;
            }
            console.log("producto encontrado");
    
            return buscado;
        } catch (error) {
            console.log("error al buscar el ID:", error);
            throw error;
        }
    }

    async updateProduct(id, productoActualizado) {
        try {
            const update = await ProductModel.findByIdAndUpdate(id, productoActualizado, { new: true });
            if (!update) {
                console.log("Producto no encontrado");
                return { error: 'Producto no encontrado' };
            }
            return { message: 'Producto actualizado correctamente', producto: update };
        } catch (error) {
            console.log("Error al actualizar el producto", error);
            return { error: 'Error al actualizar el producto' };
        }
    }
   
    async deleteProductById(id) {
        try {
            const deleteProduct = await ProductModel.findByIdAndDelete(id);
            if (!deleteProduct) {
                console.log("No se pudo eliminar el producto");
                return null;
            }
            return deleteProduct;
        } catch (error) {
            console.log("Error al borrar el producto", error);
            throw error;
        }
    }}

module.exports = ProductManager;