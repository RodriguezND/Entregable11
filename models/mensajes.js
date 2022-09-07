const { mongoose } = require("mongoose");

const mensajesCollection = "mensajes"

const mensajeSchema = new mongoose.Schema({
    author: {type: Object, require: true, max:100},
    text: {type: String, require: true, max:100},
    hora: {type: String, require: true, max:1000000000000000000000000000000000000}

})

module.exports = mongoose.model(mensajesCollection, mensajeSchema);


