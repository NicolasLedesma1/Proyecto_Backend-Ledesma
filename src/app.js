const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router')

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.static("./src/public"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter );

app.get("/", (req, res) => {
    res.send("Bienvenidos al super");
});

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

