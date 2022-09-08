const { mongoose } = require("mongoose");

const mensajesCollection = "mensajes"

const mensajeSchema = new mongoose.Schema({
    author:  {
        email: {type: String, required: true},
        nombre: { type: String, required: true, maxLength: 100 },
        apellido: { type: String, required: true, maxLength: 100 },
        edad: { type: Number, required: true, maxLength: 5 },
        alias: { type: String, required: true, maxLength: 100 },
        avatar: { type: String, required: true },
        },
    text: {type: String, require: true, max:100},
    hora: {type: String, require: true, max:1000000000000000000000000000000000000}

})

module.exports = mongoose.model(mensajesCollection, mensajeSchema);


