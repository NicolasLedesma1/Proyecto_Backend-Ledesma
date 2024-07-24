const fs = require('fs').promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
        this.inicializar();
    }

    async inicializar() {
        const products = await this.getProducts();
        if (products.length > 0) {
            ProductManager.ultId = Math.max(...products.map(product => product.id));
        }
    }

    async addProduct(title, description, price, code, stock) {
        if (!title || !description || !price || !code || !stock) {
            console.log('Todos los campos son obligatorios');
            return;
        }
        const products = await this.getProducts();
        if (products.some(item => item.code === code)) {
            console.log('Error en código');
            return;
        }

        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            code,
            stock,
        };

        products.push(nuevoProducto);
        await this.guardarArchivo(products);
    }

    async getProducts() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        } catch (error) {
            console.error("Error leyendo el archivo:", error);
            return [];
        }
    }

    async getProductsById(id) {
        const arrayProductos = await this.getProducts();
        const buscado = arrayProductos.find(item => item.id === id);

        if (!buscado) {
            return "producto no encontrado";
        } else {
            return buscado;
        }
    }
    

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }
    async deleteProductById(id) {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index === -1) {
            return "Producto no encontrado";
        }

        products.splice(index, 1); // Elimina el producto del array
        await this.guardarArchivo(products); // Guarda el array actualizado en el archivo
        return "Producto eliminado con éxito";
    }
}


module.exports = ProductManager;