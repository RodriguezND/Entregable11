const { mongoose } = require("mongoose");
const ContenedorMongoDb = require("../contenedores/ContenedorMongoDbMensajes")


class MensajesDaoMongoDb extends ContenedorMongoDb
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


    async desconectar(){

    }
}

module.exports = MensajesDaoMongoDb
