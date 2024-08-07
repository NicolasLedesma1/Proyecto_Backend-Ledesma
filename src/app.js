const express = require('express');
const { router: productsRouter, manager } = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');
const viewsRouter = require('./routes/views.router');
const exphbs = require('express-handlebars');
const socket = require("socket.io");

const app = express();
const PUERTO = 8080;
//middleware
app.use(express.json());
app.use(express.static("./src/public"));

// rutas
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

//plantillas
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//server
const server = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

//socket
const io = socket(server);

io.on("connection", async (socket) => {
    console.log("Un usuario se ha conectado");

    try {
        const arrayProductos = await manager.getProducts();
        socket.emit("products", arrayProductos);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }

    socket.on("addProduct", async (newProduct) => {
        try {
            await manager.addProduct(newProduct.title, newProduct.description, newProduct.price, newProduct.code, newProduct.stock);
            const arrayProductos = await manager.getProducts();
            io.emit("products", arrayProductos);
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    });

    socket.on("deleteProduct", async (id) => {
        try {
            await manager.deleteProductById(id);
            const arrayProductos = await manager.getProducts();
            io.emit("products", arrayProductos);
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("Un usuario se ha desconectado");
    });
});