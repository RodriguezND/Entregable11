const express = require("express")
const { Server: HttpServer } = require("http")
const { Server: IOServer } = require("socket.io")
const { schema, normalize, denormalize } = require('normalizr');
const cookieParser = require("cookie-parser")
const session = require("express-session")

//Persistencia por MongoDB
const MongoStore = require("connect-mongo")
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const util = require('util');

const ProductosDaoMongo = require("./daos/ProductosDaoMongoDb")
const MensajesDaoMongo = require("./daos/MensajesDaoMongoDb")

const proMongo = new ProductosDaoMongo()
const proMongoMensajes = new MensajesDaoMongo()

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.set('view engine', 'ejs');

app.use(express.static('./public'))
app.use(express.static("public"))

app.use(session({
    store: MongoStore.create({
        //En Atlas connect app: asegurarse cambiar la version de node a 2.2.12
        mongoUrl: "mongodb+srv://daniel:daniel123@cluster0.mrcwkfv.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),
    secret: "saraza",
    resave: true,
    saveUninitialized: false,
    cookie: {
        expires: 60000
    }
}))

httpServer.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
})

app.get('/login', (req, res) => {
    if (req.session.nombre) {

        const dato = req.session.nombre
        
        const minute = 60000
        req.session.expires = new Date(Date.now() + minute)
        /* req.session.cookie.maxAge = minute */

        /* req.session.regenerate(function(err) {
            // will have a new session here
            req.session = session
        }); */

        const producto = []
        

        res.render("index.ejs", { productos: producto, datos: dato })

    } else {
        const producto = [{}]
        res.render("login.ejs", { productos: producto })
    }
});


app.get('/olvidar', (req, res) => {
    if (req.session.nombre) {

        const dato = req.session.nombre
        req.session.destroy()

        res.render("logout.ejs", { datos: dato })

    } else {
        res.send({ error: "No se ha ingresado nombre" })
    }
})

app.post("/login", (req, res) => {

    req.session.nombre = req.body.nombre
    req.session.pass = req.body.contraseña

    const dato = req.session.nombre

    const producto = []
    res.render("index.ejs", { productos: producto, datos: dato })

})


function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}

app.get("/api/productos-test", (req, res) => {

    proMongo.generador().then((pro) => {

        res.render("indexTest.ejs")

    })

})


io.on('connection', function (socket) {
    console.log('Un cliente se ha conectado');


    //LISTAR PRODUCTOS
    proMongo.getAll().then(objetoLoco => {

        io.sockets.emit('productos', objetoLoco);

    })

    //LISTAR MENSAJES
    proMongoMensajes.getAll().then(objetoLoco => {

        console.log(objetoLoco)

        const schemaAutor = new schema.Entity('authors', {}, { idAttribute: 'email' });

        const schemaMensaje = new schema.Entity('messages', { author: schemaAutor }, { idAttribute: '_id' });

        const normalizedChat = normalize(objetoLoco, [schemaMensaje])

        console.log("NORMALIZADO")

        print(normalizedChat)


        io.sockets.emit('messages', [objetoLoco, normalizedChat]);

    })

    //Agregar Nuevo Producto
    socket.on('new-productos', data => {
        proMongo.save(data).then(
            proMongo.getAll().then(objetoLoco => {

                io.sockets.emit('productos', objetoLoco);
            }))


    })

    //Agregar Nuevo mensaje
    socket.on('new-message', data => {

        proMongoMensajes.save(data)

        proMongoMensajes.getAll().then(objetoLoco => {

            console.log("ccccccccc")

            io.sockets.emit('messages', objetoLoco);

        })

    })


});

module.exports = { schema, normalize, denormalize }
