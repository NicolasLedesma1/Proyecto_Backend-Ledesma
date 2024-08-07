document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    const addProductForm = document.getElementById('add-product-form');

    addProductForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const code = document.getElementById('code').value;
        const stock = document.getElementById('stock').value;

        socket.emit('addProduct', { title, description, price, code, stock });

        addProductForm.reset();
    });

    socket.on("products", (data) => {
        const listaProductos = document.getElementById("lista-productos");
        if (listaProductos) {
            listaProductos.innerHTML = '';
            data.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.className = 'product-card';
                productoDiv.innerHTML = `
                    <h2>${producto.id} - ${producto.title}</h2>
                    <p>codigo : ${producto.code}</p>
                    <p>descripcion : ${producto.description}</p>
                    <p>precio $ : ${producto.price}</p>
                    <p>cantidad : ${producto.stock}</p>
                    <button class="eliminar-btn">eliminar</button>
                `;
                listaProductos.appendChild(productoDiv);

                const eliminarBtn = productoDiv.querySelector('.eliminar-btn');
                eliminarBtn.addEventListener('click', () => {
                    deleteProduct(producto.id);
                });
            });
        }
    });

    const deleteProduct = (id) => {
        socket.emit("deleteProduct", id);
    };
});