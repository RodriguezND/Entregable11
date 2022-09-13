const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")

const ProductosDaoMongo = require("./daos/ProductosDaoMongoDb")
const MensajesDaoMongo = require("./daos/MensajesDaoMongoDb")

const proMongo = new ProductosDaoMongo()
const proMongoMensajes = new MensajesDaoMongo()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.set('view engine', 'ejs');

app.use(express.static('./public'))
app.use(express.static("public"))

httpServer.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
})


app.get("/api/productos-test", (req, res) => {

    proMongo.generador().then((pro) => {


    res.render("indexTest.ejs", {productos: pro})

   })

    
})




/* const arrayAuthor = []
mensaje.map((p) => {
    
    const objetoFinal = p.author
    arrayAuthor.push(objetoFinal)
})

const mensajes = { id: 999,
                    mensaje: mensaje}


const schemaAuthor = new schema.Entity('author');

const schemaPost = new schema.Entity("post", {
    author: schemaAuthor,
})

const normalizedChat = normalize(mensajes, schemaAuthor )

print(normalizedChat)

const data = [normalizedChat, schemaAuthor] */

/* const denormalizedData = denormalize(data[0].result, data[1], data[0].entities);
console.log("DESNORMALIZAD")
print(denormalizedData)

console.log("Mensajee")
print(denormalizedData.mensaje) */















io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');


    //LISTAR PRODUCTOS
    proMongo.getAll().then(objetoLoco => {

        io.sockets.emit('productos', objetoLoco);
        
    })

    //LISTAR MENSAJES
    proMongoMensajes.getAll().then(objetoLoco => {

        io.sockets.emit('messages', objetoLoco);

    })

    //Agregar Nuevo Producto
    socket.on('new-productos', data => 
    {
        proMongo.save(data)

        proMongo.getAll().then(objetoLoco => {
            io.sockets.emit('productos', objetoLoco);
        })
    })

    //Agregar Nuevo mensaje
    socket.on('new-message',data => {

        proMongoMensajes.save(data)
        console.log(data)
        proMongoMensajes.getAll().then(objetoLoco => {

            console.log("ccccccccc")
    
            io.sockets.emit('messages', objetoLoco);
    
        })

    })
   

});

    
