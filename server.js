const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { schema, normalize, denormalize } = require('normalizr');
const util = require('util');

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

function print(objeto) {
    console.log(util.inspect(objeto,false,12,true))
    }

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
                    mensaje: mensaje} */





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

       /*  const schemaAuthor = new schema.Entity('author',{},{idAttribute: 'email'});

        const schemaD = new schema.Entity('d', {author: schemaAutor}, {idAttribute: 'd'});

        const schemaPost = new schema.Entity("post", {
            d : schemaD,
        })
 */

        const schemaAutor = new schema.Entity('author',{}, {idAttribute: 'email'});
        /* const schemaDoc = new schema.Entity('_doc', {autor: schemaAutor}, {idAttribute: '_id'}); */
        //Schema para el mensaje
        const schemaMensaje = new schema.Entity('post', {author: schemaAutor});
        //Schema para el conjunto de mensajes
        const schemaMensajes = new schema.Entity('posts', {post: [schemaMensaje]});

        const mens = {id: 'mensajes', post: objetoLoco}

        const normalizedChat = normalize(mens, schemaMensajes )

        print(normalizedChat)

        const data = {normalized: normalizedChat, schema: schemaMensajes} 


        io.sockets.emit('messages', objetoLoco );

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

    
