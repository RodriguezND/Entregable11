const socket = io.connect();
/* const { schema, normalize, denormalize } = require('normalizr'); */


/* const schemaAutor = new schema.Entity('author', {}, { idAttribute: 'email' }); */

function renderProductos(data) {
    const html = data.map((productos, index) => {
        return(
            `<div><table class="default" border="1px solid black" >

            <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            </tr>
                <tr>
                    <td> ${productos.title} </td>
                    <td> ${productos.price} </td>
                    <td> <img src="${productos.thumbnail}"</td>
                </tr>
            </table></div>`)
    }).join(" ");
    document.getElementById('productos').innerHTML = html;
} 

//MENSAJES

function renderMensajes(data) {


    /* const schemaFinal = crearSchema(); */

  
    const html = data.map((elem, index) => {
        return(`<div>

            <strong><font color="blue">${elem.author.email}</font></strong><font color="brown">[${elem.hora}]</font>:
            <em><font color="green"><i>${elem.text}</font></i></em> 
            
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    
    /* const dia = new Date().getDay()
    const mes = new Date().getMonth()
    const año = new Date().getFullYear()
    const hora = new Date().getHours()
    const min = new Date().getMinutes()
    const seg = new Date().getSeconds() */

    let email = document.getElementById('username').value

    if(email.length != 0){
        const mensaje = {
            author: { email: email, 
                nombre: "Prueba1", 
                apellido: "Prueba2", 
                edad: 0, 
                alias: "PruebaAlias",
                avatar: "http"},
            text: document.getElementById('texto').value
            /* hora: `${dia}/${mes}/${año} - ${hora}:${min}:${seg}` */
        };

        socket.emit('new-message', mensaje);
        return false;
    } else {

        alert("COMPLETA EL CAMPO EMAIL")
        return false;

    }
}

function addProducto(e) {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-productos', producto);
    return false;
}


socket.on('productos', function(data) { 
    
    renderProductos(data); 
});

socket.on('messages', function(data) { 

    
    renderMensajes(data); 
});




    

    

