const { mongoose } = require("mongoose");
const ContenedorMongoDb = require("../contenedores/ContenedorMongoDbProductos")

const { generarProducto } = require('../faker/generadorProductos.js')


class ProductosDaoMongoDb extends ContenedorMongoDb
{

    constructor(){

        super()

        try 
        {
            const URL = "mongodb://localhost:27017/chat"
            let rta = mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
    
            console.log("Base de datos conectada!")

    
        } catch (err) {
            console.log(err)
        }


    }

    async generador(cant = 5) {
        const nuevos = []
        for (let i = 0; i < cant; i++) {
            const nuevoUsuario = generarProducto()
            nuevos.push(nuevoUsuario)
        }
        return nuevos
    }

    async desconectar(){

    }
}

module.exports = ProductosDaoMongoDb
