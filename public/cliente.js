const socket = io.connect();


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

    const schemaAutor = new normalizr.schema.Entity('autor', {}, { idAttribute: 'email' });
    const schemaMensaje = new normalizr.schema.Entity('messages', {author: schemaAutor}, {idAttribute: '_id'});
    
    const denormalizedMessages = normalizr.denormalize(data[1].result, [schemaMensaje], data[1].entities);
    
    console.log(denormalizedMessages)


    const porcentajeDeCompresion = (100 - ((JSON.stringify(denormalizedMessages).length / JSON.stringify(data[1]).length) * 100)).toFixed(2);

    console.log({porcentajeDeCompresion});


    const html2 = `<h1>Porcentaje de Compresion: ${porcentajeDeCompresion} %<h1>
                    <h3>Normalizado: ${JSON.stringify(data[1]).length} </h3>
                    <h3>DeNormalizado: ${JSON.stringify(denormalizedMessages).length} </h3>
    `

    document.getElementById('porcentaje').innerHTML = html2;


    const html = denormalizedMessages.map((elem, index) => {
        return(`<div>

            <strong><font color="blue">${elem._doc.author.email}</font></strong><font color="brown">[${elem._doc.hora}]</font>:
            <em><font color="green"><i>${elem._doc.text}</font></i></em> 
            
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




    

    

